import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Fuel, MapPin, Clock } from "lucide-react";

const mockVehicles = [
  {
    id: "V-001",
    driver: "John Smith",
    location: "Manhattan, NY",
    fuel: 85,
    status: "active",
    lastUpdate: "2 min ago"
  },
  {
    id: "V-002",
    driver: "Sarah Johnson", 
    location: "Brooklyn, NY",
    fuel: 45,
    status: "active",
    lastUpdate: "5 min ago"
  },
  {
    id: "V-003",
    driver: "Mike Wilson",
    location: "Depot - Maintenance",
    fuel: 92,
    status: "maintenance",
    lastUpdate: "1 hour ago"
  },
  {
    id: "V-004",
    driver: "Lisa Chen",
    location: "Queens, NY",
    fuel: 67,
    status: "idle",
    lastUpdate: "15 min ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-status-delivered text-status-delivered";
    case "idle":
      return "bg-status-pending text-status-pending";
    case "maintenance":
      return "bg-status-delayed text-status-delayed";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getFuelColor = (fuel: number) => {
  if (fuel > 70) return "bg-status-delivered";
  if (fuel > 30) return "bg-status-in-transit";
  return "bg-status-delayed";
};

const VehicleStatus = () => {
  return (
    <Card className="border-card-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          Vehicle Fleet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 custom-scrollbar max-h-96 overflow-y-auto">
        {mockVehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 rounded-lg bg-background-secondary border border-card-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{vehicle.id}</p>
                  <p className="text-sm text-muted-foreground">{vehicle.driver}</p>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className={`${getStatusColor(vehicle.status)}/10 border-transparent`}
              >
                {vehicle.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-card-foreground">{vehicle.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Fuel className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Fuel:</span>
                </div>
                <span className="text-card-foreground font-medium">{vehicle.fuel}%</span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`${getFuelColor(vehicle.fuel)} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${vehicle.fuel}%` }}
                />
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <Clock className="w-3 h-3" />
                <span>Last update: {vehicle.lastUpdate}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VehicleStatus;