import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/lib/localization/types";
import { format } from "date-fns";
import localeMap from "@/lib/localization/localeMap";

interface NotificationMenuProps {
  t: any;
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
  const newNotificationsCount = notifications.length;
  const displayCount =
    newNotificationsCount > 99 ? "99+" : newNotificationsCount.toString();

  const markNotificationAsSeen = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-100 relative"
        >
          <Bell
            className={`h-5 w-5 text-gray-600 ${
              newNotificationsCount > 0 && "text-blue-500"
            }`}
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
              <DropdownMenuItem
                key={notif.id}
                className="p-4 border-b last:border-b-0 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-sm text-gray-500">
                    {notif.status === "deleted"
                      ? notif.details
                      : `${format(notif.date, "PPp", {
                          locale: localeMap[language],
                        })} - ${notif.status}`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => markNotificationAsSeen(notif.id)}
                  title={t.notifications.markAsSeen}
                >
                  <Bell className="h-4 w-4" />
                </Button>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
