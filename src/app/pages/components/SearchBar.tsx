import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LostItem, SearchResult } from "@/lib/localization/types";

interface SearchBarProps {
  t: {
    search: {
      placeholder: string;
      resultsCount: string;
      noResults: string;
    };
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  items: LostItem[];
  onSearchResultClick: (item: LostItem) => void;
}

export default function SearchBar({
  t,
  searchQuery,
  setSearchQuery,
  items,
  onSearchResultClick,
}: SearchBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setIsSearchOpen(false);
        return;
      }

      const results: SearchResult[] = items
        .map((item) => {
          const matches: ("title" | "description" | "location" | "category")[] =
            [];
          if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            matches.push("title");
          }
          if (
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            matches.push("description");
          }
          if (item.location.toLowerCase().includes(searchQuery.toLowerCase())) {
            matches.push("location");
          }
          if (item.category.toLowerCase().includes(searchQuery.toLowerCase())) {
            matches.push("category");
          }
          return matches.length > 0 ? { item, matches } : null;
        })
        .filter((result): result is SearchResult => result !== null);

      setSearchResults(results);
      setIsSearchOpen(true);
    };

    handleSearch();
  }, [searchQuery, items]);

  return (
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
      </form>
      {isSearchOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-10">
          <CardContent className="p-2">
            {searchResults.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-2">
                  {t.search.resultsCount
                    .replace("{count}", searchResults.length.toString())
                    .replace(
                      "{dates}",
                      new Set(
                        searchResults.map(
                          (r) => r.item.date.toISOString().split("T")[0]
                        )
                      ).size.toString()
                    )}
                </p>
                <ul className="space-y-2">
                  {searchResults.map((result) => (
                    <li
                      key={result.item.id}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => {
                        onSearchResultClick(result.item);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <p className="font-medium">{result.item.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(result.item.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400">
                        {result.matches.join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-gray-500">{t.search.noResults}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
