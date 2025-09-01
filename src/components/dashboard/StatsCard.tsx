import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  className?: string;
}

const StatsCard = ({ title, value, change, isPositive, icon: Icon, className }: StatsCardProps) => {
  return (
    <Card className={cn("border-card-border bg-card", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
            <p className={cn(
              "text-xs font-medium",
              isPositive ? "text-status-delivered" : "text-status-delayed"
            )}>
              {isPositive ? "↗" : "↘"} {change}
            </p>
          </div>
          <div className="w-12 h-12 bg-background-secondary rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;