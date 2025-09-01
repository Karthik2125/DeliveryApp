import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import ShipmentTracker from "@/components/dashboard/ShipmentTracker";
import VehicleStatus from "@/components/dashboard/VehicleStatus";
import LiveMap from "@/components/dashboard/LiveMap";
import { Package, Truck, Clock, DollarSign } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Shipments"
            value="1,247"
            change="12.5% from last week"
            isPositive={true}
            icon={Package}
          />
          <StatsCard
            title="Fleet Vehicles"
            value="89"
            change="2 vehicles in maintenance"
            isPositive={false}
            icon={Truck}
          />
          <StatsCard
            title="On-Time Delivery"
            value="94.2%"
            change="3.1% improvement"
            isPositive={true}
            icon={Clock}
          />
          <StatsCard
            title="Revenue Today"
            value="$52,340"
            change="8.2% from yesterday"
            isPositive={true}
            icon={DollarSign}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ShipmentTracker />
          <VehicleStatus />
        </div>

        {/* Live Map Section */}
        <div className="grid grid-cols-1">
          <LiveMap />
        </div>
      </main>
    </div>
  );
};

export default Index;