
// Fix the defaultExpanded prop issue by using content prop instead
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import {
  BarChart3,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Compass,
  Home,
  LineChart,
  Newspaper,
  Settings,
  SparkleIcon,
  Bell,
  Heart,
  Users,
  Layers3
} from "lucide-react";

// Define sidebar navigation items
const sidebarItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Market", icon: BarChart3, path: "/market" },
  { name: "Analyzer", icon: SparkleIcon, path: "/analyzer" },
  { name: "News", icon: Newspaper, path: "/news" },
  { name: "Portfolio", icon: Briefcase, path: "/portfolio" },
  { name: "Watchlists", icon: Layers3, path: "/watchlists" },
  { name: "Community", icon: Users, path: "/community" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar(); // Use the correct properties from context
  const [isHovered, setIsHovered] = useState(false);
  const [sectionExpanded, setSectionExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentRoute = (path: string) => {
    return location.pathname === path;
  };

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className={`app-sidebar fixed left-0 top-0 z-30 flex h-full flex-col border-r bg-background transition-all duration-300 ${
        open ? "w-60" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => setOpen(!open)}
        >
          <ChevronRight
            className={`h-5 w-5 transition-all duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
        <h2
          className={`ml-2 text-lg font-semibold transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          FinanceAI
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 py-4">
          <nav className="space-y-1.5">
            {sidebarItems.map((item) => (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isCurrentRoute(item.path) ? "default" : "ghost"}
                    className={`group w-full justify-start ${
                      isCurrentRoute(item.path) ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span
                      className={`transition-opacity duration-200 ${
                        open ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className={open ? "hidden" : ""}>
                  {item.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>

          <Separator className="my-4" />

          <Collapsible
            open={sectionExpanded}
            onOpenChange={setSectionExpanded}
            className="space-y-1.5"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Compass className="mr-3 h-5 w-5" />
                <span
                  className={`flex-1 transition-opacity duration-200 ${
                    open ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Discover
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    sectionExpanded ? "rotate-180" : ""
                  } ${open ? "opacity-100" : "opacity-0"}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1.5">
              {open && (
                <>
                  <Button
                    variant="ghost"
                    className="ml-8 w-[calc(100%-2rem)] justify-start"
                  >
                    <LineChart className="mr-3 h-5 w-5" />
                    <span>Top Gainers</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="ml-8 w-[calc(100%-2rem)] justify-start"
                  >
                    <Bell className="mr-3 h-5 w-5" />
                    <span>Earnings</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="ml-8 w-[calc(100%-2rem)] justify-start"
                  >
                    <Heart className="mr-3 h-5 w-5" />
                    <span>Most Popular</span>
                  </Button>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  );
}
