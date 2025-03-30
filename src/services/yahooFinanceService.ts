
import { API_CONFIG, StockData, NewsItem, MarketIndexData } from './apiConfig';

export const fetchStockQuote = async (symbol: string): Promise<StockData> => {
  try {
    const response = await fetch(
      `${API_CONFIG.YAHOO_FINANCE.BASE_URL}${API_CONFIG.YAHOO_FINANCE.ENDPOINTS.QUOTE}?symbols=${symbol}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stock data: ${response.statusText}`);
    }
    
    const data = await response.json();
    const result = data.quoteResponse.result[0];
    
    if (!result) {
      throw new Error(`No data found for symbol: ${symbol}`);
    }
    
    return {
      symbol: result.symbol,
      companyName: result.longName || result.shortName,
      currentPrice: result.regularMarketPrice,
      change: result.regularMarketChange,
      changePercent: result.regularMarketChangePercent,
      marketCap: result.marketCap,
      volume: result.regularMarketVolume,
      avgVolume: result.averageDailyVolume3Month,
      high: result.regularMarketDayHigh,
      low: result.regularMarketDayLow,
      open: result.regularMarketOpen,
      previousClose: result.regularMarketPreviousClose,
      timestamp: result.regularMarketTime,
    };
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const fetchHistoricalData = async (
  symbol: string, 
  interval: '1d' | '1wk' | '1mo' = '1d',
  range: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '5y' = '1mo'
) => {
  try {
    const response = await fetch(
      `${API_CONFIG.YAHOO_FINANCE.BASE_URL}${API_CONFIG.YAHOO_FINANCE.ENDPOINTS.CHART}/${symbol}?interval=${interval}&range=${range}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.statusText}`);
    }
    
    const data = await response.json();
    const result = data.chart.result[0];
    
    if (!result) {
      throw new Error(`No historical data found for symbol: ${symbol}`);
    }
    
    const { timestamp, indicators } = result;
    const { quote } = indicators;
    
    return timestamp.map((time: number, index: number) => ({
      time,
      price: quote[0].close[index],
      volume: quote[0].volume[index],
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

export const searchStocks = async (query: string) => {
  try {
    const response = await fetch(
      `${API_CONFIG.YAHOO_FINANCE.BASE_URL}${API_CONFIG.YAHOO_FINANCE.ENDPOINTS.SEARCH}?q=${query}&quotesCount=10`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to search stocks: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.quotes.map((quote: any) => ({
      symbol: quote.symbol,
      name: quote.shortname || quote.longname,
      exchange: quote.exchange,
      type: quote.quoteType,
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

export const fetchMarketNews = async (symbols?: string[]): Promise<NewsItem[]> => {
  try {
    let url = `${API_CONFIG.YAHOO_FINANCE.BASE_URL}${API_CONFIG.YAHOO_FINANCE.ENDPOINTS.NEWS}`;
    
    if (symbols && symbols.length > 0) {
      url += `?symbols=${symbols.join(',')}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.items.map((item: any) => ({
      title: item.title,
      source: item.publisher,
      url: item.link,
      publishedTime: new Date(item.published_at * 1000).toLocaleString(),
      summary: item.summary,
      category: item.category,
      relatedSymbols: item.related_symbols?.map((s: any) => s.symbol) || [],
      imageUrl: item.main_image?.resolutions?.[0]?.url,
    }));
  } catch (error) {
    console.error('Error fetching market news:', error);
    throw error;
  }
};

export const fetchMarketIndices = async (): Promise<MarketIndexData[]> => {
  const indices = ['^GSPC', '^DJI', '^IXIC', '^RUT', '^FTSE', '^N225'];
  const indexNames: Record<string, string> = {
    '^GSPC': 'S&P 500',
    '^DJI': 'Dow Jones',
    '^IXIC': 'NASDAQ',
    '^RUT': 'Russell 2000',
    '^FTSE': 'FTSE 100',
    '^N225': 'Nikkei 225',
  };
  
  try {
    const response = await fetch(
      `${API_CONFIG.YAHOO_FINANCE.BASE_URL}${API_CONFIG.YAHOO_FINANCE.ENDPOINTS.QUOTE}?symbols=${indices.join(',')}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch market indices: ${response.statusText}`);
    }
    
    const data = await response.json();
    const results = data.quoteResponse.result;
    
    return results.map((result: any) => ({
      symbol: result.symbol,
      name: indexNames[result.symbol] || result.shortName,
      value: result.regularMarketPrice,
      change: result.regularMarketChange,
      changePercent: result.regularMarketChangePercent,
    }));
  } catch (error) {
    console.error('Error fetching market indices:', error);
    throw error;
  }
};
