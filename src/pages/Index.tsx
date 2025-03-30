
import { PageLayout } from "@/components/layout/PageLayout";
import { MarketOverview } from "@/components/shared/MarketOverview";
import { TrendingStocks } from "@/components/shared/TrendingStocks";
import { LatestNews } from "@/components/shared/LatestNews";
import { StockChart } from "@/components/shared/StockChart";
import { AIAnalysisCard } from "@/components/shared/AIAnalysisCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, BarChart3, TrendingUp } from "lucide-react";

// Mock data for portfolio stats
const portfolioStats = [
  { name: "Portfolio Value", value: "$128,459.23", change: 1.23, changeType: "positive" },
  { name: "Daily Change", value: "$1,583.42", change: 1.23, changeType: "positive" },
  { name: "Assets", value: "12", change: 0, changeType: "neutral" },
  { name: "Watchlist", value: "23", change: 3, changeType: "positive" },
];

// Mock data for a featured stock
const featuredStock = {
  symbol: "NVDA",
  companyName: "NVIDIA Corporation",
  currentPrice: 896.48,
  change: 13.72,
  changePercent: 1.55,
  recommendation: "strongBuy" as const,
  confidenceScore: 87,
  shortTermOutlook: "NVIDIA is likely to continue its upward momentum in the short term, driven by strong demand for AI chips and expanding market share in data center GPUs.",
  longTermOutlook: "The company is well-positioned for long-term growth with its leadership in AI acceleration, gaming, and visualization technologies. Continued innovation in AI and expansion into new markets present significant upside potential.",
  riskLevel: "medium" as const,
  keyFactors: [
    "Strong AI chip demand driving revenue growth",
    "Expanded partnerships with major cloud providers",
    "Recent product announcements well-received by market",
    "Valuation remains high relative to historical ranges",
    "Potential semiconductor industry cyclicality"
  ]
};

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioStats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    {stat.changeType !== "neutral" && (
                      <span
                        className={`flex items-center text-xs font-medium ${
                          stat.changeType === "positive"
                            ? "text-finance-green"
                            : "text-finance-red"
                        }`}
                      >
                        {stat.changeType === "positive" ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {stat.change > 0 ? "+" : ""}
                        {stat.change}%
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StockChart 
              symbol={featuredStock.symbol}
              currentPrice={featuredStock.currentPrice}
              change={featuredStock.change}
              changePercent={featuredStock.changePercent}
            />
          </div>
          <div>
            <AIAnalysisCard
              symbol={featuredStock.symbol}
              companyName={featuredStock.companyName}
              recommendation={featuredStock.recommendation}
              confidenceScore={featuredStock.confidenceScore}
              shortTermOutlook={featuredStock.shortTermOutlook}
              longTermOutlook={featuredStock.longTermOutlook}
              riskLevel={featuredStock.riskLevel}
              keyFactors={featuredStock.keyFactors}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <LatestNews />
          </div>
          <div>
            <MarketOverview />
          </div>
        </div>
        
        <TrendingStocks />
      </div>
    </PageLayout>
  );
};

export default Dashboard;
