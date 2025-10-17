"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { GL } from "./gl";
import { useLanguage } from "@/contexts/language-context";
import { SummaryZone } from "./financial/summary-zone";
import { AgentVotingPanel } from "./financial/agent-voting-panel";
import { KPISnapshot } from "./financial/kpi-snapshot";
import { NewsTicker } from "./financial/news-ticker";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Users,
  Target,
  Brain,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Settings,
  Bell,
  Filter,
  Zap,
  Newspaper
} from "lucide-react";

export default function Dashboard() {
  const { t } = useLanguage();
  const { data: session, status } = useSession();
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [analyzedStocks, setAnalyzedStocks] = useState<string[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customStock, setCustomStock] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ symbol: string; name: string }>>([]);
  const [streamOutput, setStreamOutput] = useState<string[]>([]);
  const [currentStock, setCurrentStock] = useState<string>('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [agentResults, setAgentResults] = useState<{
    rlAgent?: string;
    financialAgent?: string;
    newsAgent?: string;
    institutionalAgent?: string;
  }>({});
  const [finalOutput, setFinalOutput] = useState<any>(null);
  
  // Debug: log whenever finalOutput or agentResults change
  useEffect(() => {
    console.log('[Dashboard State] finalOutput changed:', finalOutput);
    console.log('[Dashboard State] agentResults changed:', agentResults);
  }, [finalOutput, agentResults]);
  const [newsData, setNewsData] = useState<string>('');
  const [financialData, setFinancialData] = useState<string>('');
  const [quotaInfo, setQuotaInfo] = useState<{
    usedToday: number;
    limit: number;
    remaining: number;
    tier: string;
  } | null>(null);

  // Debug logging for agentResults
  console.log('[Dashboard] agentResults state:', agentResults);
  
  // Extended stock database for autocomplete
  const stockDatabase = [
    { symbol: 'MU', name: 'Micron Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'TSM', name: 'Taiwan Semiconductor' },
    { symbol: 'ASML', name: 'ASML Holding' },
    { symbol: 'SONY', name: 'Sony Group Corporation' },
    { symbol: 'TM', name: 'Toyota Motor Corporation' },
    { symbol: 'BABA', name: 'Alibaba Group' },
    { symbol: 'BIDU', name: 'Baidu Inc.' },
    { symbol: 'NIO', name: 'NIO Inc.' },
    { symbol: 'XPEV', name: 'XPeng Inc.' },
    { symbol: 'LI', name: 'Li Auto Inc.' },
    { symbol: 'PYPL', name: 'PayPal Holdings' },
    { symbol: 'SQ', name: 'Block Inc.' },
    { symbol: 'SHOP', name: 'Shopify Inc.' },
    { symbol: 'UBER', name: 'Uber Technologies' },
    { symbol: 'ABNB', name: 'Airbnb Inc.' },
    { symbol: 'SPOT', name: 'Spotify Technology' },
    { symbol: 'RBLX', name: 'Roblox Corporation' },
    { symbol: 'U', name: 'Unity Software' },
    { symbol: 'PLTR', name: 'Palantir Technologies' },
    { symbol: 'SNOW', name: 'Snowflake Inc.' },
    { symbol: 'COIN', name: 'Coinbase Global' },
    { symbol: 'ZM', name: 'Zoom Video Communications' },
    { symbol: 'DOCU', name: 'DocuSign Inc.' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log('[Dashboard] Session status:', status);
    console.log('[Dashboard] Session data:', session);
    if (session?.user) {
      console.log('[Dashboard] User name:', session.user.name);
      console.log('[Dashboard] User email:', session.user.email);
      console.log('[Dashboard] User tier:', (session.user as any).tier);
    }
  }, [session, status]);

  // Fetch quota information
  const fetchQuotaInfo = async () => {
    try {
      const response = await fetch('/api/quota');
      if (response.ok) {
        const data = await response.json();
        setQuotaInfo(data);
        console.log('[Dashboard] Quota info:', data);
      } else {
        console.error('[Dashboard] Failed to fetch quota info');
      }
    } catch (error) {
      console.error('[Dashboard] Error fetching quota info:', error);
    }
  };

  // Load quota info when component mounts
  useEffect(() => {
    if (session?.user) {
      fetchQuotaInfo();
    }
  }, [session]);

  // Handle stock analysis with remote API
  const handleAnalyzeStocks = async () => {
    if (!selectedStock) return;
    
    // Check quota before starting analysis
    if (quotaInfo && quotaInfo.remaining <= 0) {
      setStreamOutput(prev => [...prev, `[ERROR] Daily quota exceeded. You have used ${quotaInfo.usedToday}/${quotaInfo.limit} searches today.`]);
      return;
    }
    
    setIsAnalyzing(true);
    setStreamOutput([]);
    setCurrentStock(selectedStock);
    setAgentResults({});
    setFinalOutput(null);
    setNewsData('');
    setFinancialData('');
    console.log('[Dashboard] Analyzing stock:', selectedStock);
    
    try {
      // Call Remote Trading Agent Streaming API
      console.log('[Dashboard] Calling remote TradeAgent streaming API...');
      
      const response = await fetch('/api/analyze-stocks-stream-remote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stocks: [selectedStock] })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }
      
      const decoder = new TextDecoder();
      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              console.log('[Dashboard] Stream data:', data);
              
              // Only add to stream output for stdout/stderr/info types (not for data types)
              if (data.type === 'stdout' || data.type === 'stderr' || data.type === 'info' || data.type === 'debug' || data.type === 'error') {
                const timestamp = new Date().toLocaleTimeString();
                const lines = data.message.split('\n').filter((l: string) => l.trim() !== '');
                setStreamOutput(prev => [...prev, ...lines.map((l: string) => `[${timestamp}] [${data.type}] ${l}`)]);
                
                // Auto-scroll to bottom
                setTimeout(() => {
                  if (terminalRef.current) {
                    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
                  }
                }, 100);
              }
              
              // Handle Final Output (contains all agent results and consensus)
              if (data.type === 'final_output') {
                try {
                  console.log('[Dashboard] Raw final_output message:', data.message);
                  const finalOutputData = JSON.parse(data.message);
                  console.log('[Dashboard] Parsed Final Output:', finalOutputData);
                  setFinalOutput(finalOutputData);
                  
                  const timestamp = new Date().toLocaleTimeString();
                  setStreamOutput(prev => [...prev, `[${timestamp}] [final_output] Received Final Output with agent votes`]);
                  
                  // Extract individual agent results
                  Object.entries(finalOutputData).forEach(([stock, result]: [string, any]) => {
                    console.log('[Dashboard] Processing stock:', stock);
                    console.log('[Dashboard] Result structure:', result);
                    
                    if (result.Evaluation) {
                      // More robust field mapping with fallbacks
                      const evaluation = result.Evaluation;
                      
                      // Helper function to find field with multiple possible names
                      const findField = (possibleNames: string[]) => {
                        for (const name of possibleNames) {
                          if (evaluation[name]) return evaluation[name];
                        }
                        return '';
                      };
                      
                      const newAgentResults = {
                        rlAgent: findField([
                          'RL_agent_result',
                          'rl_agent_result', 
                          'RLAgent_result',
                          'rlAgent_result',
                          'RL_Agent_Result'
                        ]),
                        financialAgent: findField([
                          'Financial_agent_result',
                          'financial_agent_result',
                          'FinancialAgent_result', 
                          'financialAgent_result',
                          'Financial_Agent_Result'
                        ]),
                        newsAgent: findField([
                          'News_agent_result',
                          'news_agent_result',
                          'NewsAgent_result',
                          'newsAgent_result', 
                          'News_Agent_Result'
                        ]),
                        institutionalAgent: findField([
                          'Professional_institutions_prediction_search_agent_result',
                          'professional_institutions_prediction_search_agent_result',
                          'ProfessionalInstitutions_prediction_search_agent_result',
                          'professionalInstitutions_prediction_search_agent_result',
                          'Professional_Institutions_Prediction_Search_Agent_Result',
                          'institutional_agent_result',
                          'Institutional_agent_result'
                        ])
                      };
                      
                      console.log('[Dashboard] Available Evaluation fields:', Object.keys(evaluation));
                      console.log('[Dashboard] Setting agent results:', newAgentResults);
                      
                      // Check if any fields are missing
                      const missingFields = [];
                      if (!newAgentResults.rlAgent) missingFields.push('RL Agent');
                      if (!newAgentResults.financialAgent) missingFields.push('Financial Agent');
                      if (!newAgentResults.newsAgent) missingFields.push('News Agent');
                      if (!newAgentResults.institutionalAgent) missingFields.push('Institutional Agent');
                      
                      if (missingFields.length > 0) {
                        console.warn('[Dashboard] Missing agent results:', missingFields);
                        console.warn('[Dashboard] Available fields in Evaluation:', Object.keys(evaluation));
                      }
                      
                      setAgentResults(newAgentResults);
                      
                      // Also set individual data for backward compatibility
                      if (result.Evaluation.Financial_agent_result) {
                        setFinancialData(result.Evaluation.Financial_agent_result);
                      }
                      if (result.Evaluation.News_agent_result) {
                        setNewsData(result.Evaluation.News_agent_result);
                      }
                      
                      setStreamOutput(prev => [...prev, `[${timestamp}] [final_output] Agent results updated successfully`]);
                    } else {
                      console.warn('[Dashboard] No Evaluation field in result');
                    }
                  });
                } catch (e) {
                  console.error('[Dashboard] Failed to parse Final Output:', e);
                  const timestamp = new Date().toLocaleTimeString();
                  setStreamOutput(prev => [...prev, `[${timestamp}] [error] Failed to parse Final Output`]);
                }
              }
              
              // Handle financial agent output
              if (data.type === 'financial_agent') {
                console.log('[Dashboard] Received financial_agent data:', data.message.substring(0, 200) + '...');
                setFinancialData(data.message);
                setAgentResults(prev => ({
                  ...prev,
                  financialAgent: data.message
                }));
                console.log('[Dashboard] Financial data state updated');
              }
              
              // Handle news agent output
              if (data.type === 'news_agent') {
                console.log('[Dashboard] Received news_agent data:', data.message.substring(0, 200) + '...');
                setNewsData(data.message);
                setAgentResults(prev => ({
                  ...prev,
                  newsAgent: data.message
                }));
                console.log('[Dashboard] News data state updated');
              }
              
              // Handle completion
              if (data.type === 'complete') {
                setAnalyzedStocks([selectedStock]);
                // Update quota after successful analysis
                await fetchQuotaInfo();
              }
              
            } catch (e) {
              console.error('[Dashboard] Failed to parse stream data:', e);
            }
          }
        }
      }
      
    } catch (error) {
      console.error('[Dashboard] Analysis failed:', error);
      
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setStreamOutput(prev => [...prev, `[ERROR] ${errorMessage}`]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const observers = new Map();

    Object.entries(sectionRefs.current).forEach(([key, element]) => {
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, key]));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
        observers.set(key, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const recentTrades = [
    {
      symbol: "AAPL",
      action: "BUY",
      quantity: 150,
      price: "$182.45",
      time: "09:34 AM",
      pnl: "+$2,340",
      status: "executed"
    },
    {
      symbol: "TSLA",
      action: "SELL",
      quantity: 75,
      price: "$248.92",
      time: "09:28 AM",
      pnl: "+$1,892",
      status: "executed"
    },
    {
      symbol: "NVDA",
      action: "BUY",
      quantity: 50,
      price: "$489.12",
      time: "09:15 AM",
      pnl: "+$3,245",
      status: "executed"
    },
    {
      symbol: "MSFT",
      action: "SELL",
      quantity: 100,
      price: "$378.55",
      time: "09:02 AM",
      pnl: "-$987",
      status: "executed"
    }
  ];

  console.log('[Dashboard] Current status:', status);
  console.log('[Dashboard] Session:', session);

  return (
    <div className="min-h-screen relative bg-background">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto pt-64 pb-12 px-6">
        {/* Header */}
        <div className="mb-8" ref={el => { sectionRefs.current.header = el; }}>
          <h1 className={`text-4xl md:text-5xl font-mono font-bold text-foreground mb-4 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            Hello, {session?.user?.name || session?.user?.email?.split('@')[0] || 'Member'}! Welcome Back
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <p className={`text-lg text-foreground/70 font-mono mb-2 ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                LLM Multiagent Powered analysis for your selected stocks
              </p>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
                  👤 {session?.user?.name || session?.user?.email || 'Member'}
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 font-mono">
                  💎 Paid Member
                </Badge>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 font-mono">
                  ⭐ {(session?.user as any)?.tier || 'Enterprise'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20 font-mono cursor-default">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Your Agents Online
              </Button>
              <Button variant="outline" size="sm" className="font-mono">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t('dashboard.refresh')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="font-mono text-red-500 border-red-500/30 hover:bg-red-500/10"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* User Quota Card */}
        <>
        <div className="mb-8 mt-16">
          <Card className="bg-gradient-to-r from-primary/10 via-background/50 to-primary/10 backdrop-blur-sm border-primary/30">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Tier Info */}
                <div className="text-center">
                  <div className="text-sm font-mono text-foreground/60 mb-2">Your Plan</div>
                  <div className="text-2xl font-mono font-bold text-primary mb-1">
                    {(session?.user as any)?.tier || 'Enterprise'}
                    </div>
                    <div className="text-xs font-mono text-foreground/50">
                      {(session?.user as any)?.tier === 'Starter' ? '9 stocks / 3 days' : 
                       (session?.user as any)?.tier === 'Professional' ? '30 stocks / 3 days' : 
                       '90 stocks / 3 days'}
                    </div>
                  </div>

                  {/* Daily Limit */}
                  <div className="text-center">
                    <div className="text-sm font-mono text-foreground/60 mb-2">Daily Limit</div>
                    <div className="text-2xl font-mono font-bold text-foreground">
                      {quotaInfo?.limit || ((session?.user as any)?.tier === 'Starter' ? 3 : 
                       (session?.user as any)?.tier === 'Professional' ? 10 : 30)}
                      <span className="text-sm text-foreground/60 ml-1">stocks</span>
                    </div>
                  </div>

                  {/* Used Today */}
                  <div className="text-center">
                    <div className="text-sm font-mono text-foreground/60 mb-2">Used Today</div>
                    <div className="text-2xl font-mono font-bold text-orange-500">
                      {quotaInfo?.usedToday || 0}
                      <span className="text-sm text-foreground/60 ml-1">analyses</span>
                    </div>
                  </div>

                  {/* Remaining */}
                  <div className="text-center">
                    <div className="text-sm font-mono text-foreground/60 mb-2">Remaining Today</div>
                    <div className="text-2xl font-mono font-bold text-green-500">
                      {quotaInfo?.remaining || 0}
                      <span className="text-sm text-foreground/60 ml-1">left</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-6 border-t border-border/20">
                  <div className="flex justify-between items-center text-xs font-mono text-foreground/60 mb-2">
                    <span>Daily Usage Progress</span>
                    <span className="text-foreground/50">{quotaInfo?.usedToday || 0} / {quotaInfo?.limit || 0}</span>
                  </div>
                  <div className="w-full bg-border/40 rounded-full h-4 overflow-hidden border border-border/60">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 via-orange-500 to-green-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-yellow-500/20" 
                      style={{ 
                        width: `${quotaInfo ? Math.max(3, (quotaInfo.usedToday / quotaInfo.limit) * 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs font-mono text-foreground/50 text-right mt-2">
                    Resets at midnight JST
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stock Selection */}
          <div className="mb-8">
            <Card className="bg-gradient-to-br from-yellow-500/10 via-background/50 to-orange-500/10 backdrop-blur-sm border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-2xl font-mono">Select Stocks to Analyze</CardTitle>
                <CardDescription className="font-mono">
                  Choose <span className="text-yellow-500 font-bold text-lg">1</span> stock from US market or search custom symbols
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Custom Stock Search */}
                <div className="relative">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Search stocks (e.g., Micro, Tesla, SONY, etc.)"
                        value={customStock}
                        onChange={(e) => {
                          const value = e.target.value.toUpperCase();
                          setCustomStock(value);
                          
                          // Filter suggestions
                          if (value.length >= 2) {
                            const filtered = stockDatabase.filter(stock => 
                              stock.symbol.includes(value) || 
                              stock.name.toUpperCase().includes(value)
                            ).slice(0, 5);
                            setSuggestions(filtered);
                          } else {
                            setSuggestions([]);
                          }
                        }}
                        onBlur={() => {
                          // Delay to allow click on suggestion
                          setTimeout(() => setSuggestions([]), 200);
                        }}
                        className="font-mono"
                      />
                      
                      {/* Suggestions dropdown */}
                      {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-yellow-500/40 rounded-md shadow-xl z-50 max-h-48 overflow-y-auto">
                          {suggestions.map((stock) => (
                            <button
                              key={stock.symbol}
                              className="w-full text-left px-4 py-2 hover:bg-yellow-500/10 font-mono text-sm transition-colors"
                              onClick={() => {
                                if (selectedStock !== stock.symbol) {
                                  setSelectedStock(stock.symbol);
                                  setCustomStock("");
                                  setSuggestions([]);
                                }
                              }}
                              disabled={selectedStock === stock.symbol}
                            >
                              <span className="text-yellow-500 font-bold">
                                {stock.symbol}
                              </span>
                              <span className="text-foreground/60 ml-2">
                                ({stock.name})
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        if (customStock && selectedStock !== customStock) {
                          setSelectedStock(customStock);
                          setCustomStock("");
                          setSuggestions([]);
                        }
                      }}
                      disabled={!customStock || selectedStock === customStock}
                      className="font-mono"
                    >
                      Add Stock
                    </Button>
                  </div>
                </div>

                {/* Selected Custom Stocks */}
                {(() => {
                  const quickSelectSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'BRK.B', 'JPM', 'V', 'MA', 'BAC', 'WFC', 'GS', 'MS', 'AVGO', 'ORCL', 'AMD', 'INTC', 'QCOM', 'CRM', 'ADBE', 'CSCO', 'LLY', 'UNH', 'JNJ', 'ABBV', 'MRK', 'PFE', 'COST', 'HD', 'WMT', 'PG', 'KO', 'PEP', 'MCD', 'NKE', 'SBUX', 'XOM', 'CVX', 'NFLX', 'DIS', 'CMCSA', 'F', 'GM', 'BA', 'CAT', 'GE'];
                  const customStock = selectedStock && !quickSelectSymbols.includes(selectedStock) ? selectedStock : null;
                  
                  if (!customStock) return null;
                  
                  const stockInfo = stockDatabase.find(s => s.symbol === customStock);
                  const displayText = stockInfo ? `${customStock} (${stockInfo.name})` : customStock;
                  
                  return (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-mono text-foreground/60">Custom selection:</span>
                      <Badge 
                        variant="outline"
                        className="bg-yellow-500/20 border-yellow-500 text-yellow-500 font-mono cursor-pointer hover:bg-yellow-500/30"
                        onClick={() => setSelectedStock('')}
                      >
                        {displayText} ✕
                      </Badge>
                    </div>
                  );
                })()}

                <div className="border-t border-border/20 pt-4">
                  <p className="text-xs font-mono text-foreground/60 mb-4">Top US Stocks (Quick Select)</p>
                  
                  {/* Stock Categories */}
                  {[
                    {
                      category: '💻 Technology Giants',
                      stocks: [
                        { symbol: 'AAPL', name: 'Apple Inc.' },
                        { symbol: 'MSFT', name: 'Microsoft Corp.' },
                        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
                        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
                        { symbol: 'META', name: 'Meta Platforms' },
                      ]
                    },
                    {
                      category: '🔌 Semiconductors & Software',
                      stocks: [
                        { symbol: 'NVDA', name: 'NVIDIA Corp.' },
                        { symbol: 'AVGO', name: 'Broadcom Inc.' },
                        { symbol: 'AMD', name: 'AMD' },
                        { symbol: 'INTC', name: 'Intel Corp.' },
                        { symbol: 'QCOM', name: 'Qualcomm Inc.' },
                        { symbol: 'ORCL', name: 'Oracle Corp.' },
                        { symbol: 'CRM', name: 'Salesforce' },
                        { symbol: 'ADBE', name: 'Adobe Inc.' },
                        { symbol: 'CSCO', name: 'Cisco Systems' },
                      ]
                    },
                    {
                      category: '💰 Finance & Banking',
                      stocks: [
                        { symbol: 'BRK.B', name: 'Berkshire Hathaway' },
                        { symbol: 'JPM', name: 'JPMorgan Chase' },
                        { symbol: 'V', name: 'Visa Inc.' },
                        { symbol: 'MA', name: 'Mastercard' },
                        { symbol: 'BAC', name: 'Bank of America' },
                        { symbol: 'WFC', name: 'Wells Fargo' },
                        { symbol: 'GS', name: 'Goldman Sachs' },
                        { symbol: 'MS', name: 'Morgan Stanley' },
                      ]
                    },
                    {
                      category: '🏥 Healthcare & Pharma',
                      stocks: [
                        { symbol: 'LLY', name: 'Eli Lilly' },
                        { symbol: 'UNH', name: 'UnitedHealth' },
                        { symbol: 'JNJ', name: 'Johnson & Johnson' },
                        { symbol: 'ABBV', name: 'AbbVie Inc.' },
                        { symbol: 'MRK', name: 'Merck & Co.' },
                        { symbol: 'PFE', name: 'Pfizer Inc.' },
                      ]
                    },
                    {
                      category: '🛒 Consumer & Retail',
                      stocks: [
                        { symbol: 'COST', name: 'Costco' },
                        { symbol: 'HD', name: 'Home Depot' },
                        { symbol: 'WMT', name: 'Walmart Inc.' },
                        { symbol: 'PG', name: 'Procter & Gamble' },
                        { symbol: 'KO', name: 'Coca-Cola' },
                        { symbol: 'PEP', name: 'PepsiCo Inc.' },
                        { symbol: 'MCD', name: 'McDonald\'s' },
                        { symbol: 'NKE', name: 'Nike Inc.' },
                        { symbol: 'SBUX', name: 'Starbucks' },
                      ]
                    },
                    {
                      category: '🎬 Entertainment & Media',
                      stocks: [
                        { symbol: 'NFLX', name: 'Netflix Inc.' },
                        { symbol: 'DIS', name: 'Walt Disney' },
                        { symbol: 'CMCSA', name: 'Comcast Corp.' },
                      ]
                    },
                    {
                      category: '⚡ Energy',
                      stocks: [
                        { symbol: 'XOM', name: 'Exxon Mobil' },
                        { symbol: 'CVX', name: 'Chevron Corp.' },
                      ]
                    },
                    {
                      category: '🚗 Automotive & Industrial',
                      stocks: [
                        { symbol: 'TSLA', name: 'Tesla Inc.' },
                        { symbol: 'F', name: 'Ford Motor' },
                        { symbol: 'GM', name: 'General Motors' },
                        { symbol: 'BA', name: 'Boeing Co.' },
                        { symbol: 'CAT', name: 'Caterpillar Inc.' },
                        { symbol: 'GE', name: 'General Electric' },
                      ]
                    },
                  ].map((category) => (
                    <div key={category.category} className="mb-4">
                      <h3 className="text-sm font-mono font-bold text-yellow-500 mb-2">{category.category}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {category.stocks.map((stock) => {
                    const isSelected = selectedStock === stock.symbol;
                    
                    return (
                      <Button
                        key={stock.symbol}
                        variant="outline"
                        className={`font-mono text-sm h-auto py-3 px-4 flex flex-col items-start transition-all ${
                          isSelected 
                            ? 'bg-yellow-500/20 border-yellow-500 shadow-lg shadow-yellow-500/20' 
                            : 'hover:bg-primary/10 hover:border-primary/40'
                        }`}
                        onClick={() => {
                          setSelectedStock(isSelected ? '' : stock.symbol);
                        }}
                      >
                        <span className={`font-bold ${isSelected ? 'text-yellow-500' : 'text-primary'}`}>{stock.symbol}</span>
                        <span className={`text-xs truncate w-full text-left ${isSelected ? 'text-yellow-600' : 'text-foreground/60'}`}>{stock.name}</span>
                      </Button>
                    );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/20">
                  <div className="text-sm font-mono text-foreground/60">
                    <span className="text-yellow-500 font-bold text-lg">{selectedStock ? '1' : '0'}</span> / 1 stock selected
                  </div>
                  <Button 
                    className="font-mono px-8"
                    disabled={!selectedStock || isAnalyzing || (quotaInfo && quotaInfo.remaining <= 0)}
                    onClick={handleAnalyzeStocks}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : quotaInfo && quotaInfo.remaining <= 0 ? (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Quota Exceeded
                      </>
                    ) : (
                      'Analyze Selected Stocks'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-4 space-y-8">
            {/* Real-time Terminal Output - Always Visible */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white font-mono">
                  Trading Agent Live Output
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setStreamOutput([])}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded transition-colors"
                    disabled={isAnalyzing}
                  >
                    Clear Log
                  </button>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-400 font-mono">
                      {isAnalyzing 
                        ? (currentStock ? `Processing ${currentStock}` : 'Initializing...')
                        : 'Ready'
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div ref={terminalRef} className="bg-black rounded-lg p-4 h-80 overflow-y-auto font-mono text-xs">
                {streamOutput.length === 0 ? (
                  <div className="text-gray-500">No analysis yet. Select stocks and click "Analyze Selected Stocks" to start.</div>
                ) : (
                  streamOutput.map((line, index) => {
                    // Color code different types of output
                    let textColor = 'text-green-400';
                    if (line.includes('[ERROR]')) textColor = 'text-red-400';
                    else if (line.includes('[WARNING]')) textColor = 'text-yellow-400';
                    else if (line.includes('[TRAIN]')) textColor = 'text-blue-400';
                    else if (line.includes('[PREDICT]')) textColor = 'text-purple-400';
                    else if (line.includes('[financial_agent]')) textColor = 'text-emerald-400';
                    else if (line.includes('[news_agent]')) textColor = 'text-orange-400';
                    else if (line.includes('[process_complete]')) textColor = 'text-green-300';
                    else if (line.includes('[separator]')) textColor = 'text-white font-bold';
                    else if (line.includes('ep_len_mean') || line.includes('ep_rew_mean') || line.includes('fps')) textColor = 'text-cyan-400';
                    else if (line.includes('Sharpe:') || line.includes('total_reward:')) textColor = 'text-yellow-300';
                    else if (line.includes('|') && line.includes('rollout')) textColor = 'text-gray-300';
                    
                    // Extract timestamp for special styling
                    const timestampMatch = line.match(/^\[(\d{1,2}:\d{2}:\d{2} [AP]M)\]/);
                    const timestamp = timestampMatch ? timestampMatch[1] : '';
                    const content = timestampMatch ? line.replace(/^\[\d{1,2}:\d{2}:\d{2} [AP]M\] /, '') : line;
                    
                    return (
                      <div key={index} className={`${textColor} mb-0.5 leading-tight`}>
                        {timestamp && (
                          <span className="text-gray-500 text-xs">[{timestamp}] </span>
                        )}
                        {content}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Summary Zone */}
            <div ref={el => { sectionRefs.current.summary = el; }}>
              <div className={`${visibleSections.has('summary') ? 'animate-fade-in-up' : ''}`}>
                <SummaryZone 
                  selectedStocks={selectedStock ? [selectedStock] : []} 
                  isLoading={isAnalyzing}
                  analysisResults={analysisResults}
                  agentResults={agentResults}
                  finalOutput={finalOutput}
                />
              </div>
            </div>

            {/* Agent Voting Panel */}
            <div ref={el => { sectionRefs.current.agents = el; }}>
              <div className={`${visibleSections.has('agents') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                <AgentVotingPanel 
                  agentResults={agentResults}
                  isLoading={isAnalyzing}
                  finalOutput={finalOutput}
                  selectedStocks={selectedStock ? [selectedStock] : []}
                />
              </div>
            </div>

            {/* Important News Block */}
            {(() => {
              console.log('[Dashboard] newsData state:', newsData);
              console.log('[Dashboard] newsData length:', newsData?.length);
              
              // Function to parse markdown bold syntax and add orange color
              const parseNewsMarkdown = (text: string) => {
                const parts = text.split(/(\*\*.*?\*\*)/g);
                return parts.map((part, index) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    const boldText = part.slice(2, -2);
                    return <span key={index} className="font-bold text-orange-400">{boldText}</span>;
                  }
                  return <span key={index}>{part}</span>;
                });
              };
              
              return newsData && (
              <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-mono">
                    <Newspaper className="h-5 w-5 text-orange-400" />
                    Important News for {selectedStock || (analyzedStocks.length > 0 ? analyzedStocks[0] : '')}
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30 font-mono text-xs">
                      Latest Updates
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-background/20 backdrop-blur-sm rounded-xl border border-border/30 p-6">
                    <div className="text-sm font-mono text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {newsData.split('\n').map((line, index) => (
                        <div key={index}>{parseNewsMarkdown(line)}</div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })()}

            {/* Specific Financial Analysis Block */}
            {(() => {
              console.log('[Dashboard] financialData state:', financialData);
              console.log('[Dashboard] financialData length:', financialData?.length);
              
              // Function to parse markdown bold syntax and add green color
              const parseFinancialMarkdown = (text: string) => {
                const parts = text.split(/(\*\*.*?\*\*)/g);
                return parts.map((part, index) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    const boldText = part.slice(2, -2);
                    return <span key={index} className="font-bold text-emerald-400">{boldText}</span>;
                  }
                  return <span key={index}>{part}</span>;
                });
              };
              
              return financialData && (
              <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300 mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl font-mono">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    Specific Financial Analysis for {selectedStock || (analyzedStocks.length > 0 ? analyzedStocks[0] : '')}
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono text-xs">
                      Detailed Report
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-background/20 backdrop-blur-sm rounded-xl border border-border/30 p-6">
                    <div className="text-sm font-mono text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {financialData.split('\n').map((line, index) => (
                        <div key={index}>{parseFinancialMarkdown(line)}</div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })()}

            {/* KPI Snapshot - Hidden until real account data is available */}
            {false && (
            <div ref={el => { sectionRefs.current.kpis = el; }}>
              <div className={`${visibleSections.has('kpis') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                <KPISnapshot />
              </div>
            </div>
            )}

            {/* Recent Trades - Hidden */}
            {false && (
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300" ref={el => { sectionRefs.current.trades = el; }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-mono">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Recent Trades
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono text-xs">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription className="font-mono">
                  Latest executed trades and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className={`p-4 rounded-lg bg-background/20 border border-border/30 hover:bg-background/30 transition-all duration-300 ${visibleSections.has('trades') ? 'animate-slide-in-left' : ''}`} style={{animationDelay: visibleSections.has('trades') ? `${index * 0.1}s` : '0s'}}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant={trade.action === 'BUY' ? 'default' : 'destructive'} className="font-mono text-xs">
                            {trade.action}
                          </Badge>
                          <div>
                            <div className="font-semibold font-mono text-sm">{trade.symbol}</div>
                            <div className="text-xs text-foreground/60 font-mono">
                              {trade.quantity} shares @ {trade.price}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold font-mono text-sm ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {trade.pnl}
                          </div>
                          <div className="text-xs text-foreground/60 font-mono">
                            {trade.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            )}
          </div>

          {/* Sidebar - All blocks hidden */}
          {false && (
          <div className="xl:col-span-1 space-y-6">
            {/* Market Summary */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300" ref={el => { sectionRefs.current.market = el; }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <PieChart className="h-5 w-5 text-primary" />
                  Market Indices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-green-400">S&P 500</span>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-green-400">4,785.23</div>
                    <div className="text-xs font-mono text-green-300">+1.24% (+58.32)</div>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-green-400">NASDAQ</span>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-green-400">15,234.87</div>
                    <div className="text-xs font-mono text-green-300">+0.98% (+147.62)</div>
                  </div>

                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono text-red-400">VIX</span>
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="text-lg font-bold font-mono text-red-400">14.23</div>
                    <div className="text-xs font-mono text-red-300">-2.15% (-0.31)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <Settings className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full font-mono" variant="outline">
                    <LineChart className="h-4 w-4 mr-2" />
                    Portfolio Analysis
                  </Button>
                  <Button className="w-full font-mono" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Risk Assessment
                  </Button>
                  <Button className="w-full font-mono" variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    Agent Configuration
                  </Button>
                  <Button
                    className="w-full font-mono hover-lift"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Alert Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <Activity className="h-5 w-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">Data Feed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">AI Agents</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">4/4 Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">Trading Engine</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">Ready</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">Risk Monitor</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-amber-400">Monitoring</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Model Performance */}
            <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-mono">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-foreground/70">Model Accuracy</span>
                      <span className="text-green-400 font-semibold">87%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-foreground/70">Prediction Confidence</span>
                      <span className="text-blue-400 font-semibold">74%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-mono">
                      <span className="text-foreground/70">Win Rate</span>
                      <span className="text-purple-400 font-semibold">73%</span>
                    </div>
                    <div className="w-full bg-background/30 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '73%' }}></div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/30">
                    <div className="text-xs text-foreground/60 font-mono text-center">
                      Last updated: 2 minutes ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          )}
        </div>

        {/* News Ticker - Hidden */}
        {false && (
        <div className="mt-12 mb-8" ref={el => { sectionRefs.current.news = el; }}>
          <div className={`${visibleSections.has('news') ? 'animate-fade-in-up' : ''}`}>
            <NewsTicker />
          </div>
        </div>
        )}

        {/* Risk Disclosure - Highlighted */}
        <div className="mt-12 border-t-2 border-amber-500/30 pt-8">
          <Card className="bg-gradient-to-br from-amber-500/10 via-background/50 to-red-500/10 backdrop-blur-sm border-2 border-amber-500/40 shadow-lg shadow-amber-500/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-full bg-amber-500/20 border border-amber-500/40">
                  <AlertCircle className="h-6 w-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-mono font-bold text-amber-400 mb-3 flex items-center gap-2">
                    ⚠️ Risk Disclosure
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-foreground/90 leading-relaxed font-semibold">
                      This analysis is for informational purposes only. Market data analysis involves substantial risk.
                    </p>
                    <p className="text-sm font-mono text-foreground/80 leading-relaxed">
                      Past performance does not guarantee future results. SAIL Lab AI provides research and analysis tools, not investment advice.
                    </p>
                    <p className="text-sm font-mono text-foreground/80 leading-relaxed">
                      Please conduct your own due diligence and consult with qualified financial advisors before making any investment decisions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm font-mono text-foreground/60 border-t border-amber-500/20 pt-4 mt-4">
                <span>Last Updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                <span>•</span>
                <span className="font-bold">© 2025 SAIL Lab</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}