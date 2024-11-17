'use client'

import * as React from "react"
import { format, subDays, addDays, isSameDay, startOfDay, isAfter, parseISO } from "date-fns"
import { Bell, CalendarIcon, FolderOpen, Globe, MapPin, Plus, Search, Check, Menu, ChevronLeft, ChevronRight, X, Trash2 } from 'lucide-react'
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useLocationAndLanguage } from "@/app/hooks/useLocationAndLanguage"
import languages, { LanguageData } from '@/app/languages'

type LostItem = {
  id: string
  date: Date
  title: string
  description: string
  location: string
  found: boolean
  addedBy: string
  userLocation?: string
  userIp?: string
}

type FilterState = 'all' | 'found' | 'pending'

type Notification = {
  id: string
  itemId: string
  title: string
  date: Date
  status: 'pending' | 'found' | 'deleted'
  addedBy: string
  details?: string
  userLocation?: string
  userIp?: string
}

type SearchResult = {
  item: LostItem
  matches: ('title' | 'description' | 'location')[]
}

type Language = keyof typeof languages

const theme = {
  primary: "#0078D4",
  secondary: "#50E6FF",
  warning: "#FFA500",
  error: "#D13438",
  success: "#107C10",
  background: "#F3F2F1",
  text: "#323130",
  border: "#E1DFDD",
  highlight: "#FFFF00",
}

export default function Component() {
  const { isLoading: isLocationLoading, location, currentDate, languageKey, greeting, handleLanguageChange } = useLocationAndLanguage()
  const [date, setDate] = React.useState<Date>(new Date())
  const [items, setItems] = React.useState<LostItem[]>([])
  const [lastNotificationClick, setLastNotificationClick] = React.useState<Date>(new Date())
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [filter, setFilter] = React.useState<FilterState>('all')
  const [trendDateRange, setTrendDateRange] = React.useState({ start: subDays(new Date(), 3), end: addDays(new Date(), 3) })
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([])
  const [highlightedItemId, setHighlightedItemId] = React.useState<string | null>(null)
  const t: LanguageData = languages[languageKey]

  React.useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem('notifications')
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }

    // Load last notification click time from localStorage
    const storedLastClick = localStorage.getItem('lastNotificationClick')
    if (storedLastClick) {
      setLastNotificationClick(new Date(storedLastClick))
    }

    // Load items from localStorage
    const storedItems = localStorage.getItem('items')
    if (storedItems) {
      setItems(JSON.parse(storedItems, (key, value) => 
        key === 'date' ? parseISO(value) : value
      ))
    }
  }, [])

  React.useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  React.useEffect(() => {
    // Save last notification click time to localStorage
    localStorage.setItem('lastNotificationClick', lastNotificationClick.toISOString())
  }, [lastNotificationClick])

  React.useEffect(() => {
    // Save items to localStorage whenever they change
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<LostItem, 'id' | 'date' | 'found' | 'addedBy' | 'userLocation' | 'userIp'>) => {
    const newItem = {
      id: Math.random().toString(36).slice(2),
      date: date,
      found: false,
      addedBy: t.currentUser, // Replace with actual user info when available
      userLocation: location || t.locationUnavailable,
      userIp: '127.0.0.1', // Replace with actual IP when available
      ...item,
    }
    setItems(prevItems => [...prevItems, newItem])
    
    // Add a new notification
    const newNotification: Notification = {
      id: Math.random().toString(36).slice(2),
      itemId: newItem.id,
      title: newItem.title,
      date: newItem.date,
      status: 'pending',
      addedBy: newItem.addedBy,
      userLocation: newItem.userLocation,
      userIp: newItem.userIp,
    }
    setNotifications(prevNotifications => [...prevNotifications, newNotification])
  }

  const deleteItem = (id: string) => {
    const itemToDelete = items.find(item => item.id === id)
    if (itemToDelete) {
      setItems(prevItems => prevItems.filter(item => item.id !== id))
      
      // Create a deletion notification
      const deletionNotification: Notification = {
        id: Math.random().toString(36).slice(2),
        itemId: id,
        title: t.notifications.itemDeleted,
        date: new Date(),
        status: 'deleted',
        addedBy: t.currentUser, // Replace with actual user info when available
        userLocation: location || t.locationUnavailable,
        userIp: '127.0.0.1', // Replace with actual IP when available
        details: t.notifications.itemDeletedDetails
          .replace('{title}', itemToDelete.title)
          .replace('{date}', format(new Date(), 'PPp'))
          .replace('{location}', location || t.locationUnavailable)
          .replace('{ip}', '127.0.0.1'), // Replace with actual IP when available
      }
      setNotifications(prevNotifications => [...prevNotifications, deletionNotification])
    }
  }

  const toggleItemFound = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, found: !item.found } : item
      )
    )
    // Update associated notification
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.itemId === id ? { ...notif, status: notif.status === 'pending' ? 'found' : 'pending' } : notif
      )
    )
  }

  const handleNotificationClick = () => {
    setLastNotificationClick(new Date())
  }

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setIsLoading(true)
      setDate(newDate)
      setFilter('all')
      setTrendDateRange({ start: subDays(newDate, 3), end: addDays(newDate, 3) })
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  const adjustTrendRange = (direction: 'backward' | 'forward') => {
    setTrendDateRange(prevRange => ({
      start: direction === 'backward' ? subDays(prevRange.start, 1) : addDays(prevRange.start, 1),
      end: direction === 'backward' ? subDays(prevRange.end, 1) : addDays(prevRange.end, 1),
    }))
  }

  const markNotificationAsSeen = (id: string) => {
    setNotifications(prevNotifications => prevNotifications.filter(notif => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const newNotificationsCount = notifications.filter(notif => isAfter(notif.date, lastNotificationClick)).length
  const displayCount = newNotificationsCount > 99 ? '99+' : newNotificationsCount.toString()

  const filteredItems = items.filter(item => {
    if (!isSameDay(item.date, date)) return false
    if (filter === 'all') return true
    if (filter === 'found') return item.found
    if (filter === 'pending') return !item.found
    return true
  })

  const stats = {
    total: items.length,
    today: items.filter(item => 
      isSameDay(item.date, new Date())
    ).length,
    pending: items.filter(item => !item.found).length,
    found: items.filter(item => item.found).length,
  }

  // Chart data
  const pieData = [
    { name: 'Pending', value: stats.pending, color: theme.warning },
    { name: 'Found', value: stats.found, color: theme.success },
  ]

  const getDailyData = () => {
    const dailyData = []
    let currentDate = startOfDay(trendDateRange.start)
    while (currentDate <= trendDateRange.end) {
      const dayItems = items.filter(item => 
        isSameDay(item.date, currentDate)
      )
      dailyData.push({
        date: format(currentDate, 'MM/dd'),
        pending: dayItems.filter(item => !item.found).length,
        found: dayItems.filter(item => item.found).length,
      })
      currentDate = addDays(currentDate, 1)
    }
    return dailyData
  }

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const handleSearch = React.useCallback(
    debounce((query: string) => {
      if (query.trim() === '') {
        setSearchResults([])
        return
      }

      const results: SearchResult[] = items
        .map(item => {
          const matches: ('title' | 'description' | 'location')[] = []
          if (item.title.toLowerCase().includes(query.toLowerCase())) matches.push('title')
          if (item.description.toLowerCase().includes(query.toLowerCase())) matches.push('description')
          if (item.location.toLowerCase().includes(query.toLowerCase())) matches.push('location')
          return matches.length > 0 ? { item, matches } : null
        })
        .filter((result): result is SearchResult => result !== null)

      setSearchResults(results)

      if (results.length > 0) {
        setDate(results[0].item.date)
        setHighlightedItemId(results[0].item.id)
        setTrendDateRange({
          start: subDays(results[0].item.date, 3),
          end: addDays(results[0].item.date, 3)
        })
      }
    }, 300),
    [items]
  )

  React.useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery, handleSearch])

  React.useEffect(() => {
    if (highlightedItemId) {
      const timer = setTimeout(() => {
        setHighlightedItemId(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [highlightedItemId])

  return (
  <div className="min-h-screen bg-gray-50 flex">
    {/* Left Sidebar */}
    <aside className="w-80 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          className="rounded-md border-0"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </div>
    </aside>

    {/* Main content */}
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="h-full flex flex-col">
                <div className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      handleDateChange(newDate)
                      setIsMobileMenuOpen(false)
                    }}
                    className="rounded-md border-0"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled: "text-muted-foreground opacity-50",
                      day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-2xl font-semibold text-gray-900">{t.title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <form className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder={t.search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-2 w-64 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-lg p-2 text-sm">
              {t.search.resultsCount
                .replace('{count}', searchResults.length.toString())
                .replace('{dates}', new Set(searchResults.map(r => format(r.item.date, 'yyyy-MM-dd'))).size.toString())}
            </div>
          )}
          {searchQuery && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-lg p-2 text-sm">
              {t.search.noResults}
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Globe className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.keys(languages).map((langKey) => (
                <DropdownMenuItem key={langKey} onClick={() => handleLanguageChange(langKey as Language)}>
                  {languages[langKey].languageName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 relative"
                onClick={handleNotificationClick}
              >
                <Bell className={cn(
                  "h-5 w-5 text-gray-600",
                  newNotificationsCount > 0 && "text-blue-500"
                )} />
                {newNotificationsCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {displayCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h3 className="text-lg font-semibold">{t.notifications.title}</h3>
                {notifications.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                    {t.notifications.clearAll}
                  </Button>
                )}
              </div>
              <ScrollArea className="h-[300px]">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    {t.notifications.noNotifications}
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b last:border-b-0 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-gray-500">
                          {notif.status === 'deleted' ? notif.details : `${format(notif.date, 'PPp')} - ${notif.status} - ${notif.addedBy}`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markNotificationAsSeen(notif.id)}
                        title={t.notifications.markAsSeen}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <AnimatedStatsCard title={t.stats.total} value={stats.total} color={theme.primary} />
          <AnimatedStatsCard title={t.stats.today} value={stats.today} color={theme.secondary} />
          <AnimatedStatsCard title={t.stats.pending} value={stats.pending} color={theme.warning} />
          <AnimatedStatsCard title={t.stats.found} value={stats.found} color={theme.success} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.charts.status}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilter('all')}
                className="ml-auto"
              >
                {t.showAllItems}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-40 h-40 rounded-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        onClick={(data) => {
                          setFilter(data.name.toLowerCase() as FilterState)
                        }}
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            opacity={filter === 'all' || filter === entry.name.toLowerCase() ? 1 : 0.3}
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.charts.trend}</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustTrendRange('backward')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustTrendRange('forward')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-full h-40" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getDailyData()}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <defs>
                        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.warning} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={theme.warning} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorFound" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.success} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={theme.success} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="pending"
                        stackId="1"
                        stroke={theme.warning}
                        fillOpacity={1}
                        fill="url(#colorPending)"
                      />
                      <Area
                        type="monotone"
                        dataKey="found"
                        stackId="1"
                        stroke={theme.success}
                        fillOpacity={1}
                        fill="url(#colorFound)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {t.itemsForDate} {format(date, 'MMMM d, yyyy')}
                </CardTitle>
                <CardDescription>
                  {filter !== 'all' && `${t.currentlyShowing} ${filter} ${t.items} (${filteredItems.length.toString()})`}
                </CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {t.addItem}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.addItem}</DialogTitle>
                    <DialogDescription>
                      Add a new lost item
                    </DialogDescription>
                  </DialogHeader>
                  <AddItemForm onSubmit={addItem} translations={t} />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
                <FolderOpen className="h-8 w-8 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">{t.noItems}</h3>
              </div>
            ) : (
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={cn(
                        "border transition-colors",
                        item.found ? "bg-gray-50" : "bg-white",
                        index % 2 === 0 ? "bg-opacity-50" : "bg-opacity-100",
                        highlightedItemId === item.id && "animate-highlight"
                      )}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                          <CardTitle className={cn(
                            "text-lg",
                            item.found && "text-gray-500"
                          )}>{item.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Toggle
                              pressed={item.found}
                              onPressedChange={() => toggleItemFound(item.id)}
                              aria-label={t.markAsFound}
                              className={cn(
                                "data-[state=on]:bg-green-500",
                                "hover:bg-green-100",
                                "focus:ring-green-500"
                              )}
                            >
                              <Check className="h-4 w-4" />
                              <span className="ml-2">{t.markAsFound}</span>
                            </Toggle>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  {t.deleteItem}
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>{t.deleteConfirmTitle}</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => document.getElementById(`closeDialog-${item.id}`)?.click()}>
                                    {t.deleteConfirmNo}
                                  </Button>
                                  <Button variant="destructive" onClick={() => {
                                    deleteItem(item.id)
                                    document.getElementById(`closeDialog-${item.id}`)?.click()
                                  }}>
                                    {t.deleteConfirmYes}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className={cn(
                            "text-sm",
                            item.found ? "text-gray-500" : "text-gray-700"
                          )}>{item.description}</p>
                          <div className={cn(
                            "flex items-center text-sm",
                            item.found ? "text-gray-500" : "text-blue-500"
                          )}>
                            <MapPin className="mr-1 h-4 w-4" />
                            {item.location}
                          </div>
                          <div className="text-xs text-gray-500">
                            {format(item.date, 'PPp')}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
)

function AnimatedStatsCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: color }} />
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-3xl font-bold text-gray-900"
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

function AddItemForm({ 
  onSubmit,
  translations,
}: { 
  onSubmit: (item: { title: string; description: string; location: string }) => void 
  translations: LanguageData
}) {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [location, setLocation] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, description, location })
    setTitle("")
    setDescription("")
    setLocation("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{translations.formTitle}</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 border-0"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">{translations.formDesc}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-100 border-0"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">{translations.formLocation}</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-gray-100 border-0"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {translations.submit}
      </Button>
    </form>
  )
}