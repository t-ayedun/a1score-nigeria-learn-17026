
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Star, Target } from "lucide-react";

const PitchMetrics = () => {
  const metrics = [
    {
      icon: Users,
      title: "Total Users",
      value: "25,000+",
      change: "+127% MoM",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "JAMB Pass Rate",
      value: "92%",
      change: "vs 61% national avg",
      color: "text-green-600"
    },
    {
      icon: DollarSign,
      title: "Monthly Revenue",
      value: "₦2.8M",
      change: "+89% MoM",
      color: "text-purple-600"
    },
    {
      icon: Star,
      title: "User Satisfaction",
      value: "4.8/5",
      change: "1,200+ reviews",
      color: "text-orange-600"
    },
    {
      icon: Target,
      title: "Market Opportunity",
      value: "₦45B+",
      change: "Nigerian EdTech",
      color: "text-red-600"
    }
  ];

  return (
    <div className="fixed top-16 sm:top-20 left-2 sm:left-4 z-40 w-[calc(100vw-1rem)] sm:w-72 max-w-sm">
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-base sm:text-lg text-gray-900">Pitch Metrics</CardTitle>
          <Badge className="w-fit bg-green-100 text-green-800 text-xs">Live Demo</Badge>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${metric.color} flex-shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs sm:text-sm truncate">{metric.title}</div>
                    <div className="text-xs text-gray-600 truncate">{metric.change}</div>
                  </div>
                </div>
                <div className="text-sm sm:text-lg font-bold text-gray-900 flex-shrink-0 ml-2">{metric.value}</div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default PitchMetrics;
