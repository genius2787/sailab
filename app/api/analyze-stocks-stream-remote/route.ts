import { NextRequest } from 'next/server';

export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: NextRequest) {
  const { stocks } = await request.json();
  
  if (!stocks || stocks.length === 0) {
    return new Response('No stocks provided', { status: 400 });
  }

  const stock = stocks[0];
  
  // Get TradeAgent API configuration
  const TRADEAGENT_API_URL = process.env.TRADEAGENT_API_URL;
  const TRADEAGENT_API_KEY = process.env.TRADEAGENT_API_KEY;
  
  if (!TRADEAGENT_API_URL || !TRADEAGENT_API_KEY) {
    console.error('[Stream Remote] Missing configuration');
    return new Response('TradeAgent API not configured', { status: 500 });
  }

  console.log(`[Stream Remote] Starting stream for ${stock}`);
  console.log(`[Stream Remote] API URL: ${TRADEAGENT_API_URL}`);

  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Call the remote streaming API
        const response = await fetch(`${TRADEAGENT_API_URL}/api/analyze-stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': TRADEAGENT_API_KEY,
          },
          body: JSON.stringify({
            stock: stock,
            days_ago: 5
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          console.error('[Stream Remote] Failed to connect:', error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: 'error',
            message: `Failed to connect to TradeAgent: ${error}`
          })}\n\n`));
          controller.close();
          return;
        }

        // Stream the response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // Forward the chunk as-is (it's already in SSE format)
          controller.enqueue(value);
        }
        
        controller.close();
        console.log('[Stream Remote] Stream completed');
        
      } catch (error) {
        console.error('[Stream Remote] Error:', error);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          type: 'error',
          message: error instanceof Error ? error.message : 'Unknown error'
        })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
