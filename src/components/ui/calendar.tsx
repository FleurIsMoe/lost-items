"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { enUS, fr, es, de, it } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/languageHandler";
import dashboardText from "@/locales/dashboardText";
import colors from "@/app/theme/colors";

interface CalendarProps {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
  specialDates?: Date[];
  theme?: "white" | "dark";
  itemCounts?: { [date: string]: number };
}

const localeMap = {
  en: enUS,
  fr: fr,
  es: es,
  de: de,
  it: it,
};

export function Calendar({
  selected,
  onSelect,
  className,
  specialDates = [],
  theme = "white",
  itemCounts = {},
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState({
    width: 0,
    height: 0,
  });
  const { language } = useLanguage();
  const t = dashboardText[language] || dashboardText.en;

  const themeColors = colors[theme];

  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(firstDayOfMonth);
  const calendarEnd = endOfWeek(lastDayOfMonth);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateSelect = (day: Date) => {
    if (onSelect) {
      onSelect(day);
    }
  };

  const isSpecialDate = (date: Date) => {
    return specialDates.some((specialDate) => isSameDay(specialDate, date));
  };

  const formatMonth = (date: Date) => {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${t.months[monthIndex]} ${year}`;
  };

  const fontSize = Math.min(
    containerSize.width / 25,
    containerSize.height / 25
  );
  const monthFontSize = fontSize * 1.3;
  const badgeFontSize = fontSize * 0.9;
  const badgeSize = fontSize * 1.4;

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full flex flex-col", className)}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="flex items-center justify-between mb-2 px-2">
        <Button
          onClick={handlePreviousMonth}
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-1 hover:bg-primary/10"
          style={{
            color: themeColors.calendarButtonIconColor,
          }}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div
          className="text-xl font-medium"
          style={{
            fontSize: `${monthFontSize}px`,
            color: themeColors.calendarMonthText,
          }}
        >
          {formatMonth(currentMonth)}
        </div>
        <Button
          onClick={handleNextMonth}
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-1 hover:bg-primary/10"
          style={{
            color: themeColors.calendarButtonIconColor,
          }}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-0 mb-0 px-0 -mx-1">
        {["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"].map((day, index) => (
          <div
            key={index}
            className="font-normal flex items-center pl-3"
            style={{
              fontSize: "1em",
              color: themeColors.calendarDayNameText,
            }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0 flex-grow px-0 -mx-1">
        {days.map((day) => {
          const isSelected = selected && isSameDay(day, selected);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);
          const isSpecial = isSpecialDate(day);
          const dateKey = format(day, "yyyy-MM-dd");
          const itemCount = itemCounts[dateKey] || 0;

          const scaleFactor = 1 + containerSize.width / 2000;
          const badgeScaleFactor = isSelected ? (1 + containerSize.width / 4000) : 1;

          const dayStyle: React.CSSProperties = {
            transform: isSelected ? `scale(${scaleFactor})` : "scale(1)",
            zIndex: isSelected ? 10 : "auto",
            color: themeColors.text,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          };

          if (!isCurrentMonth) {
            dayStyle.color = themeColors.calendarNotCurrentMonthText;
          }

          if (isSelected) {
            dayStyle.backgroundColor = themeColors.calendarSelectedDayBackground;
            dayStyle.color = themeColors.calendarSelectedDayText;
          } else if (isCurrentDay) {
            dayStyle.backgroundColor = themeColors.calendarTodayBackground;
            dayStyle.color = themeColors.calendarTodayText;
          }

          if (isSpecial) {
            dayStyle.color = themeColors.calendarSpecialDateText;
          }

          return (
            <div
              key={day.toString()}
              className="relative aspect-square p-0.5"
              data-calendar-day
              data-date={format(day, "yyyy-MM-dd")}
            >
              <Button
                onClick={() => handleDateSelect(day)}
                variant="ghost"
                className={cn(
                  "h-10 w-10 p-0 rounded-md",
                  "hover:bg-transparent"
                )}
                style={{
                  ...dayStyle,
                }}
              >
                {format(day, "d", { locale: localeMap[language] })}
                {itemCount > 0 && (
                  <div
                    className="absolute flex items-center justify-center rounded-full bg-blue-500 text-white"
                    style={{
                      fontSize: `${badgeFontSize}px`,
                      minWidth: `${badgeSize}px`,
                      height: `${badgeSize}px`,
                      padding: `0 ${fontSize * 0.3}px`,
                      transform: `translate(30%, -30%) scale(${badgeScaleFactor})`,
                      transformOrigin: "center",
                      top: 0,
                      right: 0,
                    }}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </div>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
