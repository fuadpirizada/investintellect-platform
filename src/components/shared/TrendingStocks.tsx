
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockCard } from "./StockCard";

// Mock data for trending stocks
const trendingStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 3.28, changePercent: 1.83, inWatchlist: true },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 403.78, change: 5.68, changePercent: 1.43, inWatchlist: false },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.75, change: -1.37, changePercent: -0.95, inWatchlist: true },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.22, change: 2.17, changePercent: 1.23, inWatchlist: false },
];

export function TrendingStocks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Stocks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {trendingStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.name}
              price={stock.price}
              change={stock.change}
              changePercent={stock.changePercent}
              inWatchlist={stock.inWatchlist}
              onToggleWatchlist={() => console.log(`Toggle watchlist for ${stock.symbol}`)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
