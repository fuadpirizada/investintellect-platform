
import { useState } from "react";
import { Bell, HelpCircle, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`);
    }
  };

  // Mock notifications
  const notifications = [
    {
      id: 1, 
      title: "Price Alert: AAPL", 
      message: "Apple Inc. is up 3.2% today", 
      time: "10 minutes ago",
      read: false
    },
    {
      id: 2, 
      title: "Earnings Report", 
      message: "Microsoft's Q2 earnings released", 
      time: "2 hours ago",
      read: false
    },
    {
      id: 3, 
      title: "Market Update", 
      message: "S&P 500 reached all-time high", 
      time: "Yesterday",
      read: true
    }
  ];

  // Mock help topics
  const helpTopics = [
    { title: "Getting Started", url: "#getting-started" },
    { title: "Using the Stock Analyzer", url: "#stock-analyzer" },
    { title: "Managing Portfolios", url: "#portfolios" },
    { title: "Creating Watchlists", url: "#watchlists" },
    { title: "Account Settings", url: "#settings" }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="ml-auto flex items-center space-x-4">
          <form onSubmit={handleSearch} className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search stocks..."
                className="w-80 appearance-none bg-secondary pl-8 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative hover:bg-accent">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-finance-red"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Notifications</h4>
                  <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
                </div>
              </div>
              <div className="max-h-[300px] overflow-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-b last:border-0 ${notification.read ? 'opacity-60' : ''}`}
                    >
                      <div className="flex gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${notification.id}`} />
                          <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{notification.title}</p>
                            {!notification.read && <Badge className="h-1.5 w-1.5 rounded-full p-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications yet
                  </div>
                )}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" size="sm" className="w-full">View All Notifications</Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="hover:bg-accent">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 p-0">
              <div className="p-4 border-b">
                <h4 className="font-medium">Help Center</h4>
              </div>
              <div className="p-2">
                <div className="space-y-1">
                  {helpTopics.map((topic, i) => (
                    <Button 
                      key={i}
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-left"
                      onClick={() => toast.info(`Navigating to ${topic.title} guide`)}
                    >
                      {topic.title}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t">
                <Button size="sm" className="w-full">Contact Support</Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full hover:bg-accent"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
