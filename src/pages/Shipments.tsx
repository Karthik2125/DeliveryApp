import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Search, Filter, Plus, MapPin, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const mockShipments = [
  {
    id: "SH-2024-001",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    status: "in-transit",
    priority: "high",
    weight: "2.5 tons",
    driver: "John Smith",
    eta: "2 hours",
    progress: 75,
    customer: "TechCorp Inc."
  },
  {
    id: "SH-2024-002",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    status: "delivered",
    priority: "medium",
    weight: "1.8 tons",
    driver: "Sarah Johnson",
    eta: "Delivered",
    progress: 100,
    customer: "RetailMax LLC"
  },
  {
    id: "SH-2024-003",
    origin: "Seattle, WA",
    destination: "Denver, CO",
    status: "delayed",
    priority: "high",
    weight: "3.2 tons",
    driver: "Mike Wilson",
    eta: "4 hours late",
    progress: 45,
    customer: "Manufacturing Co."
  },
  {
    id: "SH-2024-004",
    origin: "Boston, MA",
    destination: "Atlanta, GA",
    status: "pending",
    priority: "low",
    weight: "1.2 tons",
    driver: "Lisa Chen",
    eta: "Not started",
    progress: 0,
    customer: "Small Business Inc."
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "delivered":
      return { color: "bg-status-delivered", textColor: "text-status-delivered" };
    case "in-transit":
      return { color: "bg-status-in-transit", textColor: "text-status-in-transit" };
    case "delayed":
      return { color: "bg-status-delayed", textColor: "text-status-delayed" };
    case "pending":
      return { color: "bg-status-pending", textColor: "text-status-pending" };
    default:
      return { color: "bg-muted", textColor: "text-muted-foreground" };
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-status-delayed text-status-delayed";
    case "medium":
      return "bg-status-in-transit text-status-in-transit";
    case "low":
      return "bg-status-pending text-status-pending";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Shipments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { toast } = useToast();

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || shipment.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateShipment = () => {
    toast({
      title: "Create Shipment",
      description: "New shipment creation feature coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Shipments</h1>
            <p className="text-muted-foreground">Manage and track all shipments</p>
          </div>
          <Button onClick={handleCreateShipment} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Shipment
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-card-border bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search shipments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Shipments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShipments.map((shipment) => {
            const statusConfig = getStatusConfig(shipment.status);
            
            return (
              <Card key={shipment.id} className="border-card-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{shipment.id}</CardTitle>
                    <Badge variant="secondary" className={`${getPriorityColor(shipment.priority)}/10 border-transparent`}>
                      {shipment.priority.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">From:</span>
                      <span className="text-card-foreground font-medium">{shipment.origin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">To:</span>
                      <span className="text-card-foreground font-medium">{shipment.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="text-card-foreground font-medium">{shipment.customer}</span>
                    </div>
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
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-card-border">
                    <Badge variant="secondary" className={`${statusConfig.color}/10 ${statusConfig.textColor} border-transparent`}>
                      {shipment.status.replace("-", " ").toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{shipment.eta}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredShipments.length === 0 && (
          <Card className="border-card-border bg-card">
            <CardContent className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No shipments found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Shipments;