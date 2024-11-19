import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AnimatedNumber from "@/components/AnimatedNumber";

interface AnimatedStatsCardProps {
  title: string;
  value: number;
  color: string;
}

const AnimatedStatsCard: React.FC<AnimatedStatsCardProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatedNumber value={value} color={color} />
      </CardContent>
    </Card>
  );
};

export default AnimatedStatsCard;