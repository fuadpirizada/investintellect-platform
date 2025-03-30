
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StockChart } from "@/components/shared/StockChart";
import { AIAnalysisCard } from "@/components/shared/AIAnalysisCard";
import { NewsCard } from "@/components/shared/NewsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Search, 
  ChevronRight, 
  AlertCircle, 
  TrendingUp, 
  BarChart3, 
  Briefcase,
  X,
  History 
} from "lucide-react";
import { toast } from "sonner";

// Import API services
import { 
  fetchStockQuote, 
  fetchHistoricalData, 
  searchStocks, 
  fetchMarketNews 
} from "@/services/yahooFinanceService";

import { 
  fetchTechnicalIndicators 
} from "@/services/alphaVantageService";

import { 
  analyzeStockWithAI, 
  AIAnalysisResult 
} from "@/services/geminiService";

import { StockData, NewsItem } from "@/services/apiConfig";

// Local storage keys
const SEARCH_HISTORY_KEY = "financeai_search_history";

// Interface for search results
interface SearchResult {
  symbol: string;
  name: string;
  exchange?: string;
  type?: string;
}

const Analyzer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  
  // Data states
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [technicalIndicators, setTechnicalIndicators] = useState<any[]>([]);
  
  // Search states
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  // Function to update search history
  const updateSearchHistory = (symbol: string) => {
    const updatedHistory = [
      symbol,
      ...searchHistory.filter(item => item !== symbol).slice(0, 4)
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  };
  
  // Handle search input change
  const handleSearchChange = async (value: string) => {
    setSearchQuery(value.toUpperCase());
    setError("");
    
    if (value.length > 1) {
      try {
        const results = await searchStocks(value);
        setSearchResults(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error searching stocks:", err);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  // Handle stock selection
  const selectStock = (symbol: string) => {
    setSearchQuery(symbol);
    setShowSuggestions(false);
  };
  
  // Main analysis function
  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter a stock symbol");
      return;
    }
    
    setError("");
    setIsAnalyzing(true);
    
    try {
      // Fetch stock data
      const stockQuote = await fetchStockQuote(searchQuery);
      setStockData(stockQuote);
      
      // Fetch historical data for chart
      const historicalData = await fetchHistoricalData(searchQuery, '1d', '1mo');
      setChartData(historicalData);
      
      // Fetch news data
      const newsItems = await fetchMarketNews([searchQuery]);
      setNewsData(newsItems);
      
      // Fetch technical indicators
      const indicators = await fetchTechnicalIndicators(searchQuery, 'RSI');
      setTechnicalIndicators(indicators);
      
      // Get AI analysis
      const analysis = await analyzeStockWithAI(
        searchQuery,
        stockQuote,
        newsItems,
        indicators
      );
      setAiAnalysis(analysis);
      
      // Update search history
      updateSearchHistory(searchQuery);
      
      // Show results
      setShowResults(true);
      toast.success(`Analysis complete for ${searchQuery}`);
    } catch (err: any) {
      console.error("Error analyzing stock:", err);
      setError(err.message || "Failed to analyze stock. Please try again.");
      toast.error(`Error: ${err.message || "Failed to analyze stock"}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setError("");
  };
  
  // Format financial data for display
  const formatFinancialData = () => {
    if (!stockData) return [];
    
    return [
      { metric: "Market Cap", value: stockData.marketCap ? `$${(stockData.marketCap / 1000000000).toFixed(2)}B` : "N/A" },
      { metric: "Volume", value: stockData.volume ? stockData.volume.toLocaleString() : "N/A" },
      { metric: "Avg. Volume", value: stockData.avgVolume ? stockData.avgVolume.toLocaleString() : "N/A" },
      { metric: "High Today", value: stockData.high ? `$${stockData.high.toFixed(2)}` : "N/A" },
      { metric: "Low Today", value: stockData.low ? `$${stockData.low.toFixed(2)}` : "N/A" },
      { metric: "Open", value: stockData.open ? `$${stockData.open.toFixed(2)}` : "N/A" },
      { metric: "Previous Close", value: stockData.previousClose ? `$${stockData.previousClose.toFixed(2)}` : "N/A" },
      { metric: "Last Updated", value: stockData.timestamp ? new Date(stockData.timestamp * 1000).toLocaleString() : "N/A" },
    ];
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Stock Analyzer</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-finance-yellow" />
              AI-Powered Stock Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter stock symbol (e.g., AAPL, MSFT)"
                    className="pl-10 pr-10"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  {searchQuery && (
                    <button 
                      className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                      onClick={clearSearch}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {error && <p className="text-sm text-finance-red mt-1">{error}</p>}
                
                {showSuggestions && searchQuery && (
                  <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg">
                    {searchResults.length > 0 ? (
                      <>
                        {searchResults.map((stock) => (
                          <div 
                            key={stock.symbol}
                            className="p-2 hover:bg-accent cursor-pointer flex justify-between"
                            onClick={() => selectStock(stock.symbol)}
                          >
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-muted-foreground text-sm">{stock.name}</div>
                          </div>
                        ))}
                      </>
                    ) : (
                      searchQuery.length > 1 && (
                        <div className="p-2 text-muted-foreground">No matching stocks found</div>
                      )
                    )}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <History className="h-3 w-3 mr-1" />
                    <span>Recent:</span>
                  </div>
                  {searchHistory.map((item) => (
                    <Button 
                      key={item} 
                      variant="outline" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => selectStock(item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  Enter a stock symbol to get real-time analysis and insights powered by Gemini AI.
                </p>
              </div>
              <Button 
                onClick={handleSearch} 
                className="min-w-32"
                disabled={!searchQuery || isAnalyzing}
              >
                {isAnalyzing ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Analyze</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 justify-between py-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>Our AI analyzes 100+ data points from market data, news, and financials.</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <TrendingUp className="h-4 w-4 mr-2" />
                Top Movers
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <BarChart3 className="h-4 w-4 mr-2" />
                Market Trends
              </Button>
              <Button variant="outline" size="sm">
                <Briefcase className="h-4 w-4 mr-2" />
                My Watchlist
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        {/* Analysis Results */}
        {showResults && stockData && aiAnalysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StockChart
                  symbol={stockData.symbol}
                  currentPrice={stockData.currentPrice}
                  change={stockData.change}
                  changePercent={stockData.changePercent}
                  chartData={chartData}
                />
              </div>
              <div>
                <AIAnalysisCard
                  symbol={stockData.symbol}
                  companyName={stockData.companyName}
                  recommendation={aiAnalysis.recommendation}
                  confidenceScore={aiAnalysis.confidenceScore}
                  shortTermOutlook={aiAnalysis.shortTermOutlook}
                  longTermOutlook={aiAnalysis.longTermOutlook}
                  riskLevel={aiAnalysis.riskLevel}
                  keyFactors={aiAnalysis.keyFactors}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Key Financials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {formatFinancialData().map((item) => (
                        <div key={item.metric} className="space-y-1">
                          <p className="text-sm text-muted-foreground">{item.metric}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Related News</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {newsData.length > 0 ? (
                        newsData.slice(0, 4).map((news, index) => (
                          <NewsCard
                            key={index}
                            title={news.title}
                            source={news.source}
                            time={news.publishedTime}
                            summary={news.summary}
                            sentiment={news.sentiment || "neutral"}
                            category={news.category || "Stock News"}
                            relatedSymbols={news.relatedSymbols || [stockData.symbol]}
                            imageUrl={news.imageUrl || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                          />
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-6 text-muted-foreground">
                          No recent news available for {stockData.symbol}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Analyzer;
