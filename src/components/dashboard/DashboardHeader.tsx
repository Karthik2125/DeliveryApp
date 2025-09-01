import { Bell, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const DashboardHeader = () => {
  return (
    <header className="bg-card border-b border-card-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-logistics rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LT</span>
            </div>
            <h1 className="text-xl font-bold text-card-foreground">LogiTrack Pro</h1>
          </div>
          <Badge variant="secondary" className="bg-status-in-transit/10 text-status-in-transit border-status-in-transit/20">
            Live Tracking Active
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search shipments, vehicles..." 
              className="pl-10 w-80 bg-background-secondary border-card-border"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-logistics-orange text-white text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;