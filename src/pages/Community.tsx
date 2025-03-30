
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2, Bookmark, Filter, TrendingUp, Users, Plus, Search } from "lucide-react";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock discussion data
  const discussions = [
    {
      id: 1,
      title: "Thoughts on Tesla's latest earnings report?",
      content: "Tesla reported better than expected earnings this quarter. Revenue was up 25% YoY and they announced new factory expansions. What's everyone's take on their future growth potential?",
      author: {
        name: "InvestorPro",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=InvestorPro"
      },
      tags: ["$TSLA", "Earnings", "EV"],
      likes: 42,
      comments: 18,
      time: "3 hours ago"
    },
    {
      id: 2,
      title: "Best dividend stocks for passive income?",
      content: "Looking to build a portfolio of dividend stocks for consistent passive income. Currently considering REITs, utilities, and consumer staples. Any recommendations for high-yield but still safe options?",
      author: {
        name: "DividendSeeker",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=DividendSeeker"
      },
      tags: ["Dividends", "Passive Income", "REITs"],
      likes: 35,
      comments: 24,
      time: "1 day ago"
    },
    {
      id: 3,
      title: "AI stocks overvalued or just getting started?",
      content: "With the recent surge in AI stocks, I'm wondering if we're seeing a bubble or if this is just the beginning of a long-term trend. Companies like NVIDIA have seen incredible growth, but are valuations sustainable?",
      author: {
        name: "TechInvestor",
        avatar: "https://api.dicebear.com/7.x/personas/svg?seed=TechInvestor"
      },
      tags: ["AI", "$NVDA", "Tech Stocks"],
      likes: 67,
      comments: 41,
      time: "2 days ago"
    }
  ];
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discussions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="trending">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="following">
              <Users className="h-4 w-4 mr-2" />
              Following
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Start a Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="Discussion title"
                    />
                    <Textarea
                      placeholder="Share your thoughts, questions or insights..."
                      className="min-h-32"
                    />
                    <div className="flex justify-between">
                      <Input
                        placeholder="Add tags (comma separated)"
                        className="w-3/4"
                      />
                      <Button>Post</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>Be respectful to fellow investors</li>
                    <li>No financial advice or recommendations</li>
                    <li>Clearly mark opinions vs facts</li>
                    <li>No spam or self-promotion</li>
                    <li>Cite sources when sharing information</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-xs w-full">View Full Guidelines</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                        <AvatarFallback>{discussion.author.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-medium text-lg">{discussion.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{discussion.author.name}</span>
                            <span className="mx-2">•</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                        <p className="text-sm">{discussion.content}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {discussion.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {discussion.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="mr-1 h-4 w-4" />
                            Save
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="mr-1 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-6">
            <div className="space-y-4">
              {discussions.slice().reverse().map((discussion) => (
                <Card key={discussion.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                        <AvatarFallback>{discussion.author.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-medium text-lg">{discussion.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{discussion.author.name}</span>
                            <span className="mx-2">•</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                        <p className="text-sm">{discussion.content}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {discussion.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {discussion.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="mr-1 h-4 w-4" />
                            Save
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="mr-1 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="following" className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 font-medium text-lg">You're not following anyone yet</h3>
                <p className="text-muted-foreground mt-2">Follow other investors to see their posts in your feed</p>
                <Button className="mt-4">Discover Investors</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Community;
