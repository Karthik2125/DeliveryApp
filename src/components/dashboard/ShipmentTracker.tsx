import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, Package, CheckCircle } from "lucide-react";

const mockShipments = [
  {
    id: "SH-2024-001",
    destination: "New York, NY",
    status: "in-transit",
    progress: 75,
    eta: "2 hours",
    driver: "John Smith"
  },
  {
    id: "SH-2024-002", 
    destination: "Los Angeles, CA",
    status: "delivered",
    progress: 100,
    eta: "Delivered",
    driver: "Sarah Johnson"
  },
  {
    id: "SH-2024-003",
    destination: "Chicago, IL", 
    status: "delayed",
    progress: 45,
    eta: "4 hours late",
    driver: "Mike Wilson"
  },
  {
    id: "SH-2024-004",
    destination: "Miami, FL",
    status: "pending",
    progress: 0,
    eta: "Not started",
    driver: "Lisa Chen"
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { color: "bg-status-delivered", textColor: "text-status-delivered", icon: CheckCircle };
    case "in-transit":
      return { color: "bg-status-in-transit", textColor: "text-status-in-transit", icon: Truck };
    case "delayed":
      return { color: "bg-status-delayed", textColor: "text-status-delayed", icon: MapPin };
    case "pending":
      return { color: "bg-status-pending", textColor: "text-status-pending", icon: Package };
    default:
      return { color: "bg-muted", textColor: "text-muted-foreground", icon: Package };
  }
};

const ShipmentTracker = () => {
  return (
    <Card className="border-card-border bg-card col-span-2">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          Active Shipments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 custom-scrollbar max-h-96 overflow-y-auto">
        {mockShipments.map((shipment) => {
          const statusConfig = getStatusConfig(shipment.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={shipment.id} className="p-4 rounded-lg bg-background-secondary border border-card-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${statusConfig.color}/10 flex items-center justify-center`}>
                    <StatusIcon className={`w-5 h-5 ${statusConfig.textColor}`} />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{shipment.id}</p>
                    <p className="text-sm text-muted-foreground">{shipment.destination}</p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${statusConfig.color}/10 ${statusConfig.textColor} border-transparent`}
                >
                  {shipment.status.replace("-", " ").toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-card-foreground font-medium">{shipment.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`${statusConfig.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Driver: {shipment.driver}</span>
                  <span className={`font-medium ${statusConfig.textColor}`}>ETA: {shipment.eta}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ShipmentTracker;