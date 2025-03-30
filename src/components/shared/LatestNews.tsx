
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsCard } from "./NewsCard";

// Mock data for news
const newsItems = [
  {
    title: "Apple Exceeds Q3 Earnings Expectations with Strong Services Growth",
    source: "Bloomberg",
    time: "2 hours ago",
    summary: "Apple reported better-than-expected third-quarter earnings, driven by strong growth in its services segment and stable iPhone sales despite market headwinds.",
    sentiment: "positive" as const,
    category: "Earnings",
    relatedSymbols: ["AAPL"],
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Fed Signals Potential Rate Cut as Inflation Cools",
    source: "Reuters",
    time: "5 hours ago",
    summary: "Federal Reserve officials suggested they may cut interest rates in upcoming meetings as inflation shows signs of moderating, according to meeting minutes released today.",
    sentiment: "neutral" as const,
    category: "Economy",
    relatedSymbols: ["SPY", "QQQ"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Tesla Faces Production Challenges at Berlin Gigafactory",
    source: "CNBC",
    time: "8 hours ago",
    summary: "Tesla is experiencing production delays at its Berlin Gigafactory due to supply chain issues and regulatory hurdles, potentially impacting its European delivery targets.",
    sentiment: "negative" as const,
    category: "Manufacturing",
    relatedSymbols: ["TSLA"],
    imageUrl: "https://images.unsplash.com/photo-1620873437082-5be8a5a59e85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
];

export function LatestNews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </CardContent>
    </Card>
  );
}
