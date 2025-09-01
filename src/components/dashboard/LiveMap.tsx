import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Truck } from "lucide-react";
import { useEffect, useState } from "react";

const mockLocations = [
  { id: 1, name: "Vehicle V-001", lat: 40.7128, lng: -74.0060, type: "vehicle", status: "active" },
  { id: 2, name: "Vehicle V-002", lat: 40.6892, lng: -74.0445, type: "vehicle", status: "active" },
  { id: 3, name: "Warehouse NYC", lat: 40.7589, lng: -73.9851, type: "warehouse", status: "active" },
  { id: 4, name: "Distribution Center", lat: 40.6781, lng: -73.9442, type: "depot", status: "active" },
];

const LiveMap = () => {
  const [activeVehicles] = useState(mockLocations.filter(loc => loc.type === "vehicle"));

  return (
    <Card className="border-card-border bg-card col-span-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Real-Time Tracking Map
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-status-delivered/10 text-status-delivered border-status-delivered/20">
              {activeVehicles.length} Active Vehicles
            </Badge>
            <Badge variant="secondary" className="bg-logistics-orange/10 text-logistics-orange border-logistics-orange/20 animate-pulse-slow">
              Live Updates
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-96 bg-background-secondary rounded-lg mx-6 mb-6 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-logistics-blue/10 to-logistics-blue-light/5" />
          
          {/* Grid Lines for Map Effect */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full border-t border-muted" style={{ top: `${i * 10}%` }} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full border-l border-muted" style={{ left: `${i * 10}%` }} />
            ))}
          </div>

          {/* Mock Map Locations */}
          <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2 bg-card border border-card-border rounded-full px-3 py-1 shadow-sm">
              <div className="w-2 h-2 bg-status-delivered rounded-full animate-tracking" />
              <span className="text-sm font-medium">V-001</span>
            </div>
          </div>

          <div className="absolute top-20 right-16">
            <div className="flex items-center gap-2 bg-card border border-card-border rounded-full px-3 py-1 shadow-sm">
              <div className="w-2 h-2 bg-status-delivered rounded-full animate-tracking" />
              <span className="text-sm font-medium">V-002</span>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/3">
            <div className="flex items-center gap-2 bg-card border border-card-border rounded-lg px-3 py-2 shadow-sm">
              <div className="w-3 h-3 bg-logistics-orange rounded-full" />
              <span className="text-sm font-medium">NYC Warehouse</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="flex items-center gap-2 bg-card border border-card-border rounded-lg px-3 py-2 shadow-sm">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-sm font-medium">Distribution Center</span>
            </div>
          </div>

          {/* Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--logistics-blue))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--logistics-orange))" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 50 50 Q 200 100 350 80"
              stroke="url(#routeGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
            <path
              d="M 300 300 Q 150 200 100 320"
              stroke="url(#routeGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-8 h-8 bg-card border border-card-border rounded flex items-center justify-center hover:bg-secondary transition-colors">
              <span className="text-sm font-bold">+</span>
            </button>
            <button className="w-8 h-8 bg-card border border-card-border rounded flex items-center justify-center hover:bg-secondary transition-colors">
              <span className="text-sm font-bold">−</span>
            </button>
            <button className="w-8 h-8 bg-card border border-card-border rounded flex items-center justify-center hover:bg-secondary transition-colors">
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-card border border-card-border rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-status-delivered rounded-full" />
              <span>Active Vehicle</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-logistics-orange rounded-full" />
              <span>Warehouse</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Depot</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMap;