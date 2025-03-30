
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StockCard } from "./StockCard";
import { RefreshCw } from "lucide-react";
import { fetchStockQuote } from "@/services/yahooFinanceService";
import { toast } from "sonner";

// Default trending symbols
const defaultTrendingSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "NFLX"];

// Interface for watchlist status
interface WatchlistStatus {
  [key: string]: boolean;
}

export function TrendingStocks() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<WatchlistStatus>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('financeai_watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);
  
  // Save watchlist to localStorage on change
  useEffect(() => {
    localStorage.setItem('financeai_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);
  
  const fetchStocks = async () => {
    setIsLoading(true);
    
    try {
      // Get 4 random symbols from the default list
      const randomSymbols = [...defaultTrendingSymbols]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      
      // Fetch data for each symbol
      const stocksData = await Promise.all(
        randomSymbols.map(async (symbol) => {
          try {
            return await fetchStockQuote(symbol);
          } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            return null;
          }
        })
      );
      
      // Filter out null values and set stocks
      setStocks(stocksData.filter(Boolean));
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching trending stocks:", error);
      toast.error("Failed to fetch trending stocks. Using cached data.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchStocks();
    
    // Refresh data every 15 minutes
    const intervalId = setInterval(fetchStocks, 15 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleRefresh = () => {
    fetchStocks();
  };
  
  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => ({
      ...prev,
      [symbol]: !prev[symbol]
    }));
    
    const message = watchlist[symbol] 
      ? `Removed ${symbol} from watchlist`
      : `Added ${symbol} to watchlist`;
      
    toast.success(message);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Trending Stocks</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-20 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.companyName}
                price={stock.currentPrice}
                change={stock.change}
                changePercent={stock.changePercent}
                inWatchlist={!!watchlist[stock.symbol]}
                onToggleWatchlist={() => toggleWatchlist(stock.symbol)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
