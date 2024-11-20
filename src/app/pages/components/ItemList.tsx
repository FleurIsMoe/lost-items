import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash2, CheckCircle2, Calendar as CalendarIcon, Clock, MapPin, Tag, MoreVertical, X, AlertTriangle } from "lucide-react";
import { LostItem, FilterState } from "@/lib/localization/types";
import { format } from "date-fns";
import localeMap from "@/lib/localization/localeMap";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

interface ItemListProps {
  t: {
    title: string;
    addItem: string;
    markAsLost: string;
    markAsFound: string;
    edit: string;
    delete: string;
    addNewItem: string;
    addNewItemDescription: string;
    description: string;
    category: string;
    selectCategory: string;
    location: string;
    room: string;
    add: string;
    editItem: string;
    editItemDescription: string;
    found: string;
    save: string;
    confirmDelete: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: string;
    deleteConfirmNo: string;
    deleteConfirmYes: string;
    date: string;
    search: {
      placeholder: string;
      noResults: string;
      resultsCount: string;
    };
    categories: {
      electronics: string;
      clothing: string;
      accessories: string;
      documents: string;
      jewelery: string;
      luggage: string;
      keys: string;
      cosmetics: string;
      glasses: string;
      medical: string;
      other: string;
    };
    placeholders: {
      title: string;
      description: string;
      room: string;
      location: string;
    };
  };
  date: Date;
  filter: FilterState;
  filteredItems: LostItem[];
  addItem: (item: Omit<LostItem, "id" | "found" | "addedBy">) => void;
  editItem: (id: string, updatedItem: Partial<LostItem>) => void;
  deleteItem: (id: string) => void;
  toggleItemFound: (id: string) => void;
  highlightedItemId: string | null;
  language: string;
}

export default function ItemList({
  t,
  filteredItems,
  addItem: addItemHandler,
  editItem,
  deleteItem,
  toggleItemFound,
  highlightedItemId,
  language,
}: ItemListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [items, setItems] = useState(filteredItems);
  const [draggedItem, setDraggedItem] = useState<LostItem | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const dragControls = useDragControls();
  const listRef = useRef<HTMLDivElement>(null);
  const dragPreviewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setItems(filteredItems);
  }, [filteredItems]);

  const [isHighlightFading, setIsHighlightFading] = useState(false);
  const [localHighlightedItemId, setLocalHighlightedItemId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    item: LostItem | null;
  }>({
    x: 0,
    y: 0,
    item: null,
  });

  useEffect(() => {
    if (highlightedItemId) {
      setLocalHighlightedItemId(highlightedItemId);
      setIsHighlightFading(false);
      
      // Start fading after 2 seconds
      const fadeTimeout = setTimeout(() => {
        setIsHighlightFading(true);
      }, 2000);

      return () => clearTimeout(fadeTimeout);
    }
  }, [highlightedItemId]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.context-menu')) {
        setContextMenu(prev => ({ ...prev, item: null }));
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', () => setContextMenu(prev => ({ ...prev, item: null })));
    
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', () => setContextMenu(prev => ({ ...prev, item: null })));
    };
  }, []);

  const updateDragPreview = (x: number, y: number, item: LostItem) => {
    if (!dragPreviewRef.current) {
      const preview = document.createElement('div');
      preview.className = 'drag-preview fixed pointer-events-none z-50';
      preview.innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow-lg border border-border transform transition-all duration-200">
          <div class="normal-preview">
            <p class="font-medium">${item.title}</p>
            <p class="text-sm text-muted-foreground">${item.description}</p>
          </div>
          <div class="folder-preview hidden">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <span class="font-medium">${item.title}</span>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(preview);
      dragPreviewRef.current = preview;
    }

    const preview = dragPreviewRef.current;
    preview.style.left = x + 15 + 'px';
    preview.style.top = y + 15 + 'px';

    // Get the scroll area bounds
    const scrollArea = document.querySelector('.h-\\[calc\\(100vh-13rem\\)\\]');
    if (scrollArea) {
      const scrollAreaRect = scrollArea.getBoundingClientRect();
      const isOutside = 
        x < scrollAreaRect.left - 50 || 
        x > scrollAreaRect.right + 50 || 
        y < scrollAreaRect.top - 50 || 
        y > scrollAreaRect.bottom + 50;

      const normalPreview = preview.querySelector('.normal-preview');
      const folderPreview = preview.querySelector('.folder-preview');
      const container = preview.querySelector('.bg-white');

      if (isOutside) {
        normalPreview?.classList.add('hidden');
        folderPreview?.classList.remove('hidden');
        container?.classList.add('scale-90', 'rotate-3');
      } else {
        normalPreview?.classList.remove('hidden');
        folderPreview?.classList.add('hidden');
        container?.classList.remove('scale-90', 'rotate-3');
      }
    }
  };

  const handleDragStart = (item: LostItem) => {
    setDraggedItem(item);
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (!draggedItem) return;
    
    const x = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
    const y = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY;
    
    setDragPosition({ x, y });

    // Get the scroll area bounds
    const scrollArea = document.querySelector('.h-\\[calc\\(100vh-13rem\\)\\]');
    if (!scrollArea) return;

    const scrollAreaRect = scrollArea.getBoundingClientRect();
    const isOutsideScrollArea = 
      x < scrollAreaRect.left - 50 || 
      x > scrollAreaRect.right + 50 || 
      y < scrollAreaRect.top - 50 || 
      y > scrollAreaRect.bottom + 50;

    if (isOutsideScrollArea) {
      // Handle dragging outside the list area
      updateDragPreview(x, y, draggedItem);
    } else {
      // Handle reordering within the list
      if (listRef.current) {
        const listRect = listRef.current.getBoundingClientRect();
        const relativeY = y - listRect.top + scrollArea.scrollTop;
        const ITEM_HEIGHT = 140;
        const newIndex = Math.floor(relativeY / ITEM_HEIGHT);
        
        if (newIndex >= 0 && newIndex < items.length) {
          const currentIndex = items.findIndex(item => item.id === draggedItem.id);
          if (newIndex !== currentIndex) {
            const newItems = [...items];
            const [removed] = newItems.splice(currentIndex, 1);
            newItems.splice(newIndex, 0, removed);
            
            // Update all items' positions
            const itemElements = document.querySelectorAll('[data-motion-layout-id]');
            itemElements.forEach((el, idx) => {
              const element = el as HTMLElement;
              const item = newItems[idx];
              if (item.id === draggedItem.id) {
                // Let the dragged item follow the cursor
                return;
              }
              // Force position update for other items
              element.style.transform = `translateY(${idx * ITEM_HEIGHT}px)`;
              element.style.transition = 'transform 0.2s ease';
            });
            
            setItems(newItems);
          }
        }
      }
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if (!draggedItem) return;

    // Clean up drag preview
    if (dragPreviewRef.current) {
      document.body.removeChild(dragPreviewRef.current);
      dragPreviewRef.current = null;
    }

    // Get the event coordinates
    const x = 'touches' in event ? event.changedTouches[0].clientX : (event as MouseEvent).clientX;
    const y = 'touches' in event ? event.changedTouches[0].clientY : (event as MouseEvent).clientY;

    // Find if we're over a calendar day
    const elements = document.elementsFromPoint(x, y);
    const calendarDay = elements.find(el => el.hasAttribute('data-calendar-day'));
    
    if (calendarDay) {
      const date = calendarDay.getAttribute('data-date');
      if (date) {
        editItem(draggedItem.id, { ...draggedItem, date: new Date(date) });
      }
    }

    setDraggedItem(null);
    setDragPosition({ x: 0, y: 0 });
  };

  const handleAddItem = () => {
    addItemHandler(newItem);
    setNewItem({
      title: "",
      description: "",
      category: "other",
      location: "",
      room: "",
      date: new Date(),
    });
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (item: LostItem) => {
    setEditingItem(item);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      editItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  const [deleteConfirmItem, setDeleteConfirmItem] = useState<LostItem | null>(null);

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
    setDeleteConfirmItem(null);
  };

  const handleItemClick = (itemId: string) => {
    if (itemId === localHighlightedItemId) {
      setIsHighlightFading(true);
    }
  };

  const handleContextMenu = useCallback((e: React.MouseEvent, item: LostItem) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    
    // Adjust menu position if it would go off screen
    const menuWidth = 224; // w-56 = 14rem = 224px
    const menuHeight = 144; // Approximate height of menu
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const adjustedX = Math.min(x, windowWidth - menuWidth);
    const adjustedY = Math.min(y, windowHeight - menuHeight);
    
    setContextMenu({
      x: adjustedX,
      y: adjustedY,
      item,
    });
  }, []);

  const [newItem, setNewItem] = useState<Omit<LostItem, "id" | "found" | "addedBy">>({
    title: "",
    description: "",
    category: "other",
    location: "",
    room: "",
    date: new Date(),
  });
  const [editingItem, setEditingItem] = useState<LostItem | null>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 px-10">
        <CardTitle className="text-base font-medium">
          {t.title} ({filteredItems.length})
        </CardTitle>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t.addItem}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-13rem)] px-4">
          <div 
            className="py-4 relative" 
            ref={listRef}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1rem',
              minHeight: `${items.length * 140}px`
            }}
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1,
                    y: index * 140,
                    transition: { duration: 0.2 }
                  }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '124px', // 140px - 1rem gap
                    zIndex: draggedItem?.id === item.id ? 50 : 0,
                    touchAction: 'none'
                  }}
                  drag="y"
                  dragDirectionLock
                  dragConstraints={{
                    top: 0,
                    bottom: (items.length - 1) * 140
                  }}
                  onDragStart={() => handleDragStart(item)}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  dragElastic={0.1}
                  dragSnapToOrigin={false}
                >
                  <Card 
                    className={cn(
                      "p-4 hover:bg-accent transition-colors cursor-move relative overflow-hidden group h-full flex items-center",
                      localHighlightedItemId === item.id && !isHighlightFading && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/20 before:to-purple-200/20 before:animate-gradient",
                      localHighlightedItemId === item.id && isHighlightFading && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/20 before:to-purple-200/20 before:animate-fade-out",
                      draggedItem?.id === item.id && "opacity-50 shadow-lg"
                    )}
                    onClick={() => handleItemClick(item.id)}
                    onContextMenu={(e) => handleContextMenu(e, item)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn(
                          "h-3 w-3 rounded-full transition-colors",
                          item.found ? "bg-green-500" : "bg-gray-300"
                        )} />
                        <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm flex-wrap">
                        {item.category && (
                          <div className="flex items-center gap-1.5 text-blue-500">
                            <Tag className="h-4 w-4" />
                            <span>{item.category}</span>
                          </div>
                        )}
                        {(item.room || item.location) && (
                          <div className="flex items-center gap-1.5 text-emerald-500">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {item.room && `${t.room} ${item.room}`}
                              {item.room && item.location && ' - '}
                              {item.location}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-purple-500">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {format(item.date, "PPP", {
                              locale: localeMap[language],
                            })}
                            {" "}
                            {format(item.date, "p", {
                              locale: localeMap[language],
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity pl-4">
                      <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </CardContent>

      {contextMenu.item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="context-menu fixed z-50 min-w-[200px] bg-popover p-1 rounded-md shadow-md border border-border"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
          }}
        >
          <div className="grid gap-1">
            <button
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                toggleItemFound(contextMenu.item!.id);
                setContextMenu(prev => ({ ...prev, item: null }));
              }}
            >
              <CheckCircle2 className={cn(
                "h-4 w-4",
                contextMenu.item.found ? "text-gray-500" : "text-green-500"
              )} />
              <span>{contextMenu.item.found ? t.markAsLost : t.markAsFound}</span>
            </button>
            <button
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                handleEditItem(contextMenu.item!);
                setContextMenu(prev => ({ ...prev, item: null }));
              }}
            >
              <Edit className="h-4 w-4 text-blue-500" />
              <span>{t.edit}</span>
            </button>
            <button
              className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none text-red-500 hover:bg-red-100 hover:text-red-600"
              onClick={() => {
                setDeleteConfirmItem(contextMenu.item!);
                setContextMenu(prev => ({ ...prev, item: null }));
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span>{t.delete}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmItem} onOpenChange={() => setDeleteConfirmItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              <DialogTitle>{t.deleteConfirmTitle}</DialogTitle>
            </div>
            <DialogDescription className="pt-3">
              {t.deleteConfirmMessage.replace("{title}", deleteConfirmItem?.title || '')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmItem(null)}
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
              {t.deleteConfirmNo}
            </Button>
            <Button
              onClick={() => handleDeleteItem(deleteConfirmItem!.id)}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4" />
              {t.deleteConfirmYes}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-[800px] p-0 gap-0">
          <div className="flex min-h-[600px]">
            {/* Left side - Calendar */}
            <div className="w-[400px] border-r flex items-center">
              <div className="flex flex-col h-full w-full px-6">
                <div className="space-y-6 flex-grow pt-12">
                  <div className="flex justify-center">
                    <Card className="border-0 shadow-none mx-auto">
                      <div className="p-2">
                        <Calendar
                          mode="single"
                          selected={newItem.date}
                          onSelect={(date) => setNewItem({ ...newItem, date: date || new Date() })}
                          className="rounded-md scale-110 aspect-square"
                        />
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="pb-6 text-sm text-muted-foreground border-t mx-4">
                  <div className="flex flex-col gap-2 pt-6">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {format(newItem.date || new Date(), "PPP", {
                        locale: localeMap[language],
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {format(new Date(), "p", {
                        locale: localeMap[language],
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex flex-col min-h-full">
              <div className="p-6 flex-grow">
                <DialogHeader className="pb-4">
                  <DialogTitle>{t.addNewItem}</DialogTitle>
                  <DialogDescription>{t.addNewItemDescription}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t.title}</Label>
                    <Input
                      value={newItem.title}
                      onChange={(e) =>
                        setNewItem({ ...newItem, title: e.target.value })
                      }
                      placeholder={t.placeholders.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.description}</Label>
                    <Input
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      placeholder={t.placeholders.description}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.category}</Label>
                    <Select
                      defaultValue="other"
                      value={newItem.category}
                      onValueChange={(value) =>
                        setNewItem({ ...newItem, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectCategory} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.categories).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.location}</Label>
                    <div className="flex gap-2">
                      <div className="w-24">
                        <Input
                          value={newItem.room}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            if (value.length <= 3) {
                              setNewItem({ ...newItem, room: value });
                            }
                          }}
                          placeholder={t.placeholders.room}
                          className="text-center"
                        />
                      </div>
                      <Input
                        value={newItem.location}
                        onChange={(e) =>
                          setNewItem({ ...newItem, location: e.target.value })
                        }
                        placeholder={t.placeholders.location}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="p-6 pt-0">
                <Button
                  onClick={handleAddItem}
                  disabled={!newItem.title || !newItem.location}
                  className="w-full"
                >
                  {t.add}
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-[800px] p-0 gap-0">
          {editingItem && (
            <div className="flex min-h-[600px]">
              {/* Left side - Calendar */}
              <div className="w-[400px] border-r flex items-center">
                <div className="flex flex-col h-full w-full px-6">
                  <div className="space-y-6 flex-grow pt-12">
                    <div className="flex justify-center">
                      <Card className="border-0 shadow-none mx-auto">
                        <div className="p-2">
                          <Calendar
                            mode="single"
                            selected={editingItem.date}
                            onSelect={(date) =>
                              setEditingItem({
                                ...editingItem,
                                date: date || new Date(),
                              })
                            }
                            className="rounded-md scale-110 aspect-square"
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                  <div className="pb-6 text-sm text-muted-foreground border-t mx-4">
                    <div className="flex flex-col gap-2 pt-6">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {format(editingItem.date || new Date(), "PPP", {
                          locale: localeMap[language],
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {format(new Date(), "p", {
                          locale: localeMap[language],
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="flex-1 flex flex-col min-h-full">
                <div className="p-6 flex-grow">
                  <DialogHeader className="pb-4">
                    <DialogTitle>{t.editItem}</DialogTitle>
                    <DialogDescription>
                      {t.editItemDescription}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="space-y-4">
                      <Label htmlFor="edit-title">{t.title}</Label>
                      <Input
                        id="edit-title"
                        value={editingItem.title}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            title: e.target.value,
                          })
                        }
                        placeholder={t.placeholders.title}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="edit-description">{t.description}</Label>
                      <Input
                        id="edit-description"
                        value={editingItem.description}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            description: e.target.value,
                          })
                        }
                        placeholder={t.placeholders.description}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="edit-category">{t.category}</Label>
                      <Select
                        value={editingItem.category}
                        onValueChange={(value) =>
                          setEditingItem({
                            ...editingItem,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.selectCategory} />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(t.categories).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>{t.location}</Label>
                      <div className="flex gap-2">
                        <div className="w-24">
                          <Input
                            value={editingItem.room}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              if (value.length <= 3) {
                                setEditingItem({ ...editingItem, room: value });
                              }
                            }}
                            placeholder={t.placeholders.room}
                            className="text-center"
                          />
                        </div>
                        <Input
                          value={editingItem.location}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              location: e.target.value,
                            })
                          }
                          placeholder={t.placeholders.location}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="pt-6">
                    <Button
                      onClick={handleSaveItem}
                      disabled={!editingItem.title || !editingItem.location}
                      className="w-full"
                    >
                      {t.save}
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes highlightFade {
          0% {
            background-color: rgba(254, 240, 138, 1); /* yellow-100 */
          }
          100% {
            background-color: rgba(254, 240, 138, 0);
          }
        }

        .animate-highlight-fade {
          animation: highlightFade 3s ease-out;
        }
      `}</style>
    </Card>
  );
}
