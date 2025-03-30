
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Home, 
  LineChart, 
  ListChecks, 
  Menu, 
  Newspaper, 
  Search, 
  Settings, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const mainMenuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Stock Analyzer",
      url: "/analyzer",
      icon: Search,
    },
    {
      title: "Portfolio",
      url: "/portfolio",
      icon: LineChart,
    },
    {
      title: "Watchlists",
      url: "/watchlists",
      icon: ListChecks,
    },
  ];

  const additionalMenuItems = [
    {
      title: "Market News",
      url: "/news",
      icon: Newspaper,
    },
    {
      title: "Market Overview",
      url: "/market",
      icon: BarChart3,
    },
    {
      title: "Community",
      url: "/community",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  const checkActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar defaultExpanded={expanded} onExpandedChange={setExpanded} className="border-r">
      <SidebarHeader>
        <div className="flex items-center px-2 py-4">
          <div className={cn("transition-all flex items-center", expanded ? "justify-between w-full" : "justify-center")}>
            {expanded && (
              <div className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-accent" />
                <span className="font-bold text-lg text-foreground">StockIntel</span>
              </div>
            )}
            {!expanded && <BarChart3 className="h-6 w-6 text-accent" />}
            <SidebarTrigger>
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={checkActive(item.url)}>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {additionalMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={checkActive(item.url)}>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
