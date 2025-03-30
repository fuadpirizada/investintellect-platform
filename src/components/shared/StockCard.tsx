
// Add extraInfo prop to fix the type error
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  inWatchlist?: boolean;
  onToggleWatchlist?: () => void;
  extraInfo?: string; // Adding extraInfo prop
}

export function StockCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  inWatchlist = false,
  onToggleWatchlist,
  extraInfo,
}: StockCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex flex-col">
          <CardTitle className="text-sm font-medium">
            {symbol}
            <Badge
              variant="outline"
              className="ml-2 text-xs font-normal"
            >
              {name.length > 15 ? `${name.slice(0, 15)}...` : name}
            </Badge>
          </CardTitle>
        </div>
        <button
          onClick={onToggleWatchlist}
          className="text-muted-foreground hover:text-yellow-400 transition-colors"
          aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          <Star className={cn("h-4 w-4", inWatchlist && "fill-yellow-400 text-yellow-400")} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">${price.toFixed(2)}</div>
          <div className={isPositive ? "text-finance-green" : "text-finance-red"}>
            <div className="flex items-center text-sm">
              {isPositive ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              <span>{change > 0 ? "+" : ""}{change.toFixed(2)}</span>
              <span className="ml-1">({changePercent > 0 ? "+" : ""}{changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
        {extraInfo && <div className="text-sm text-muted-foreground mt-2">{extraInfo}</div>}
      </CardContent>
    </Card>
  );
}
