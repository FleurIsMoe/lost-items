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

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
  specialDates?: Date[]
}

export function Calendar({ 
  mode = "single", 
  selected, 
  onSelect, 
  className,
  specialDates = [] 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(firstDayOfMonth)
  const calendarEnd = endOfWeek(lastDayOfMonth)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const handleDateSelect = (day: Date) => {
    if (onSelect) {
      onSelect(day)
    }
  }

  const isSpecialDate = (date: Date) => {
    return specialDates.some(specialDate => isSameDay(specialDate, date))
  }

  return (
    <div className={cn("w-full max-w-[280px] p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <Button 
          onClick={handlePreviousMonth} 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 hover:bg-transparent hover:text-gray-600"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="text-sm font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <Button 
          onClick={handleNextMonth} 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 hover:bg-transparent hover:text-gray-600"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div 
            key={day} 
            className="text-center text-xs font-normal text-gray-500 h-8 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
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
                "h-8 w-8 p-0 font-normal text-sm hover:bg-gray-100",
                !isCurrentMonth && "text-gray-300",
                isSelected && "bg-black text-white hover:bg-black hover:text-white",
                isCurrentDay && !isSelected && "bg-gray-200",
                isSpecial && "text-red-500",
                "hover:text-inherit"
              )}
            >
              {format(day, "d")}
            </Button>
          );
        })}
      </div>
    </div>
  )
}