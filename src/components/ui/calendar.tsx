'use client'

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  endOfWeek 
} from "date-fns"
import { enUS, fr, es, de, it } from 'date-fns/locale'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/utils/languageHandler"
import dashboardText from "@/locales/dashboardText"

interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
  specialDates?: Date[]
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
  specialDates = [] 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  const { language } = useLanguage();
  const t = dashboardText[language] || dashboardText.en;

  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
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
  }

  const isSpecialDate = (date: Date) => {
    return specialDates.some(specialDate => isSameDay(specialDate, date));
  }

  const formatMonth = (date: Date) => {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${t.months[monthIndex]} ${year}`;
  }

  // Dynamic font size calculation based on container dimensions
  const fontSize = Math.min(containerSize.width / 25, containerSize.height / 25);

  return (
    <div ref={containerRef} className={cn("w-full h-full flex flex-col", className)} style={{ fontSize: `${fontSize}px` }}>
      <div className="flex items-center justify-between mb-2 px-2">
        <Button 
          onClick={handlePreviousMonth} 
          variant="ghost" 
          size="icon" 
          className="h-auto w-auto p-1 hover:bg-transparent hover:text-gray-600"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="text-xl font-medium">
          {formatMonth(currentMonth)}
        </div>
        <Button 
          onClick={handleNextMonth} 
          variant="ghost" 
          size="icon" 
          className="h-auto w-auto p-1 hover:bg-transparent hover:text-gray-600"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-0 mb-0 px-0 -mx-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
          <div 
            key={index} 
            className="font-normal text-gray-400 flex items-center pl-3"
            style={{ fontSize: '1em' }}
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
          
          return (
            <Button
              key={day.toString()}
              onClick={() => handleDateSelect(day)}
              variant="ghost"
              className={cn(
                "p-0 flex items-center justify-center aspect-square",
                !isCurrentMonth && "text-gray-300",
                isSelected && "bg-[#ff73b4] text-white hover:bg-[#ff73b4] hover:text-white",
                isCurrentDay && !isSelected && "bg-gray-100",
                isSpecial && "text-red-500",
                "hover:text-inherit hover:bg-gray-100"
              )}
              style={{ fontSize: '1em' }}
            >
              {format(day, "d", { locale: localeMap[language] })}
            </Button>
          );
        })}
      </div>
    </div>
  );
}