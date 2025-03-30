
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { fetchMarketIndices } from "@/services/yahooFinanceService";
import { fetchSectorPerformance } from "@/services/alphaVantageService";
import { MarketIndexData, SectorPerformance } from "@/services/apiConfig";

export function MarketOverview() {
  const [indices, setIndices] = useState<MarketIndexData[]>([]);
  const [sectors, setSectors] = useState<SectorPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const indicesData = await fetchMarketIndices();
      setIndices(indicesData);
      
      try {
        const sectorsData = await fetchSectorPerformance();
        setSectors(sectorsData);
      } catch (err) {
        console.error("Error fetching sector data:", err);
        // Use fallback data for sectors
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching market data:", err);
      // Use fallback data for indices
      setIndices([
        { symbol: "^GSPC", name: "S&P 500", value: 4,983.45, change: 12.16, changePercent: 0.24 },
        { symbol: "^DJI", name: "Dow Jones", value: 38,797.35, change: -32.27, changePercent: -0.08 },
        { symbol: "^IXIC", name: "NASDAQ", value: 15,973.17, change: 123.58, changePercent: 0.78 },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const handleRefresh = () => {
    fetchData();
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Market Overview</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <button 
            onClick={handleRefresh} 
            className="rounded-full p-1 hover:bg-muted transition-colors"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {indices.slice(0, 3).map((index) => (
              <div key={index.symbol} className="bg-muted/40 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{index.name}</h3>
                    <p className="text-2xl font-bold mt-1">{index.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className={`flex items-center ${index.changePercent >= 0 ? "text-finance-green" : "text-finance-red"}`}>
                    {index.changePercent >= 0 ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    <span>
                      {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Key Sectors</h3>
            <div className="space-y-2">
              {sectors.slice(0, 5).map((sector) => (
                <div key={sector.name} className="flex justify-between items-center">
                  <span>{sector.name}</span>
                  <span className={sector.performance >= 0 ? "text-finance-green" : "text-finance-red"}>
                    {sector.performance >= 0 ? "+" : ""}
                    {sector.performance.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
