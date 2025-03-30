
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StockCard } from "@/components/shared/StockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, List, Edit, Trash } from "lucide-react";

const Watchlists = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock watchlist data
  const watchlists = [
    {
      name: "Tech Stocks",
      stocks: [
        { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 3.28, changePercent: 1.83 },
        { symbol: "MSFT", name: "Microsoft Corp.", price: 348.32, change: -2.12, changePercent: -0.61 },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: 138.54, change: 1.25, changePercent: 0.91 },
      ]
    },
    {
      name: "Energy Sector",
      stocks: [
        { symbol: "XOM", name: "Exxon Mobil Corp.", price: 113.78, change: 0.54, changePercent: 0.48 },
        { symbol: "CVX", name: "Chevron Corp.", price: 158.23, change: -1.34, changePercent: -0.84 },
      ]
    },
    {
      name: "Potential Buys",
      stocks: [
        { symbol: "TSLA", name: "Tesla Inc.", price: 245.12, change: 5.32, changePercent: 2.22 },
        { symbol: "AMZN", name: "Amazon.com Inc.", price: 143.28, change: 0.95, changePercent: 0.67 },
        { symbol: "NFLX", name: "Netflix Inc.", price: 582.64, change: -3.27, changePercent: -0.56 },
      ]
    }
  ];
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Watchlists</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Watchlist
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search stocks in watchlists..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="tech-stocks" className="w-full">
          <TabsList className="mb-4 flex overflow-auto pb-1 scrollbar-hide">
            {watchlists.map((watchlist, index) => (
              <TabsTrigger 
                key={index} 
                value={watchlist.name.toLowerCase().replace(/\s+/g, '-')}
              >
                {watchlist.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {watchlists.map((watchlist, index) => (
            <TabsContent 
              key={index} 
              value={watchlist.name.toLowerCase().replace(/\s+/g, '-')}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <List className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{watchlist.name}</span>
                  <span className="text-muted-foreground text-sm">({watchlist.stocks.length} stocks)</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-finance-red hover:text-finance-red">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Stocks</p>
                      <p className="font-medium">{watchlist.stocks.length}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Gainers</p>
                      <p className="font-medium text-finance-green">
                        {watchlist.stocks.filter(s => s.changePercent > 0).length}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Losers</p>
                      <p className="font-medium text-finance-red">
                        {watchlist.stocks.filter(s => s.changePercent < 0).length}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Avg. Change</p>
                      <p className="font-medium">
                        {(watchlist.stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / watchlist.stocks.length).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {watchlist.stocks.map(stock => (
                  <StockCard
                    key={stock.symbol}
                    symbol={stock.symbol}
                    name={stock.name}
                    price={stock.price}
                    change={stock.change}
                    changePercent={stock.changePercent}
                  />
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stock to Watchlist
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Watchlists;
