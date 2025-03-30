
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Shield, CreditCard, Settings as SettingsIcon, Smartphone, Moon, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Moon className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="api">
              <SettingsIcon className="h-4 w-4 mr-2" />
              API
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=InvestorUser" />
                    <AvatarFallback>IU</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Upload a profile picture</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Change</Button>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" value="InvestorUser" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value="investor_user" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value="user@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america_new_york">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america_new_york">America/New York</SelectItem>
                        <SelectItem value="america_chicago">America/Chicago</SelectItem>
                        <SelectItem value="america_los_angeles">America/Los Angeles</SelectItem>
                        <SelectItem value="europe_london">Europe/London</SelectItem>
                        <SelectItem value="asia_tokyo">Asia/Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="price-alerts" className="flex-1">Price Alerts</Label>
                      <Switch id="price-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="earnings-reports" className="flex-1">Earnings Reports</Label>
                      <Switch id="earnings-reports" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="news-updates" className="flex-1">News Updates</Label>
                      <Switch id="news-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="portfolio-updates" className="flex-1">Portfolio Updates</Label>
                      <Switch id="portfolio-updates" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mobile-price-alerts" className="flex-1">Price Alerts</Label>
                      <Switch id="mobile-price-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mobile-earnings-reports" className="flex-1">Earnings Reports</Label>
                      <Switch id="mobile-earnings-reports" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mobile-news-updates" className="flex-1">News Updates</Label>
                      <Switch id="mobile-news-updates" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mobile-portfolio-updates" className="flex-1">Portfolio Updates</Label>
                      <Switch id="mobile-portfolio-updates" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="theme-color">Theme Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["blue", "green", "purple", "orange", "red"].map((color) => (
                      <div 
                        key={color} 
                        className={`h-10 rounded-md cursor-pointer border-2 ${color === "blue" ? "border-primary" : "border-transparent"}`}
                        style={{ backgroundColor: `var(--${color})` }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="chart-style">Chart Style</Label>
                  <Select defaultValue="candlestick">
                    <SelectTrigger id="chart-style">
                      <SelectValue placeholder="Select chart style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candlestick">Candlestick</SelectItem>
                      <SelectItem value="line">Line</SelectItem>
                      <SelectItem value="bar">Bar</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Connected Devices</Label>
                      <p className="text-sm text-muted-foreground">Manage devices that have access to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>Manage your subscription plan and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Free Plan</h3>
                        <p className="text-sm text-muted-foreground">Basic access to stock analysis tools</p>
                      </div>
                      <Badge variant="outline">Current Plan</Badge>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 mt-6">
                    <div className="p-4 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Pro Plan</h3>
                          <p className="text-sm text-muted-foreground">Advanced analysis tools and real-time data</p>
                          <p className="font-medium mt-1">$19.99/month</p>
                        </div>
                        <Button>Upgrade</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Enterprise Plan</h3>
                          <p className="text-sm text-muted-foreground">Full access to all features and priority support</p>
                          <p className="font-medium mt-1">$49.99/month</p>
                        </div>
                        <Button>Upgrade</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage your API keys and access tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">API Keys</h3>
                  <div className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Read-Only API Key</h4>
                        <p className="text-sm text-muted-foreground">Created on May 15, 2023</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm" className="text-destructive">Revoke</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate New API Key
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Webhook URLs</h3>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Notification Webhook</Label>
                    <Input id="webhook-url" placeholder="https://your-service.com/webhook" />
                  </div>
                  <Button>Save Webhook</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Settings;
