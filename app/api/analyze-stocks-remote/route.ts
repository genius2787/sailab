import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300; // 5 minutes timeout

export async function POST(request: NextRequest) {
  try {
    const { stocks } = await request.json();
    
    if (!stocks || stocks.length === 0) {
      return NextResponse.json({ error: 'No stocks provided' }, { status: 400 });
    }

    const stock = stocks[0]; // Analyze first stock
    
    // Get TradeAgent API configuration from environment variables
    const TRADEAGENT_API_URL = process.env.TRADEAGENT_API_URL;
    const TRADEAGENT_API_KEY = process.env.TRADEAGENT_API_KEY;
    
    if (!TRADEAGENT_API_URL || !TRADEAGENT_API_KEY) {
      console.error('[TradeAgent API] Missing configuration');
      return NextResponse.json({ 
        error: 'TradeAgent API not configured. Please contact administrator.' 
      }, { status: 500 });
    }

    console.log(`[TradeAgent API] Starting analysis for ${stock}`);
    console.log(`[TradeAgent API] API URL: ${TRADEAGENT_API_URL}`);

    // Start the analysis job
    const startResponse = await fetch(`${TRADEAGENT_API_URL}/api/analyze`, {
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

    if (!startResponse.ok) {
      const error = await startResponse.text();
      console.error('[TradeAgent API] Start failed:', error);
      throw new Error(`Failed to start analysis: ${error}`);
    }

    const { job_id } = await startResponse.json();
    console.log(`[TradeAgent API] Job started: ${job_id}`);

    // Poll for completion
    let attempts = 0;
    const maxAttempts = 120; // 10 minutes maximum (5 second intervals)
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      
      const statusResponse = await fetch(`${TRADEAGENT_API_URL}/api/status/${job_id}`, {
        headers: {
          'X-API-Key': TRADEAGENT_API_KEY,
        },
      });

      if (!statusResponse.ok) {
        throw new Error('Failed to check job status');
      }

      const jobStatus = await statusResponse.json();
      console.log(`[TradeAgent API] Job status: ${jobStatus.status} - ${jobStatus.progress || ''}`);

      if (jobStatus.status === 'completed') {
        console.log('[TradeAgent API] Analysis completed successfully');
        return NextResponse.json({
          success: true,
          stock: stock,
          results: jobStatus.result
        });
      }

      if (jobStatus.status === 'failed') {
        console.error('[TradeAgent API] Analysis failed:', jobStatus.error);
        throw new Error(jobStatus.error || 'Analysis failed');
      }

      attempts++;
    }

    // Timeout
    throw new Error('Analysis timeout - taking longer than expected');

  } catch (error: any) {
    console.error('[TradeAgent API] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze stock' },
      { status: 500 }
    );
  }
}





