
import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data
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

const weeklyData = [
  { time: "Mon", price: 141.76, volume: 45200 },
  { time: "Tue", price: 142.35, volume: 42300 },
  { time: "Wed", price: 143.08, volume: 38600 },
  { time: "Thu", price: 142.98, volume: 40100 },
  { time: "Fri", price: 144.25, volume: 51700 },
];

const monthlyData = [
  { time: "Jan", price: 131.25, volume: 834500 },
  { time: "Feb", price: 137.42, volume: 762300 },
  { time: "Mar", price: 135.18, volume: 798600 },
  { time: "Apr", price: 140.35, volume: 845700 },
  { time: "May", price: 142.75, volume: 812300 },
  { time: "Jun", price: 144.25, volume: 901400 },
];

interface StockChartProps {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export function StockChart({ symbol, currentPrice, change, changePercent }: StockChartProps) {
  const isPriceUp = change >= 0;
  const chartColor = isPriceUp ? "#4CAF50" : "#F44336";
  
  const timeRanges = [
    { value: "1D", label: "1D", data: dailyData },
    { value: "1W", label: "1W", data: weeklyData },
    { value: "1M", label: "1M", data: monthlyData },
    { value: "3M", label: "3M", data: monthlyData },
    { value: "1Y", label: "1Y", data: monthlyData },
    { value: "5Y", label: "5Y", data: monthlyData },
  ];

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
        <Tabs defaultValue="1D">
          <TabsList className="mb-4">
            {timeRanges.map((range) => (
              <TabsTrigger key={range.value} value={range.value}>
                {range.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {timeRanges.map((range) => (
            <TabsContent key={range.value} value={range.value} className="h-[330px]">
              <div className="flex flex-col h-full">
                <ResponsiveContainer width="100%" height="85%">
                  <LineChart
                    data={range.data}
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
                  <BarChart data={range.data}>
                    <Bar dataKey="volume" fill="#3E5F8A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
