
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  time: string;
  summary: string;
  sentiment?: "positive" | "negative" | "neutral";
  category?: string;
  relatedSymbols?: string[];
  imageUrl?: string;
}

export function NewsCard({
  title,
  source,
  time,
  summary,
  sentiment = "neutral",
  category,
  relatedSymbols = [],
  imageUrl,
}: NewsCardProps) {
  const sentimentColor = 
    sentiment === "positive" 
      ? "bg-finance-light-green/10 text-finance-green" 
      : sentiment === "negative"
      ? "bg-finance-light-red/10 text-finance-red"
      : "bg-finance-light-gray/10 text-finance-gray";

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex-1">
        {imageUrl && (
          <div className="w-full h-32 relative">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base">{title}</CardTitle>
            {sentiment && (
              <Badge variant="outline" className={sentimentColor}>
                {sentiment}
              </Badge>
            )}
          </div>
          <CardDescription className="flex items-center mt-1">
            <span className="font-medium">{source}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {time}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {summary}
          </p>
        </CardContent>
      </div>
      <CardFooter className="flex flex-wrap gap-2 pt-2 pb-4">
        {category && (
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        )}
        {relatedSymbols.map(symbol => (
          <Badge key={symbol} variant="outline" className="text-xs">
            {symbol}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
