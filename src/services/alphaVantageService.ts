
import { API_CONFIG, TechnicalIndicator, SectorPerformance } from './apiConfig';

export const fetchTechnicalIndicators = async (
  symbol: string,
  indicator: 'RSI' | 'MACD' | 'SMA' | 'EMA' = 'RSI'
): Promise<TechnicalIndicator[]> => {
  try {
    let functionName = '';
    let timePeriod = '14';
    
    switch (indicator) {
      case 'RSI':
        functionName = 'RSI';
        break;
      case 'MACD':
        functionName = 'MACD';
        break;
      case 'SMA':
        functionName = 'SMA';
        break;
      case 'EMA':
        functionName = 'EMA';
        break;
    }
    
    const response = await fetch(
      `${API_CONFIG.ALPHA_VANTAGE.BASE_URL}/query?function=${functionName}&symbol=${symbol}&interval=daily&time_period=${timePeriod}&series_type=close&apikey=${API_CONFIG.ALPHA_VANTAGE.API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch technical indicators: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle different API responses based on indicator
    if (indicator === 'RSI') {
      const technicalData = data['Technical Analysis: RSI'];
      const dates = Object.keys(technicalData || {}).slice(0, 5);
      
      return dates.map((date) => {
        const value = parseFloat(technicalData[date].RSI);
        let signal = 'neutral';
        
        if (value >= 70) signal = 'overbought';
        else if (value <= 30) signal = 'oversold';
        
        return {
          name: 'RSI',
          value,
          signal,
          date,
        };
      });
    }
    
    // Example for MACD
    if (indicator === 'MACD') {
      const technicalData = data['Technical Analysis: MACD'];
      const dates = Object.keys(technicalData || {}).slice(0, 5);
      
      return dates.map((date) => {
        const macd = parseFloat(technicalData[date].MACD);
        const signal = parseFloat(technicalData[date].MACD_Signal);
        const histogram = parseFloat(technicalData[date].MACD_Hist);
        
        return {
          name: 'MACD',
          value: macd,
          signal: macd > signal ? 'bullish' : 'bearish',
          date,
          histogram,
          signalLine: signal,
        };
      });
    }
    
    // Fallback for other indicators
    return [{ name: indicator, value: 'Data not available' }];
  } catch (error) {
    console.error('Error fetching technical indicators:', error);
    throw error;
  }
};

export const fetchSectorPerformance = async (): Promise<SectorPerformance[]> => {
  try {
    const response = await fetch(
      `${API_CONFIG.ALPHA_VANTAGE.BASE_URL}/query?function=SECTOR&apikey=${API_CONFIG.ALPHA_VANTAGE.API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sector performance: ${response.statusText}`);
    }
    
    const data = await response.json();
    const sectorData = data['Rank A: Real-Time Performance'];
    
    if (!sectorData) {
      throw new Error('No sector data available');
    }
    
    return Object.entries(sectorData).map(([name, performance]) => ({
      name,
      performance: parseFloat(performance as string),
    }));
  } catch (error) {
    console.error('Error fetching sector performance:', error);
    throw error;
  }
};

export const fetchEarningsCalendar = async () => {
  try {
    const response = await fetch(
      `${API_CONFIG.ALPHA_VANTAGE.BASE_URL}/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=${API_CONFIG.ALPHA_VANTAGE.API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch earnings calendar: ${response.statusText}`);
    }
    
    const csvData = await response.text();
    
    // Simple CSV parsing
    const rows = csvData.split('\n').slice(1); // Skip header
    return rows.map(row => {
      const [symbol, name, reportDate, fiscalDateEnding, estimate, currency] = row.split(',');
      return {
        symbol,
        name,
        reportDate,
        fiscalDateEnding,
        estimate: estimate ? parseFloat(estimate) : null,
        currency,
      };
    });
  } catch (error) {
    console.error('Error fetching earnings calendar:', error);
    throw error;
  }
};
