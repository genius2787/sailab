import { NextRequest } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { stocks } = await request.json();
    
    if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No stocks provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[API Stream] Analyzing stocks:', stocks);

    // Paths
    const tradeAgentPath = path.join(process.cwd(), '..', 'TradeAgent');
    const srcPath = path.join(tradeAgentPath, 'src');
    const configPath = path.join(tradeAgentPath, 'config', 'config.ini');
    const commonConfigPath = path.join(tradeAgentPath, 'config', 'common_config.ini');

    // Check if paths exist
    try {
      await fs.access(tradeAgentPath);
      await fs.access(srcPath);
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'TradeAgent directory not found' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Use date 5 days ago for analysis
    const date = new Date();
    date.setDate(date.getDate() - 5);
    const analysisDate = date.toISOString().split('T')[0];

    // Create a readable stream for Server-Sent Events
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        
        // Send initial message
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'start', message: 'Starting analysis...' })}\n\n`));

        // Process each stock
        const processStock = async (stock: string) => {
          try {
            // Update config.ini
            const configContent = `[SETTING]\nlanguage = English\n\n[TRADE]\nTICKER_SYMBOL = ${stock}\nDATE = ${analysisDate}\n`;
            await fs.writeFile(configPath, configContent, 'utf-8');
            
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'config', message: `Updated config for ${stock}`, stock })}\n\n`));

            // Run TradeAgent
            const pythonProcess = spawn('D:\\anaconda\\envs\\FinRL\\python.exe', [
              'main.py',
              '--config', configPath,
              '--common_config', commonConfigPath
            ], {
              cwd: srcPath,
              stdio: ['pipe', 'pipe', 'pipe'],
              shell: true
            });

            // Send process start message
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'process_start', message: `Starting TradeAgent for ${stock}`, stock })}\n\n`));

            // Handle stdout
            pythonProcess.stdout.on('data', (data) => {
              const output = data.toString();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'stdout', message: output, stock })}\n\n`));
            });

            // Handle stderr
            pythonProcess.stderr.on('data', (data) => {
              const output = data.toString();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'stderr', message: output, stock })}\n\n`));
            });

            // Handle process completion
            pythonProcess.on('close', (code) => {
              if (code === 0) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'process_complete', message: `TradeAgent completed for ${stock}`, stock, code })}\n\n`));
              } else {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'process_error', message: `TradeAgent failed for ${stock} with code ${code}`, stock, code })}\n\n`));
              }
            });

            pythonProcess.on('error', (error) => {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'process_error', message: `Failed to start TradeAgent for ${stock}: ${error.message}`, stock })}\n\n`));
            });

            // Wait for process to complete
            await new Promise((resolve) => {
              pythonProcess.on('close', resolve);
            });

          } catch (error: any) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: `Error processing ${stock}: ${error.message}`, stock })}\n\n`));
          }
        };

        // Process all stocks sequentially
        const processAllStocks = async () => {
          for (const stock of stocks) {
            await processStock(stock);
          }
          // Send completion message
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'complete', message: 'All analysis completed' })}\n\n`));
          controller.close();
        };

        processAllStocks().catch(error => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: `Analysis failed: ${error.message}` })}\n\n`));
          controller.close();
        });
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error: any) {
    console.error('[API Stream Error]:', error);
    return new Response(
      JSON.stringify({ error: 'Analysis failed', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
