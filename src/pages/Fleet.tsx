import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Search, Plus, MapPin, Fuel, Clock, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const mockVehicles = [
  {
    id: "V-001",
    model: "Freightliner Cascadia",
    driver: "John Smith",
    location: "Manhattan, NY",
    fuel: 85,
    status: "active",
    lastUpdate: "2 min ago",
    mileage: "125,432 miles",
    nextMaintenance: "in 2,568 miles",
    capacity: "40 tons"
  },
  {
    id: "V-002",
    model: "Volvo VNL 860",
    driver: "Sarah Johnson", 
    location: "Brooklyn, NY",
    fuel: 45,
    status: "active",
    lastUpdate: "5 min ago",
    mileage: "98,765 miles",
    nextMaintenance: "in 1,235 miles",
    capacity: "35 tons"
  },
  {
    id: "V-003",
    model: "Peterbilt 579",
    driver: "Mike Wilson",
    location: "Depot - Maintenance",
    fuel: 92,
    status: "maintenance",
    lastUpdate: "1 hour ago",
    mileage: "156,890 miles",
    nextMaintenance: "in progress",
    capacity: "42 tons"
  },
  {
    id: "V-004",
    model: "Kenworth T680",
    driver: "Lisa Chen",
    location: "Queens, NY",
    fuel: 67,
    status: "idle",
    lastUpdate: "15 min ago",
    mileage: "87,543 miles",
    nextMaintenance: "in 4,457 miles",
    capacity: "38 tons"
  },
  {
    id: "V-005",
    model: "Mack Anthem",
    driver: "David Rodriguez",
    location: "Long Island, NY",
    fuel: 23,
    status: "active",
    lastUpdate: "1 min ago",
    mileage: "203,876 miles",
    nextMaintenance: "overdue by 234 miles",
    capacity: "45 tons"
  },
  {
    id: "V-006",
    model: "International LT",
    driver: "Emma Thompson",
    location: "Bronx, NY",
    fuel: 78,
    status: "idle",
    lastUpdate: "8 min ago",
    mileage: "67,432 miles",
    nextMaintenance: "in 7,568 miles",
    capacity: "36 tons"
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

const getFuelStatus = (fuel: number) => {
  if (fuel > 70) return "Good";
  if (fuel > 30) return "Medium";
  return "Low";
};

const Fleet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");
  const { toast } = useToast();

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    const matchesFuel = fuelFilter === "all" || 
                       (fuelFilter === "low" && vehicle.fuel <= 30) ||
                       (fuelFilter === "medium" && vehicle.fuel > 30 && vehicle.fuel <= 70) ||
                       (fuelFilter === "high" && vehicle.fuel > 70);
    
    return matchesSearch && matchesStatus && matchesFuel;
  });

  const handleAddVehicle = () => {
    toast({
      title: "Add Vehicle",
      description: "Vehicle registration feature coming soon!",
    });
  };

  const handleMaintenance = (vehicleId: string) => {
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance for ${vehicleId} has been scheduled.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Fleet Management</h1>
            <p className="text-muted-foreground">Monitor and manage your vehicle fleet</p>
          </div>
          <Button onClick={handleAddVehicle} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Vehicle
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-card-border bg-card">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-status-delivered">{mockVehicles.filter(v => v.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-card-border bg-card">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-status-pending">{mockVehicles.filter(v => v.status === 'idle').length}</p>
                <p className="text-sm text-muted-foreground">Idle</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-card-border bg-card">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-status-delayed">{mockVehicles.filter(v => v.status === 'maintenance').length}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-card-border bg-card">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-status-delayed">{mockVehicles.filter(v => v.fuel <= 30).length}</p>
                <p className="text-sm text-muted-foreground">Low Fuel</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-card-border bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={fuelFilter} onValueChange={setFuelFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Fuel Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High (70%+)</SelectItem>
                  <SelectItem value="medium">Medium (30-70%)</SelectItem>
                  <SelectItem value="low">Low (0-30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="border-card-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    {vehicle.id}
                  </CardTitle>
                  <Badge variant="secondary" className={`${getStatusColor(vehicle.status)}/10 border-transparent`}>
                    {vehicle.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{vehicle.model}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-card-foreground font-medium">{vehicle.driver}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-card-foreground">{vehicle.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Fuel className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Fuel:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-card-foreground font-medium">{vehicle.fuel}%</span>
                      <Badge variant="secondary" className={`${getFuelColor(vehicle.fuel)}/10 text-xs`}>
                        {getFuelStatus(vehicle.fuel)}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`${getFuelColor(vehicle.fuel)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${vehicle.fuel}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Mileage:</span>
                    <span className="text-card-foreground">{vehicle.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span className="text-card-foreground">{vehicle.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Maintenance:</span>
                    <span className={vehicle.nextMaintenance.includes('overdue') ? 'text-status-delayed' : 'text-card-foreground'}>
                      {vehicle.nextMaintenance}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-card-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{vehicle.lastUpdate}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleMaintenance(vehicle.id)}
                    className="h-6 text-xs"
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    Maintain
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <Card className="border-card-border bg-card">
            <CardContent className="p-12 text-center">
              <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No vehicles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Fleet;