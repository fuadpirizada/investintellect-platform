
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { NewsCard } from "@/components/shared/NewsCard";
import { LatestNews } from "@/components/shared/LatestNews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock news data
  const newsItems = [
    {
      title: "Federal Reserve Announces Interest Rate Decision",
      source: "Financial Times",
      time: "2 hours ago",
      summary: "The Federal Reserve announced its latest interest rate decision, maintaining the current rate while signaling potential changes in the coming months based on inflation data.",
      sentiment: "neutral" as const,
      category: "Economy",
      relatedSymbols: ["SPY", "QQQ", "DIA"],
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Tech Stocks Rally on Strong Earnings Reports",
      source: "Bloomberg",
      time: "5 hours ago",
      summary: "Major technology companies reported better-than-expected quarterly earnings, driving a rally in tech stocks and pushing major indices to new highs.",
      sentiment: "positive" as const,
      category: "Stocks",
      relatedSymbols: ["AAPL", "MSFT", "GOOGL"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Oil Prices Drop Amid Supply Concerns",
      source: "Reuters",
      time: "1 day ago",
      summary: "Crude oil prices fell sharply following reports of increased production from major oil-producing countries, raising concerns about potential oversupply in the market.",
      sentiment: "negative" as const,
      category: "Commodities",
      relatedSymbols: ["USO", "XLE", "CVX"],
      imageUrl: "https://images.unsplash.com/photo-1486728297118-82a07bc48a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Retail Sales Data Shows Consumer Spending Trends",
      source: "CNBC",
      time: "2 days ago",
      summary: "The latest retail sales data indicates shifting consumer spending patterns, with notable increases in certain sectors while others show signs of slowing demand.",
      sentiment: "neutral" as const,
      category: "Economy",
      relatedSymbols: ["XRT", "WMT", "TGT"],
      imageUrl: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
  ];

  const categories = ["All", "Economy", "Stocks", "Commodities", "Crypto", "Bonds", "IPOs"];
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Market News</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for news..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer hover:bg-secondary"
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="latest">Latest News</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest" className="space-y-6">
            <LatestNews />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems.slice(0, 2).map((news, index) => (
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
          </TabsContent>
          
          <TabsContent value="stocks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsItems.slice(1, 3).map((news, index) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default News;
