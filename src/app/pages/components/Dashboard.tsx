import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { subDays, addDays, isSameDay, format, startOfDay } from "date-fns";
import colors from "@/app/theme/colors";
import AnimatedStatsCard from "@/components/AnimatedStatsCard";
import { LostItem, FilterState } from "@/lib/localization/types";
import localeMap from "@/lib/localization/localeMap";
import { Calendar } from "@/components/ui/calendar";

interface DashboardProps {
  t: any;
  items: LostItem[];
  date: Date;
  isLoading: boolean;
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  trendDateRange: { start: Date; end: Date };
  setTrendDateRange: (range: { start: Date; end: Date }) => void;
  language: string;
  onDateChange: (date: Date) => void;
}

export default function Dashboard({
  t,
  items,
  date,
  isLoading,
  filter,
  setFilter,
  trendDateRange,
  setTrendDateRange,
  language,
  onDateChange,
}: DashboardProps) {
  const stats = React.useMemo(
    () => ({
      total: items.length,
      today: items.filter((item) => isSameDay(item.date, new Date())).length,
      pending: items.filter((item) => !item.found).length,
      found: items.filter((item) => item.found).length,
    }),
    [items]
  );

  const pieData = [
    { name: t.pending, value: stats.pending, color: colors.white.warning },
    { name: t.found, value: stats.found, color: colors.white.success },
  ];

  const getColorByName = (name: string) => {
    const item = pieData.find((data) => data.name === name);
    return item ? item.color : colors.white.text;
  };

  const barData = pieData.map((item) => ({
    name: item.name,
    value: item.value,
  }));

  const getDailyData = () => {
    const dailyData = [];
    let currentDate = startOfDay(trendDateRange.start);
    while (currentDate <= trendDateRange.end) {
      const dayItems = items.filter((item) =>
        isSameDay(item.date, currentDate)
      );
      dailyData.push({
        date: format(currentDate, "MM/dd", {
          locale: localeMap[language],
        }).replace(/^\w/, (c) => c.toUpperCase()),
        pending: dayItems.filter((item) => !item.found).length,
        found: dayItems.filter((item) => item.found).length,
      });
      currentDate = addDays(currentDate, 1);
    }
    return dailyData;
  };

  const adjustTrendRange = (direction: "backward" | "forward") => {
    const newRange = {
      start:
        direction === "backward"
          ? subDays(trendDateRange.start, 1)
          : addDays(trendDateRange.start, 1),
      end:
        direction === "backward"
          ? subDays(trendDateRange.end, 1)
          : addDays(trendDateRange.end, 1),
    };
    setTrendDateRange(newRange);
  };

  return (
    <Card className="mb-12 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <AnimatedStatsCard
          title={t.stats.total}
          value={stats.total}
          color={colors.white.primary}
        />
        <AnimatedStatsCard
          title={t.stats.today}
          value={stats.today}
          color={colors.white.secondary}
        />
        <AnimatedStatsCard
          title={t.stats.pending}
          value={stats.pending}
          color={colors.white.warning}
        />
        <AnimatedStatsCard
          title={t.stats.found}
          value={stats.found}
          color={colors.white.success}
        />
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Card className="md:col-span-1 aspect-square h-[400px] p-4">
          <CardContent className="p-0 h-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && onDateChange(newDate)}
              itemCounts={React.useMemo(() => {
                const counts: { [date: string]: number } = {};
                items.forEach((item) => {
                  const dateKey = format(item.date, "yyyy-MM-dd");
                  counts[dateKey] = (counts[dateKey] || 0) + 1;
                });
                return counts;
              }, [items])}
              className="rounded-md border-0 w-full h-full"
            />
          </CardContent>
        </Card>

        <div className="flex flex-col md:col-span-1 gap-5">
          <Card className="h-[190px] w-[190px] relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFilter("all")}
              className="absolute top-2 right-2 z-10 h-6 w-6"
            >
              <span className="sr-only">{t.showAllItems}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </Button>
            <CardContent className="p-0 absolute inset-0 flex items-center justify-center">
              <div className="h-[150px] w-[150px]">
                {isLoading ? (
                  <Skeleton className="h-full w-full rounded-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="80%"
                        paddingAngle={5}
                        dataKey="value"
                        onClick={(data) => {
                          setFilter(data.name.toLowerCase() as FilterState);
                        }}
                        animationBegin={0}
                        animationDuration={500}
                        animationEasing="ease-out"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            opacity={
                              filter === "all" ||
                              filter === entry.name.toLowerCase()
                                ? 1
                                : 0.3
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="h-[190px] w-[190px]">
            <CardHeader className="flex flex-row items-center justify-end p-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFilter("all")}
                className="h-6 w-6"
              >
                <span className="sr-only">{t.showAllItems}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[140px] w-full px-6">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minWidth={100}
                  >
                    <BarChart
                      data={barData}
                      margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
                    >
                      <XAxis dataKey="name" tick={false} height={20} />
                      <YAxis tick={false} width={25} />
                      <Tooltip />
                      <Bar dataKey="value" barSize={15}>
                        {barData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={getColorByName(entry.name)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-[400px] flex-grow relative">
          <div className="absolute top-8 right-14 flex items-center space-x-2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustTrendRange("backward")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => adjustTrendRange("forward")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="p-0 h-full">
            <div className="w-full h-full pt-10 pr-14 pb-6 pl-0">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Skeleton className="w-4/5 h-4/5" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getDailyData()}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <defs>
                      <linearGradient
                        id="colorPending"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colors.white.warning}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.white.warning}
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorFound"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colors.white.success}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.white.success}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="pending"
                      stackId="1"
                      stroke={colors.white.warning}
                      fillOpacity={1}
                      fill="url(#colorPending)"
                      animationDuration={1000}
                    />
                    <Area
                      type="monotone"
                      dataKey="found"
                      stackId="1"
                      stroke={colors.white.success}
                      fillOpacity={1}
                      fill="url(#colorFound)"
                      animationDuration={1000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
}
