import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { stocks } = await request.json();
    
    if (!stocks || stocks.length === 0) {
      return NextResponse.json(
        { error: 'No stocks provided' },
        { status: 400 }
      );
    }

    console.log('[API] Analyzing stocks:', stocks);
    console.log('[API] Current working directory:', process.cwd());

    // Paths
    const tradeAgentPath = path.join(process.cwd(), '..', 'TradeAgent');
    const srcPath = path.join(tradeAgentPath, 'src');
    const configPath = path.join(tradeAgentPath, 'config', 'config.ini');
    const commonConfigPath = path.join(tradeAgentPath, 'config', 'common_config.ini');

    console.log('[API] TradeAgent path:', tradeAgentPath);
    console.log('[API] Config path:', configPath);
    
    // Check if paths exist
    try {
      await fs.access(tradeAgentPath);
      console.log('[API] TradeAgent directory exists');
    } catch (e) {
      throw new Error(`TradeAgent directory not found at: ${tradeAgentPath}`);
    }
    
    try {
      await fs.access(srcPath);
      console.log('[API] src directory exists');
    } catch (e) {
      throw new Error(`src directory not found at: ${srcPath}`);
    }

    // Use date 2 days ago for analysis (to ensure data availability)
    const date = new Date();
    date.setDate(date.getDate() - 2);
    const analysisDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    console.log('[API] Analysis date:', analysisDate);

    const results: any = {};

    // Process each stock
    for (const stock of stocks) {
      console.log(`[API] Processing ${stock}...`);

      // Update config.ini for this stock
      const configContent = `[SETTING]
language = English

[TRADE]
TICKER_SYMBOL = ${stock}
DATE = ${analysisDate}
`;
      
      await fs.writeFile(configPath, configContent, 'utf-8');
      console.log(`[API] Updated config.ini for ${stock}`);

      // Run TradeAgent
      console.log(`[API] Running TradeAgent for ${stock}...`);
      console.log(`[API] Python command: python main.py`);
      console.log(`[API] Working directory: ${srcPath}`);
      
      const output = await new Promise<string>((resolve, reject) => {
        const pythonProcess = spawn('python', ['main.py'], {
          cwd: srcPath,
          stdio: ['pipe', 'pipe', 'pipe'],
          shell: true  // Use shell on Windows
        });

        let stdout = '';
        let stderr = '';

        pythonProcess.stdout.on('data', (data) => {
          const chunk = data.toString();
          stdout += chunk;
          console.log(`[${stock}]`, chunk);
        });

        pythonProcess.stderr.on('data', (data) => {
          const chunk = data.toString();
          stderr += chunk;
          console.error(`[${stock} stderr]`, chunk);
        });

        pythonProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error(`Process exited with code ${code}: ${stderr}`));
          } else {
            resolve(stdout);
          }
        });

        // Timeout after 5 minutes
        setTimeout(() => {
          pythonProcess.kill();
          reject(new Error('Analysis timeout (5 minutes)'));
        }, 5 * 60 * 1000);
      });

      // Try to read output files
      try {
        const financialOutputPath = path.join(tradeAgentPath, 'output_financial', `Financial Data Agent_${stock}_${analysisDate}.txt`);
        const newsOutputPath = path.join(tradeAgentPath, 'output_news', `News Agent_${stock}_${analysisDate}.txt`);
        
        const financialData = await fs.readFile(financialOutputPath, 'utf-8').catch(() => 'N/A');
        const newsData = await fs.readFile(newsOutputPath, 'utf-8').catch(() => 'N/A');
        
        results[stock] = {
          financial: financialData,
          news: newsData,
          rawOutput: output
        };
      } catch (e) {
        results[stock] = {
          rawOutput: output,
          error: 'Could not read output files'
        };
      }
    }

    // Return combined results
    return NextResponse.json({
      success: true,
      stocks,
      results,
      message: 'Analysis completed successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[API Error]:', error);
    console.error('[API Error Stack]:', error.stack);
    return NextResponse.json(
      { 
        error: 'Analysis failed',
        message: error.message,
        stack: error.stack,
        details: error.toString()
      },
      { status: 500 }
    );
  }
}

