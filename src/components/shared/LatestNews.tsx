
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsCard } from "./NewsCard";
import { fetchMarketNews } from "@/services/yahooFinanceService";
import { NewsItem } from "@/services/apiConfig";
import { RefreshCw } from "lucide-react";

export function LatestNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const news = await fetchMarketNews();
      setNewsItems(news.slice(0, 3)); // Show top 3 news items
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching news:", error);
      // Fallback to sample data if API fails
      setNewsItems([
        {
          title: "Markets react to Federal Reserve policy announcement",
          source: "Financial Times",
          url: "#",
          publishedTime: "2 hours ago",
          summary: "Stock markets fluctuated as investors digested the latest Federal Reserve policy announcement on interest rates and economic projections.",
          sentiment: "neutral",
          category: "Economy",
          relatedSymbols: ["SPY", "QQQ"],
          imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchNews();
    
    // Refresh news every 30 minutes
    const intervalId = setInterval(fetchNews, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleRefresh = () => {
    fetchNews();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Latest Market News</CardTitle>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-40 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {newsItems.map((news, index) => (
              <NewsCard
                key={index}
                title={news.title}
                source={news.source}
                time={news.publishedTime}
                summary={news.summary}
                sentiment={news.sentiment || "neutral"}
                category={news.category || "Market News"}
                relatedSymbols={news.relatedSymbols || []}
                imageUrl={news.imageUrl || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
