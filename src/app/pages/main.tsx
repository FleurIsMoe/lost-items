"use client";

import React, { useState, useEffect } from "react";
import {
  format,
  isSameDay,
  parseISO,
  startOfDay,
  subDays,
  addDays,
} from "date-fns";
import { Bell, Menu, Search, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/lib/languageHandler";
import dashboardText from "@/locales/dashboardText";
import {
  LostItem,
  Notification,
  FilterState,
  SearchResult,
  Language,
} from "@/lib/localization/types";
import Header from "@/app/pages/components/Header";
import Sidebar from "@/app/pages/components/Sidebar";
import Dashboard from "@/app/pages/components/Dashboard";
import ItemList from "@/app/pages/components/ItemList";
import NotificationMenu from "@/app/pages/components/NotificationMenu";
import SearchBar from "@/app/pages/components/SearchBar";
import SettingsDialog from "@/app/pages/components/SettingsDialog";

export default function LostItemsComponent() {
  const { language, changeLanguage } = useLanguage();
  const t = dashboardText[language] || dashboardText.en;

  const [date, setDate] = useState<Date>(new Date());
  const [items, setItems] = useState<LostItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<FilterState>("all");
  const [trendDateRange, setTrendDateRange] = useState({
    start: subDays(new Date(), 3),
    end: addDays(new Date(), 3),
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(
    null
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      const storedItems = localStorage.getItem("items");
      if (storedItems) {
        setItems(
          JSON.parse(storedItems, (key, value) =>
            key === "date" ? parseISO(value) : value
          )
        );
      }
      const storedNotifications = localStorage.getItem("notifications");
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    // Save data to localStorage
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [items, notifications]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setIsLoading(true);
      setDate(newDate);
      setFilter("all");
      setTrendDateRange({
        start: subDays(newDate, 3),
        end: addDays(newDate, 3),
      });
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    changeLanguage(newLanguage as Language);
  };

  const addItem = (
    item: Omit<LostItem, "id" | "date" | "found" | "addedBy">
  ) => {
    const newItem = {
      id: Math.random().toString(36).slice(2),
      date: date,
      found: false,
      addedBy: "Current User",
      ...item,
    };
    setItems((prevItems) => [...prevItems, newItem]);
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
      addNotification({
        id: Math.random().toString(36).slice(2),
        itemId: id,
        title: t.notifications.itemDeleted,
        date: new Date(),
        status: "deleted",
        details: t.notifications.itemDeletedDetails
          .replace("{title}", itemToDelete.title)
          .replace("{date}", format(new Date(), "PPp")),
      });
    }
  };

  const toggleItemFound = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, found: !item.found } : item
      )
    );
    const updatedItem = items.find((item) => item.id === id);
    if (updatedItem) {
      const newStatus = !updatedItem.found;
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
          .replace("{date}", format(new Date(), "PPp")),
      });
    }
  };

  const editItem = (id: string, updatedItem: Partial<LostItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const filteredItems = items.filter((item) => {
    if (!isSameDay(item.date, date)) return false;
    if (filter === "all") return true;
    if (filter === "found") return item.found;
    if (filter === "pending") return !item.found;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar
        date={date}
        onDateChange={handleDateChange}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header
          t={t}
          language={language}
          changeLanguage={handleLanguageChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          notifications={notifications}
          setNotifications={setNotifications}
          items={items}
          onSearchResultClick={(item) => {
            setDate(item.date);
            setHighlightedItemId(item.id);
          }}
        />
        <div className="flex-1 overflow-auto p-6">
          <Dashboard
            t={t}
            items={items}
            date={date}
            isLoading={isLoading}
            filter={filter}
            setFilter={setFilter}
            trendDateRange={trendDateRange}
            setTrendDateRange={setTrendDateRange}
            language={language}
            onDateChange={handleDateChange}
          />
          <ItemList
            t={{
              title: t.itemList.title,
              addItem: t.itemList.addItem,
              markAsLost: t.itemList.markAsLost,
              markAsFound: t.itemList.markAsFound,
              edit: t.itemList.edit,
              delete: t.itemList.delete,
              addNewItem: t.itemList.addNewItem,
              addNewItemDescription: t.itemList.addNewItemDescription,
              description: t.itemList.description,
              category: t.itemList.category,
              selectCategory: t.itemList.selectCategory,
              location: t.itemList.location,
              add: t.itemList.add,
              editItem: t.itemList.editItem,
              editItemDescription: t.itemList.editItemDescription,
              found: t.itemList.found,
              save: t.itemList.save,
              confirmDelete: t.itemList.confirmDelete,
              categories: t.categories,
            }}
            date={date}
            filter={filter}
            filteredItems={filteredItems}
            addItem={addItem}
            editItem={editItem}
            deleteItem={deleteItem}
            toggleItemFound={toggleItemFound}
            highlightedItemId={highlightedItemId}
            language={language}
          />
        </div>
      </main>
      <SettingsDialog
        t={{
          settings: {
            title: t.settings.title,
            description: t.settings.description,
            export: t.settings.export,
            import: t.settings.import,
            delete: t.settings.delete,
            format: t.settings.format,
            file: t.settings.file,
            exportButton: t.settings.exportButton,
            importButton: t.settings.importButton,
            deleteConfirm: t.settings.deleteConfirm,
            deleteAllButton: t.settings.deleteAllButton,
          },
        }}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        items={items}
        setItems={setItems}
      />
    </div>
  );
}