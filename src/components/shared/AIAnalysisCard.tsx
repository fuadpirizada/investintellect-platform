
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";

type Recommendation = "buy" | "sell" | "hold" | "strongBuy" | "strongSell";

interface AIAnalysisCardProps {
  symbol: string;
  companyName: string;
  recommendation: Recommendation;
  confidenceScore: number;
  shortTermOutlook: string;
  longTermOutlook: string;
  riskLevel: "low" | "medium" | "high";
  keyFactors: string[];
}

export function AIAnalysisCard({
  symbol,
  companyName,
  recommendation,
  confidenceScore,
  shortTermOutlook,
  longTermOutlook,
  riskLevel,
  keyFactors,
}: AIAnalysisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<"up" | "down" | null>(null);
  
  const getRecommendationStyle = (rec: Recommendation) => {
    switch (rec) {
      case "strongBuy":
        return "bg-finance-green text-white";
      case "buy":
        return "bg-finance-light-green text-finance-dark-blue";
      case "hold":
        return "bg-finance-yellow text-finance-dark-blue";
      case "sell":
        return "bg-finance-light-red text-white";
      case "strongSell":
        return "bg-finance-red text-white";
    }
  };
  
  const getRecommendationText = (rec: Recommendation) => {
    switch (rec) {
      case "strongBuy":
        return "Strong Buy";
      case "buy":
        return "Buy";
      case "hold":
        return "Hold";
      case "sell":
        return "Sell";
      case "strongSell":
        return "Strong Sell";
    }
  };
  
  const getRiskStyle = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low":
        return "bg-finance-light-green/20 text-finance-green";
      case "medium":
        return "bg-finance-orange/20 text-finance-orange";
      case "high":
        return "bg-finance-light-red/20 text-finance-red";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-secondary/50 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-finance-yellow" />
              AI Analysis
            </CardTitle>
            <CardDescription>For {symbol} ({companyName})</CardDescription>
          </div>
          <Badge className={getRecommendationStyle(recommendation)}>
            {getRecommendationText(recommendation)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Confidence Score</p>
              <div className="h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${confidenceScore}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 font-medium">{confidenceScore}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Risk Level</p>
              <Badge variant="outline" className={`mt-1 ${getRiskStyle(riskLevel)}`}>
                {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Short-term Outlook</h4>
            <p className="text-sm text-muted-foreground">{shortTermOutlook}</p>
          </div>
          
          {isExpanded && (
            <>
              <div>
                <h4 className="text-sm font-medium mb-2">Long-term Outlook</h4>
                <p className="text-sm text-muted-foreground">{longTermOutlook}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Key Factors</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {keyFactors.map((factor, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          
          <div className="flex justify-between items-center pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm"
            >
              {isExpanded ? "Show Less" : "Show More"}
              <ArrowRight className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground mr-1">Helpful?</span>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${feedbackGiven === "up" ? "text-finance-green bg-finance-green/10" : ""}`}
                onClick={() => setFeedbackGiven("up")}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${feedbackGiven === "down" ? "text-finance-red bg-finance-red/10" : ""}`}
                onClick={() => setFeedbackGiven("down")}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
