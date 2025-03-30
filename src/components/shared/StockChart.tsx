
import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchHistoricalData } from "@/services/yahooFinanceService";

// Sample data to use as fallback
const dailyData = [
  { time: "9:30", price: 142.35, volume: 6500 },
  { time: "10:00", price: 142.64, volume: 5200 },
  { time: "10:30", price: 143.01, volume: 3100 },
  { time: "11:00", price: 142.80, volume: 2800 },
  { time: "11:30", price: 143.12, volume: 3900 },
  { time: "12:00", price: 143.27, volume: 2700 },
  { time: "12:30", price: 143.40, volume: 2300 },
  { time: "13:00", price: 143.22, volume: 2500 },
  { time: "13:30", price: 143.45, volume: 3600 },
  { time: "14:00", price: 143.67, volume: 4200 },
  { time: "14:30", price: 143.50, volume: 3900 },
  { time: "15:00", price: 143.78, volume: 5700 },
  { time: "15:30", price: 143.92, volume: 7100 },
  { time: "16:00", price: 144.25, volume: 8900 },
];

interface StockChartProps {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  chartData?: any[]; // Optional chart data from parent
}

interface TimeRange {
  value: string;
  label: string;
  interval: '1d' | '1wk' | '1mo';
  range: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '5y';
}

export function StockChart({ symbol, currentPrice, change, changePercent, chartData: initialChartData }: StockChartProps) {
  const isPriceUp = change >= 0;
  const chartColor = isPriceUp ? "#4CAF50" : "#F44336";
  const [isLoading, setIsLoading] = useState(false);
  const [currentTimeRange, setCurrentTimeRange] = useState<string>("1D");
  const [chartData, setChartData] = useState<any[]>(initialChartData || dailyData);
  
  // Define time ranges
  const timeRanges: TimeRange[] = [
    { value: "1D", label: "1D", interval: '1d', range: '1d' },
    { value: "1W", label: "1W", interval: '1d', range: '5d' },
    { value: "1M", label: "1M", interval: '1d', range: '1mo' },
    { value: "3M", label: "3M", interval: '1d', range: '3mo' },
    { value: "6M", label: "6M", interval: '1wk', range: '6mo' },
    { value: "1Y", label: "1Y", interval: '1wk', range: '1y' },
    { value: "5Y", label: "5Y", interval: '1mo', range: '5y' },
  ];
  
  // Fetch chart data when time range changes
  useEffect(() => {
    if (symbol === 'Portfolio' || !symbol) {
      return; // Skip API call for portfolio or if no symbol
    }
    
    const fetchChartData = async () => {
      setIsLoading(true);
      try {
        const timeRange = timeRanges.find(r => r.value === currentTimeRange);
        if (!timeRange) return;
        
        const data = await fetchHistoricalData(symbol, timeRange.interval, timeRange.range);
        
        // Format the data for the chart
        const formattedData = data.map((item: any) => {
          let timeLabel;
          
          // Format the time based on the time range
          if (timeRange.value === '1D' || timeRange.value === '1W') {
            timeLabel = new Date(item.time * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          } else if (timeRange.value === '1M' || timeRange.value === '3M') {
            timeLabel = new Date(item.time * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' });
          } else {
            timeLabel = new Date(item.time * 1000).toLocaleDateString([], { month: 'short', year: '2-digit' });
          }
          
          return {
            time: timeLabel,
            price: item.price,
            volume: item.volume,
          };
        });
        
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        // Use the initial chart data as fallback
        if (!chartData.length) {
          setChartData(dailyData);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChartData();
  }, [symbol, currentTimeRange]);
  
  // Handle time range change
  const handleTimeRangeChange = (value: string) => {
    setCurrentTimeRange(value);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <div>
            <CardTitle className="text-xl">{symbol} Stock Chart</CardTitle>
          </div>
          <div className="flex flex-col md:items-end">
            <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
            <span className={`font-medium ${isPriceUp ? "text-finance-green" : "text-finance-red"}`}>
              {change > 0 ? "+" : ""}{change.toFixed(2)} ({changePercent > 0 ? "+" : ""}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1D" onValueChange={handleTimeRangeChange}>
          <TabsList className="mb-4">
            {timeRanges.map((range) => (
              <TabsTrigger key={range.value} value={range.value}>
                {range.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="h-[330px] relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            )}
            
            <div className="flex flex-col h-full">
              <ResponsiveContainer width="100%" height="85%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D4263" opacity={0.2} />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fill: '#B0BEC5' }} 
                    tickLine={{ stroke: '#B0BEC5' }}
                    axisLine={{ stroke: '#3E5F8A', opacity: 0.3 }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fill: '#B0BEC5' }} 
                    tickLine={{ stroke: '#B0BEC5' }}
                    axisLine={{ stroke: '#3E5F8A', opacity: 0.3 }}
                    width={65}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(42, 53, 71, 0.95)', 
                      borderColor: '#3E5F8A', 
                      color: '#fff',
                      borderRadius: '4px'
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#B0BEC5' }}
                    formatter={(value) => {
                      return [`$${Number(value).toFixed(2)}`];
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={chartColor} 
                    strokeWidth={2} 
                    dot={false} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
              
              <ResponsiveContainer width="100%" height="15%">
                <BarChart data={chartData}>
                  <Bar dataKey="volume" fill="#3E5F8A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
