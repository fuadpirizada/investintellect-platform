
import { API_CONFIG, SectorPerformance } from "@/services/apiConfig";

// Use the provided Alpha Vantage API key
const API_KEY = "YML4I8D4J2ZZHSBF";

export async function fetchSectorPerformance(): Promise<SectorPerformance[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.ALPHA_VANTAGE.BASE_URL}/query?function=SECTOR&apikey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Alpha Vantage API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the sector performance data
    const sectors: SectorPerformance[] = [];
    
    if (data && data["Rank A: Real-Time Performance"]) {
      const sectorData = data["Rank A: Real-Time Performance"];
      
      for (const [name, performanceStr] of Object.entries(sectorData)) {
        if (name !== "Meta Data") {
          // Remove % sign and convert to number
          const performance = parseFloat(performanceStr.toString().replace("%", ""));
          sectors.push({ name, performance });
        }
      }
    }
    
    return sectors;
  } catch (error) {
    console.error("Error fetching sector performance:", error);
    // Return fallback data
    return [
      { name: "Technology", performance: 1.25 },
      { name: "Healthcare", performance: 0.87 },
      { name: "Finance", performance: -0.32 },
      { name: "Consumer Cyclical", performance: 0.54 },
      { name: "Energy", performance: -0.91 },
      { name: "Utilities", performance: 0.12 },
      { name: "Real Estate", performance: -0.45 },
    ];
  }
}

export async function fetchTechnicalIndicators(symbol: string) {
  try {
    // Example of fetching RSI data
    const rsiResponse = await fetch(
      `${API_CONFIG.ALPHA_VANTAGE.BASE_URL}/query?function=RSI&symbol=${symbol}&interval=daily&time_period=14&series_type=close&apikey=${API_KEY}`
    );
    
    if (!rsiResponse.ok) {
      throw new Error(`Alpha Vantage API returned ${rsiResponse.status}`);
    }
    
    const rsiData = await rsiResponse.json();
    
    // Process and return the data
    return rsiData;
  } catch (error) {
    console.error("Error fetching technical indicators:", error);
    return null;
  }
}
