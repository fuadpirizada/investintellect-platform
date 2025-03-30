
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StockCard } from "@/components/shared/StockCard";
import { StockChart } from "@/components/shared/StockChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Percent, DollarSign, BarChart3, PieChart } from "lucide-react";

const Portfolio = () => {
  const [viewMode, setViewMode] = useState<"value" | "performance">("value");
  
  // Mock portfolio data
  const portfolioStocks = [
    { symbol: "AAPL", name: "Apple Inc.", shares: 12, avgPrice: 165.23, currentPrice: 182.52, change: 3.28, changePercent: 1.83 },
    { symbol: "MSFT", name: "Microsoft Corp.", shares: 8, avgPrice: 310.45, currentPrice: 348.32, change: -2.12, changePercent: -0.61 },
    { symbol: "GOOGL", name: "Alphabet Inc.", shares: 5, avgPrice: 125.32, currentPrice: 138.54, change: 1.25, changePercent: 0.91 },
    { symbol: "AMZN", name: "Amazon.com Inc.", shares: 10, avgPrice: 135.65, currentPrice: 143.28, change: 0.95, changePercent: 0.67 },
  ];
  
  const calculatePortfolioValue = () => {
    return portfolioStocks.reduce((total, stock) => total + (stock.currentPrice * stock.shares), 0);
  };
  
  const calculateTotalGainLoss = () => {
    return portfolioStocks.reduce((total, stock) => {
      const costBasis = stock.avgPrice * stock.shares;
      const currentValue = stock.currentPrice * stock.shares;
      return total + (currentValue - costBasis);
    }, 0);
  };
  
  const totalValue = calculatePortfolioValue();
  const totalGainLoss = calculateTotalGainLoss();
  const gainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Position
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                ${totalGainLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${gainLossPercent >= 0 ? 'text-finance-green' : 'text-finance-red'}`}>
                {gainLossPercent.toFixed(2)}%
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <Button 
            variant={viewMode === "value" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("value")}
          >
            <DollarSign className="mr-1 h-4 w-4" />
            Value
          </Button>
          <Button 
            variant={viewMode === "performance" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("performance")}
          >
            <Percent className="mr-1 h-4 w-4" />
            Performance
          </Button>
          <div className="flex-1"></div>
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-1 h-4 w-4" />
            Historical
          </Button>
          <Button variant="outline" size="sm">
            <PieChart className="mr-1 h-4 w-4" />
            Allocation
          </Button>
        </div>
        
        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="holdings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StockChart
                  symbol="Portfolio"
                  currentPrice={totalValue}
                  change={totalGainLoss}
                  changePercent={gainLossPercent}
                />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioStocks.map(stock => {
                        const stockValue = stock.currentPrice * stock.shares;
                        const percentage = (stockValue / totalValue) * 100;
                        
                        return (
                          <div key={stock.symbol} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{stock.symbol}</span>
                              <span>{percentage.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="space-y-4">
              {portfolioStocks.map(stock => (
                <StockCard
                  key={stock.symbol}
                  symbol={stock.symbol}
                  name={stock.name}
                  price={stock.currentPrice}
                  change={stock.change}
                  changePercent={stock.changePercent}
                  extraInfo={`${stock.shares} shares | Avg: $${stock.avgPrice.toFixed(2)}`}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <StockChart
              symbol="Portfolio Performance"
              currentPrice={totalValue}
              change={totalGainLoss}
              changePercent={gainLossPercent}
            />
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Transaction history will appear here</p>
                  <Button className="mt-4">Record Transaction</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Portfolio;
