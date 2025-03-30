
import { useState } from "react";
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

// Mock stock data
const mockStockData = {
  symbol: "AAPL",
  companyName: "Apple Inc.",
  currentPrice: 182.52,
  change: 3.28,
  changePercent: 1.83,
  recommendation: "buy" as const,
  confidenceScore: 78,
  shortTermOutlook: "Apple is expected to show steady growth in the short term with the upcoming product launch cycle potentially acting as a catalyst.",
  longTermOutlook: "The company remains well-positioned for long-term success with its ecosystem strategy, services growth, and robust R&D investments in AI and AR technologies.",
  riskLevel: "low" as const,
  keyFactors: [
    "Strong services revenue growth",
    "Expanding margins in core business",
    "Upcoming iPhone refresh cycle",
    "Potential regulatory challenges",
    "Competition in wearables market"
  ]
};

// Mock financial data
const financialData = [
  { metric: "Market Cap", value: "$2.83T" },
  { metric: "P/E Ratio", value: "30.42" },
  { metric: "Revenue (TTM)", value: "$383.29B" },
  { metric: "EPS", value: "$6.14" },
  { metric: "Dividend Yield", value: "0.51%" },
  { metric: "52-Week High", value: "$196.18" },
  { metric: "52-Week Low", value: "$143.74" },
  { metric: "Average Volume", value: "57.12M" },
];

// Mock news data
const newsItems = [
  {
    title: "Apple Unveils New MacBook Pro with Enhanced AI Features",
    source: "TechCrunch",
    time: "1 day ago",
    summary: "Apple announced its latest MacBook Pro lineup featuring enhanced AI capabilities and improved performance with the new M3 chip architecture.",
    sentiment: "positive" as const,
    category: "Product Launch",
    relatedSymbols: ["AAPL"],
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Apple Services Growth Accelerates in Emerging Markets",
    source: "Wall Street Journal",
    time: "3 days ago",
    summary: "Apple's services segment shows strong growth momentum in emerging markets, particularly in India and Southeast Asia, offsetting slowing hardware sales.",
    sentiment: "positive" as const,
    category: "Business",
    relatedSymbols: ["AAPL"],
    imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
];

// Mock stock symbols for autocomplete
const stockSymbols = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
  { symbol: "V", name: "Visa Inc." },
  { symbol: "WMT", name: "Walmart Inc." },
];

// Search history
const searchHistory = [
  "AAPL", "TSLA", "MSFT", "AMZN", "NVDA"
];

const Analyzer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!searchQuery) {
      setError("Please enter a stock symbol");
      return;
    }
    
    setError("");
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast.success(`Analysis complete for ${searchQuery}`);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredStocks = stockSymbols.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setError("");
  };

  const selectStock = (symbol: string) => {
    setSearchQuery(symbol);
    setShowSuggestions(false);
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
                    onChange={(e) => {
                      setSearchQuery(e.target.value.toUpperCase());
                      setShowSuggestions(true);
                      setError("");
                    }}
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
                    {filteredStocks.length > 0 ? (
                      <>
                        {filteredStocks.map((stock) => (
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
                      <div className="p-2 text-muted-foreground">No matching stocks found</div>
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
        {showResults && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StockChart
                  symbol={mockStockData.symbol}
                  currentPrice={mockStockData.currentPrice}
                  change={mockStockData.change}
                  changePercent={mockStockData.changePercent}
                />
              </div>
              <div>
                <AIAnalysisCard
                  symbol={mockStockData.symbol}
                  companyName={mockStockData.companyName}
                  recommendation={mockStockData.recommendation}
                  confidenceScore={mockStockData.confidenceScore}
                  shortTermOutlook={mockStockData.shortTermOutlook}
                  longTermOutlook={mockStockData.longTermOutlook}
                  riskLevel={mockStockData.riskLevel}
                  keyFactors={mockStockData.keyFactors}
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
                      {financialData.map((item) => (
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
                      {newsItems.map((news, index) => (
                        <NewsCard
                          key={index}
                          title={news.title}
                          source={news.source}
                          time={news.time}
                          summary={news.summary}
                          sentiment={news.sentiment}
                          category={news.category}
                          relatedSymbols={news.relatedSymbols}
                          imageUrl={news.imageUrl}
                        />
                      ))}
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
