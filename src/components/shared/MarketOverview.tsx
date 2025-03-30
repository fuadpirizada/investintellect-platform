
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDown, ArrowUp, Clock } from "lucide-react";

export function MarketOverview() {
  const markets = [
    { name: "S&P 500", value: 4,892.17, change: 0.87, status: "bull" },
    { name: "NASDAQ", value: 15,628.04, change: 1.12, status: "bull" },
    { name: "DOW 30", value: 38,671.32, change: 0.32, status: "bull" },
    { name: "RUSSELL 2000", value: 1,978.31, change: -0.42, status: "bear" },
  ];

  const sectorPerformance = [
    { name: "Technology", value: 2.1 },
    { name: "Healthcare", value: 0.8 },
    { name: "Financials", value: 0.3 },
    { name: "Energy", value: -1.2 },
    { name: "Consumer", value: -0.5 },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Market Overview</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>Real-time</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {markets.map((market) => (
              <div key={market.name} className="space-y-1">
                <div className="text-sm font-medium">{market.name}</div>
                <div className="text-xl font-bold">{market.value.toLocaleString()}</div>
                <div className={`flex items-center text-sm ${
                  market.status === "bull" ? "text-finance-green" : "text-finance-red"
                }`}>
                  {market.status === "bull" ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  <span>{market.change > 0 ? "+" : ""}{market.change}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-3">Sector Performance</h4>
            <div className="space-y-3">
              {sectorPerformance.map((sector) => (
                <div key={sector.name} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">{sector.name}</span>
                    <span className={`text-sm font-medium ${
                      sector.value >= 0 ? "text-finance-green" : "text-finance-red"
                    }`}>
                      {sector.value > 0 ? "+" : ""}{sector.value}%
                    </span>
                  </div>
                  <Progress 
                    value={50 + (sector.value * 5)} 
                    max={100}
                    className={`h-2 ${
                      sector.value >= 0 ? "bg-finance-dark-blue" : "bg-finance-dark-blue"
                    }`}
                    indicatorClassName={`${
                      sector.value >= 0 ? "bg-finance-green" : "bg-finance-red"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
