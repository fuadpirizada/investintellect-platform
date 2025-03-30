
export const API_CONFIG = {
  YAHOO_FINANCE: {
    BASE_URL: "https://query1.finance.yahoo.com",
    ENDPOINTS: {
      QUOTE: "/v7/finance/quote",
      CHART: "/v8/finance/chart",
      SEARCH: "/v1/finance/search",
      NEWS: "/v2/finance/news",
    },
  },
  ALPHA_VANTAGE: {
    BASE_URL: "https://www.alphavantage.co",
    API_KEY: "demo", // This should be replaced with a real API key in production
  },
};

// Define common interfaces for API responses
export interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  volume?: number;
  avgVolume?: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
  timestamp: number;
}

export interface NewsItem {
  title: string;
  source: string;
  url: string;
  publishedTime: string;
  summary: string;
  sentiment?: "positive" | "negative" | "neutral";
  category?: string;
  relatedSymbols?: string[];
  imageUrl?: string;
}

export interface MarketIndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface SectorPerformance {
  name: string;
  performance: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number | string;
  signal?: string;
}
