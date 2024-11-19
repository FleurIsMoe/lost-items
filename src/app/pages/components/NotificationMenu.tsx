import React, { useState } from "react";
import { Bell, Check, Plus, Search, Trash } from 'lucide-react';
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

interface NotificationMenuProps {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  t: any;
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'new': return <Plus className="h-4 w-4" />;
      case 'found': return <Check className="h-4 w-4" />;
      case 'notFound': return <Search className="h-4 w-4" />;
      case 'deleted': return <Trash className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getCategoryNotifications = (category: string) => {
    return notifications.filter(notif => notif.category === category);
  };

  const markNotificationAsSeen = (id: string, category: string) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    
    // Close the menu if this was the last notification in the category
    if (getCategoryNotifications(category).length === 1) {
      setIsOpen(false);
    }
  };

  const clearCategoryNotifications = (category: string) => {
    const updatedNotifications = notifications.filter(notif => notif.category !== category);
    setNotifications(updatedNotifications);
    
    // Close the menu if there are no more notifications
    if (updatedNotifications.length === 0) {
      setIsOpen(false);
    }
  };

  const totalCount = notifications.length;
  const displayCount = totalCount > 99 ? "99+" : totalCount.toString();

  const NotificationCategory = ({ category }: { category: 'new' | 'found' | 'notFound' | 'deleted' }) => {
    const categoryNotifications = getCategoryNotifications(category);
    
    return (
      <div className="space-y-2">
        {categoryNotifications.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h4 className="font-medium flex items-center gap-2">
              {getCategoryIcon(category)}
              {t.notifications.categories[category]}
            </h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => clearCategoryNotifications(category)}
            >
              {t.notifications.clearCategory}
            </Button>
          </div>
        )}
        {categoryNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t.notifications.noCategoryNotifications}
          </div>
        ) : (
          categoryNotifications.map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              className="p-4 border-b last:border-b-0 flex items-center justify-between"
              onSelect={(e) => e.preventDefault()}
            >
              <div>
                <p className="font-medium">{notif.title}</p>
                <p className="text-sm text-gray-500">
                  {format(notif.date, "PPp", {
                    locale: localeMap[language],
                  })}
                </p>
                <p className="text-sm text-gray-500">{notif.details}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => markNotificationAsSeen(notif.id, category)}
                title={t.notifications.markAsSeen}
              >
                <Check className="h-4 w-4" />
              </Button>
            </DropdownMenuItem>
          ))
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
          className="rounded-full hover:bg-gray-100 relative"
        >
          <Bell className={`h-5 w-5 text-gray-600 ${totalCount > 0 && "text-blue-500"}`} />
          {totalCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {displayCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <Tabs defaultValue="new" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="new" className="relative">
              {t.notifications.categories.new}
              {getCategoryNotifications('new').length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCategoryNotifications('new').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="found" className="relative">
              {t.notifications.categories.found}
              {getCategoryNotifications('found').length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCategoryNotifications('found').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="notFound" className="relative">
              {t.notifications.categories.notFound}
              {getCategoryNotifications('notFound').length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCategoryNotifications('notFound').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="deleted" className="relative">
              {t.notifications.categories.deleted}
              {getCategoryNotifications('deleted').length > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-gray-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCategoryNotifications('deleted').length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-2">
            <TabsContent value="new">
              <NotificationCategory category="new" />
            </TabsContent>
            <TabsContent value="found">
              <NotificationCategory category="found" />
            </TabsContent>
            <TabsContent value="notFound">
              <NotificationCategory category="notFound" />
            </TabsContent>
            <TabsContent value="deleted">
              <NotificationCategory category="deleted" />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}