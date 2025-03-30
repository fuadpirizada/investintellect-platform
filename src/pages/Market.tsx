
import { PageLayout } from "@/components/layout/PageLayout";
import { MarketOverview } from "@/components/shared/MarketOverview";
import { TrendingStocks } from "@/components/shared/TrendingStocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Market = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="indices">Indices</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <MarketOverview />
            <TrendingStocks />
          </TabsContent>
          
          <TabsContent value="indices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MarketOverview />
            </div>
          </TabsContent>
          
          <TabsContent value="sectors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MarketOverview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Market;
