import React, { useState } from "react";
import { Bell, Check, Plus, Search, Trash, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import localeMap from "@/lib/localization/localeMap";
import { Notification } from '@/lib/localization/types';
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationMenuProps {
  t: {
    notifications: {
      categories: {
        new: string;
        found: string;
        notFound: string;
        deleted: string;
      };
      clearCategory: string;
      noCategoryNotifications: string;
      markAsSeen: string;
    };
  };
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  language: string;
}

export default function NotificationMenu({
  t,
  notifications,
  setNotifications,
  language,
}: NotificationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'found' | 'notFound' | 'deleted'>('new');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'new': return 'text-blue-500';
      case 'found': return 'text-green-500';
      case 'notFound': return 'text-yellow-500';
      case 'deleted': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryNotifications = (category: string) => {
    return notifications.filter(notif => notif.category === category);
  };

  const markNotificationAsSeen = (id: string, category: string) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    toast.success(t.notifications.markAsSeen);
    
    if (getCategoryNotifications(category).length === 1) {
      setIsOpen(false);
    }
  };

  const clearCategoryNotifications = (category: string) => {
    const updatedNotifications = notifications.filter(notif => notif.category !== category);
    setNotifications(updatedNotifications);
    toast.success(t.notifications.clearCategory);
    
    if (updatedNotifications.length === 0) {
      setIsOpen(false);
    }
  };

  const totalCount = notifications.length;
  const displayCount = totalCount > 99 ? "99+" : totalCount.toString();

  const formatDate = (date: Date) => {
    return format(date, "PPP 'alle' HH:mm", { locale: localeMap[language] });
  };

  const NotificationCategory = ({ category }: { category: 'new' | 'found' | 'notFound' | 'deleted' }) => {
    const categoryNotifications = getCategoryNotifications(category);
    
    return (
      <div className="space-y-2">
        {categoryNotifications.length > 0 ? (
          <>
            <ScrollArea className="h-[300px] px-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {categoryNotifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="p-4 hover:bg-accent transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{notif.title}</p>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {notif.details}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatDate(notif.date)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => markNotificationAsSeen(notif.id, category)}
                          title={t.notifications.markAsSeen}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
            <Button 
              variant="ghost" 
              className="w-full h-16 rounded-none border-t hover:bg-destructive hover:text-destructive-foreground transition-colors"
              onClick={() => clearCategoryNotifications(category)}
            >
              {t.notifications.clearCategory}
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-gray-500 space-y-2">
            <Bell className="h-8 w-8 opacity-50" />
            <p>{t.notifications.noCategoryNotifications}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-gray-100"
        >
          <Bell className={`h-5 w-5 ${totalCount > 0 ? 'text-blue-500' : 'text-gray-600'}`} />
          {totalCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {displayCount}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px] p-0">
        <Tabs defaultValue={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="w-full grid grid-cols-4 p-2 bg-background rounded-t-md gap-2">
            {(['new', 'found', 'notFound', 'deleted'] as const).map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className={`relative px-3 py-2 text-sm transition-colors
                  ${getCategoryNotifications(category).length > 0 ? getCategoryColor(category) : ''}
                  data-[state=active]:after:absolute
                  data-[state=active]:after:bottom-[-2px]
                  data-[state=active]:after:left-0
                  data-[state=active]:after:h-[2px]
                  data-[state=active]:after:w-full
                  data-[state=active]:after:bg-primary
                  hover:text-primary/80
                  bg-transparent
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                  focus-visible:ring-offset-2`}
              >
                <span className="text-center w-full">
                  {t.notifications.categories[category]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {(['new', 'found', 'notFound', 'deleted'] as const).map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <NotificationCategory category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}