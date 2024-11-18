"use client";

import * as React from "react";
import {
  addDays,
  format,
  isAfter,
  isSameDay,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";
import { de, enUS, es, fr, it } from "date-fns/locale";
import {
  Bell,
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  DoorClosed,
  FolderOpen,
  MapPin,
  Menu,
  Plus,
  Search,
  X,
} from "lucide-react";
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
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/utils/languageHandler";
import { LanguageSelector } from "@/components/LanguageSelector";
import dashboardText from "@/locales/dashboardText";

type LostItem = {
  category: string;
  id: string;
  date: Date;
  title: string;
  description: string;
  location: string;
  found: boolean;
  addedBy: string;
  room?: string;
};

type FilterState = "all" | "found" | "pending";

type Notification = {
  id: string;
  itemId: string;
  title: string;
  date: Date;
  status: "pending" | "found" | "deleted";
  details?: string;
};

type SearchResult = {
  item: LostItem;
  matches: ("title" | "description" | "location")[];
};

const theme = {
  primary: "#fe9d3a",
  secondary: "#ff73b4",
  warning: "#B6A6E9",
  error: "#D13438",
  success: "#4394E5",
  background: "#F3F2F1",
  text: "#323130",
  border: "#E1DFDD",
  highlight: "#FFFF00",
};

const localeMap = {
  en: enUS,
  fr: fr,
  es: es,
  de: de,
  it: it,
};

export default function Component() {
  const { language, changeLanguage } = useLanguage();
  const t = dashboardText[language] || dashboardText.en; // Fallback to English if language is not supported

  const [date, setDate] = React.useState<Date>(new Date());
  const [items, setItems] = React.useState<LostItem[]>([]);
  const [lastNotificationClick, setLastNotificationClick] = React.useState<
    Date
  >(new Date());
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<FilterState>("all");
  const [trendDateRange, setTrendDateRange] = React.useState({
    start: subDays(new Date(), 3),
    end: addDays(new Date(), 3),
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [highlightedItemId, setHighlightedItemId] = React.useState<
    string | null
  >(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    // Load last notification click time from localStorage
    const storedLastClick = localStorage.getItem("lastNotificationClick");
    if (storedLastClick) {
      setLastNotificationClick(new Date(storedLastClick));
    }

    // Load items from localStorage
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(
        JSON.parse(
          storedItems,
          (key, value) => key === "date" ? parseISO(value) : value,
        ),
      );
    }
  }, []);

  React.useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    // Save last notification click time to localStorage
    localStorage.setItem(
      "lastNotificationClick",
      lastNotificationClick.toISOString(),
    );
  }, [lastNotificationClick]);

  React.useEffect(() => {
    // Save items to localStorage whenever they change
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addNotification = (notification: Notification) => {
    setNotifications(
      (prevNotifications) => [...prevNotifications, notification]
    );
  };

  const addItem = (
    item: Omit<LostItem, "id" | "date" | "found" | "addedBy">,
  ) => {
    const newItem = {
      id: Math.random().toString(36).slice(2),
      date: date,
      found: false,
      addedBy: "Current User", // Replace with actual user info when available
      ...item,
    };
    setItems((prevItems) => [...prevItems, newItem]);

    // Add a new notification
    addNotification({
      id: Math.random().toString(36).slice(2),
      itemId: newItem.id,
      title: newItem.title,
      date: new Date(),
      status: "pending",
    });
  };

  const deleteItem = (id: string) => {
    const itemToDelete = items.find((item) => item.id === id);
    if (itemToDelete) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));

      // Create a deletion notification
      addNotification({
        id: Math.random().toString(36).slice(2),
        itemId: id,
        title: t.notifications.itemDeleted,
        date: new Date(),
        status: "deleted",
        details: t.notifications.itemDeletedDetails
          .replace("{title}", itemToDelete.title)
          .replace(
            "{date}",
            format(new Date(), "PPp", { locale: localeMap[language] }).replace(
              /^\w/,
              (c) => c.toUpperCase(),
            ),
          ),
      });
    }
  };

  const toggleItemFound = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, found: !item.found } : item
      )
    );
    // Update associated notification with category information
    const updatedItem = items.find((item) => item.id === id);
    if (updatedItem) {
      const newStatus = !updatedItem.found; // Toggle the status
      addNotification({
        id: Math.random().toString(36).slice(2),
        itemId: id,
        title: newStatus ? t.notifications.itemFound : t.notifications.itemLost,
        date: new Date(),
        status: newStatus ? "found" : "pending",
        details: t.notifications.itemStatusChanged
          .replace("{title}", updatedItem.title)
          .replace("{category}", updatedItem.category)
          .replace("{status}", newStatus ? t.found : t.pending)
          .replace(
            "{date}",
            format(new Date(), "PPp", { locale: localeMap[language] }).replace(
              /^\w/,
              (c) => c.toUpperCase(),
            ),
          ),
      });
    }
  };

  const handleNotificationClick = () => {
    setLastNotificationClick(new Date());
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setIsLoading(true);
      setDate(newDate);
      setFilter("all");
      setTrendDateRange({
        start: subDays(newDate, 3),
        end: addDays(newDate, 3),
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const adjustTrendRange = (direction: "backward" | "forward") => {
    setTrendDateRange((prevRange) => ({
      start: direction === "backward"
        ? subDays(prevRange.start, 1)
        : addDays(prevRange.start, 1),
      end: direction === "backward"
        ? subDays(prevRange.end, 1)
        : addDays(prevRange.end, 1),
    }));
  };

  const markNotificationAsSeen = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const newNotificationsCount =
    notifications.filter((notif) => isAfter(notif.date, lastNotificationClick))
      .length;
  const displayCount = newNotificationsCount > 99
    ? "99+"
    : newNotificationsCount.toString();

  const filteredItems = items.filter((item) => {
    if (!isSameDay(item.date, date)) return false;
    if (filter === "all") return true;
    if (filter === "found") return item.found;
    if (filter === "pending") return !item.found;
    return true;
  });

  const stats = React.useMemo(
    () => ({
      total: items.length,
      today: items.filter((item) => isSameDay(item.date, new Date())).length,
      pending: items.filter((item) => !item.found).length,
      found: items.filter((item) => item.found).length,
    }),
    [items],
  );

  // Chart data
  const pieData = [
    { name: t.pending, value: stats.pending, color: theme.warning },
    { name: t.found, value: stats.found, color: theme.success },
  ];

  const getColorByName = (name: string) => {
    const item = pieData.find((data) => data.name === name);
    return item ? item.color : theme.text;
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

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const formatDate = (date: Date) => {
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${t.months[monthIndex]} ${day}, ${year}`;
  };

  const handleSearch = React.useCallback(
    debounce((query: string) => {
      if (query.trim() === "") {
        setSearchResults([]);
        setIsSearchOpen(false);
        return;
      }

      const results: SearchResult[] = items
        .map((item) => {
          const matches: ("title" | "description" | "location")[] = [];
          if (item.title.toLowerCase().includes(query.toLowerCase())) {
            matches.push("title");
          }
          if (item.description.toLowerCase().includes(query.toLowerCase())) {
            matches.push("description");
          }
          if (item.location.toLowerCase().includes(query.toLowerCase())) {
            matches.push("location");
          }
          return matches.length > 0 ? { item, matches } : null;
        })
        .filter((result): result is SearchResult => result !== null);

      setSearchResults(results);
      setIsSearchOpen(true);

      if (results.length > 0) {
        setDate(results[0].item.date);
        setHighlightedItemId(results[0].item.id);
        setTrendDateRange({
          start: subDays(results[0].item.date, 3),
          end: addDays(results[0].item.date, 3),
        });
      }
    }, 300),
    [items, setDate, setHighlightedItemId, setTrendDateRange],
  );

  React.useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current && !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchResultClick = (item: LostItem) => {
    setDate(item.date);
    setHighlightedItemId(item.id);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  React.useEffect(() => {
    if (highlightedItemId) {
      const timer = setTimeout(() => {
        setHighlightedItemId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedItemId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
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
                <div className="container mx-auto p-4">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      className="rounded-md border-0 w-full"
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-semibold text-gray-900">{t.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <form
                className="relative hidden sm:block"
                onSubmit={(e) => e.preventDefault()}
              >
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
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </form>
              {isSearchOpen && (
                <Card className="absolute top-full left-0 right-0 mt-1 z-10">
                  <CardContent className="p-2">
                    {searchResults.length > 0
                      ? (
                        <>
                          <p className="text-sm text-gray-500 mb-2">
                            {t.search.resultsCount
                              .replace(
                                "{count}",
                                searchResults.length.toString(),
                              )
                              .replace(
                                "{dates}",
                                new Set(
                                  searchResults.map((r) =>
                                    format(r.item.date, "yyyy-MM-dd")
                                  ),
                                ).size.toString(),
                              )}
                          </p>
                          <ul className="space-y-2">
                            {searchResults.map((result) => (
                              <li
                                key={result.item.id}
                                className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                                onClick={() =>
                                  handleSearchResultClick(result.item)}
                              >
                                <p className="font-medium">
                                  {result.item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {format(result.item.date, "PPP", {
                                    locale: localeMap[language],
                                  })}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </>
                      )
                      : (
                        <p className="text-sm text-gray-500">
                          {t.search.noResults}
                        </p>
                      )}
                  </CardContent>
                </Card>
              )}
            </div>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={changeLanguage}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 relative"
                  onClick={handleNotificationClick}
                >
                  <Bell
                    className={cn(
                      "h-5 w-5 text-gray-600",
                      newNotificationsCount > 0 && "text-blue-500",
                    )}
                  />
                  {newNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {displayCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h3 className="text-lg font-semibold">
                    {t.notifications.title}
                  </h3>
                  {notifications.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllNotifications}
                    >
                      {t.notifications.clearAll}
                    </Button>
                  )}
                </div>
                <ScrollArea className="h-[300px]">
                  {notifications.length === 0
                    ? (
                      <div className="p-4 text-center text-gray-500">
                        {t.notifications.noNotifications}
                      </div>
                    )
                    : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-4 border-b last:border-b-0 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{notif.title}</p>
                            <p className="text-sm text-gray-500">
                              {notif.status === "deleted"
                                ? notif.details
                                : `${
                                  format(notif.date, "PPp", {
                                    locale: localeMap[language],
                                  }).replace(/^\w/, (c) => c.toUpperCase())
                                } - ${notif.status}`}
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
          <Card className="mb-8 p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <AnimatedStatsCard
                title={t.stats.total}
                value={stats.total}
                color={theme.primary}
              />
              <AnimatedStatsCard
                title={t.stats.today}
                value={stats.today}
                color={theme.secondary}
              />
              <AnimatedStatsCard
                title={t.stats.pending}
                value={stats.pending}
                color={theme.warning}
              />
              <AnimatedStatsCard
                title={t.stats.found}
                value={stats.found}
                color={theme.success}
              />
            </div>

            {/* Charts and Calendar */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              {/* Calendar */}
              <Card className="md:col-span-1 aspect-square w-[400px] h-[400px] p-4">
                <CardContent className="p-0 h-full">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    className="rounded-md border-0 w-full h-full"
                  />
                </CardContent>
              </Card>

              {/* Pie Chart and Bar Chart Group */}
              <div className="flex flex-col md:col-span-1 gap-5">
                {/* Pie Chart */}
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
                      {isLoading
                        ? <Skeleton className="h-full w-full rounded-full" />
                        : (
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
                                  setFilter(
                                    data.name.toLowerCase() as FilterState,
                                  );
                                }}
                                animationBegin={0}
                                animationDuration={500}
                                animationEasing="ease-out"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    opacity={filter === "all" ||
                                        filter === entry.name.toLowerCase()
                                      ? 1
                                      : 0.3}
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

                {/* Bar Chart */}
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
                      {isLoading
                        ? <Skeleton className="h-full w-full" />
                        : (
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            minWidth={100}
                          >
                            <BarChart
                              data={barData}
                              margin={{
                                top: 5,
                                right: 5,
                                left: -15,
                                bottom: 5,
                              }}
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

              {/* Area Chart */}
              <Card className="h-[400px] flex-grow relative">
                <div className="absolute top-2 right-2 flex items-center space-x-2 z-10">
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
                  <div className="w-full h-full pt-10 pr-16 pb-6 pl-2">
                    {isLoading
                      ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Skeleton className="w-4/5 h-4/5" />
                        </div>
                      )
                      : (
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
                                  stopColor={theme.warning}
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor={theme.warning}
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
                                  stopColor={theme.success}
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="95%"
                                  stopColor={theme.success}
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="pending"
                              stackId="1"
                              stroke={theme.warning}
                              fillOpacity={1}
                              fill="url(#colorPending)"
                              animationDuration={1000}
                            />
                            <Area
                              type="monotone"
                              dataKey="found"
                              stackId="1"
                              stroke={theme.success}
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
          {/* Items List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {t.itemsForDate} {formatDate(date)}
                  </CardTitle>
                  <CardDescription>
                    {filter !== "all" &&
                      `${t.currentlyShowing} ${filter} ${t.items} (${filteredItems.length})`}
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
                      <DialogDescription>{t.addLostItem}</DialogDescription>
                    </DialogHeader>
                    <AddItemForm onSubmit={addItem} translations={t} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="h-[600px] overflow-y-auto">
              {filteredItems.length === 0
                ? (
                  <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <FolderOpen className="h-8 w-8 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {t.noItems}
                    </h3>
                  </div>
                )
                : (
                  <div className="space-y-4">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          className={cn(
                            "border transition-colors",
                            item.found ? "bg-gray-50" : "bg-white",
                            index % 2 === 0
                              ? "bg-opacity-50"
                              : "bg-opacity-100",
                            highlightedItemId === item.id &&
                              "animate-highlight",
                          )}
                        >
                          <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <CardTitle
                              className={cn(
                                "text-lg",
                                item.found && "text-gray-500",
                              )}
                            >
                              {item.title}
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                              <Toggle
                                pressed={item.found}
                                onPressedChange={() => toggleItemFound(item.id)}
                                aria-label={t.markAsFound}
                                className={cn(
                                  "data-[state=on]:bg-[#4394E5]",
                                  "hover:bg-[#66b4f2]",
                                  "focus:ring-[#66b4f2]",
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
                                <DialogContent className="flex flex-col items-center">
                                  <DialogHeader className="text-center">
                                    <DialogTitle>
                                      {t.deleteConfirmTitle}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="flex justify-center space-x-2">
                                    <Button
                                      variant="destructive"
                                      onClick={() => {
                                        deleteItem(item.id);
                                        document
                                          .getElementById(
                                            `closeDialog-${item.id}`,
                                          )
                                          ?.click();
                                      }}
                                    >
                                      {t.deleteConfirmYes}
                                    </Button>
                                    <DialogClose asChild>
                                      <Button variant="outline">
                                        {t.deleteConfirmNo}
                                      </Button>
                                    </DialogClose>
                                  </div>
                                </DialogContent>
                                {" "}
                              </Dialog>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p
                              className={cn(
                                "text-sm",
                                item.found ? "text-gray-500" : "text-gray-700",
                              )}
                            >
                              {item.description}
                            </p>
                            <div className="flex items-center space-x-4">
                              {item.room && (
                                <div
                                  className={cn(
                                    "flex items-center text-sm",
                                    item.found
                                      ? "text-gray-500"
                                      : "text-blue-500",
                                  )}
                                >
                                  <DoorClosed className="mr-1 h-4 w-4" />
                                  {t.formRoom}: {item.room}
                                </div>
                              )}
                              <div
                                className={cn(
                                  "flex items-center text-sm",
                                  item.found
                                    ? "text-gray-500"
                                    : "text-blue-500",
                                )}
                              >
                                <MapPin className="mr-1 h-4 w-4" />
                                {item.location}
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              {format(item.date, "PPp", {
                                locale: localeMap[language],
                              }).replace(/^\w/, (c) => c.toUpperCase())}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function AnimatedStatsCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="h-2" style={{ backgroundColor: color }} />
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedNumber value={value} />
        </div>
      </CardContent>
    </Card>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = React.useState(value);
  const previousValue = React.useRef(value);

  React.useEffect(() => {
    if (value !== previousValue.current) {
      const duration = 1000;
      const startTime = Date.now();
      const startValue = previousValue.current;

      const updateValue = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.round(
          startValue + progress * (value - startValue),
        );
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        } else {
          previousValue.current = value;
        }
      };

      requestAnimationFrame(updateValue);
    }
  }, [value]);

  return <span>{displayValue}</span>;
}

function AddItemForm({
  onSubmit,
  translations,
}: {
  onSubmit: (item: Omit<LostItem, "id" | "date" | "found" | "addedBy">) => void;
  translations: any;
}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [room, setRoom] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      location,
      room,
      category: "",
    });
    setTitle("");
    setDescription("");
    setLocation("");
    setRoom("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">{translations.formTitle}</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">{translations.formDescription}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3 max-w-[6ch]">
          <Label htmlFor="room">{translations.formRoom}</Label>
          <Input
            id="room"
            value={room}
            onChange={(e) => {
              const value = e.target.value;
              if (
                value === "" ||
                (/^\d{1,3}$/.test(value) && parseInt(value) <= 999)
              ) {
                setRoom(value);
              }
            }}
            maxLength={4}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="location">{translations.formLocation}</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        {translations.formSubmit}
      </Button>
    </form>
  );
}
