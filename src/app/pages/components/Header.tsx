import React from "react";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import NotificationMenu from "@/app/pages/components/NotificationMenu";
import SearchBar from "@/app/pages/components/SearchBar";
import { LostItem, Notification, Language } from "@/lib/localization/types";

interface HeaderProps {
  t: any;
  language: Language;
  changeLanguage: (lang: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  items: LostItem[];
  onSearchResultClick: (item: LostItem) => void;
}

export default function Header({
  t,
  language,
  changeLanguage,
  searchQuery,
  setSearchQuery,
  isSettingsOpen,
  setIsSettingsOpen,
  notifications,
  setNotifications,
  items,
  onSearchResultClick,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{t.title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar
          t={t}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          items={items}
          onSearchResultClick={onSearchResultClick}
        />
        <LanguageSelector
          currentLanguage={language as Language}
          onLanguageChange={changeLanguage}
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-100"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>
        <NotificationMenu
          t={t}
          notifications={notifications}
          setNotifications={setNotifications}
          language={language}
        />
      </div>
    </header>
  );
}
