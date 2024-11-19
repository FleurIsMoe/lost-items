import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { LostItem, FilterState } from "@/lib/localization/types";
import { format } from "date-fns";
import localeMap from "@/lib/localization/localeMap";

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
    add: string;
    editItem: string;
    editItemDescription: string;
    found: string;
    save: string;
    confirmDelete: string;
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
  };
  date: Date;
  filter: FilterState;
  filteredItems: LostItem[];
  addItem: (item: Omit<LostItem, "id" | "date" | "found" | "addedBy">) => void;
  editItem: (id: string, updatedItem: Partial<LostItem>) => void;
  deleteItem: (id: string) => void;
  toggleItemFound: (id: string) => void;
  highlightedItemId: string | null;
  language: string;
}

export default function ItemList({
  t,
  filteredItems,
  addItem,
  editItem,
  deleteItem,
  toggleItemFound,
  highlightedItemId,
  language,
}: ItemListProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<
    Omit<LostItem, "id" | "date" | "found" | "addedBy">
  >({
    title: "",
    description: "",
    category: "",
    location: "",
  });
  const [editingItem, setEditingItem] = useState<LostItem | null>(null);
  const [localHighlightedItemId, setLocalHighlightedItemId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (highlightedItemId) {
      setLocalHighlightedItemId(highlightedItemId);
      const timer = setTimeout(() => {
        setLocalHighlightedItemId(null);
      }, 3000); // Highlight for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [highlightedItemId]);

  const handleAddItem = () => {
    addItem(newItem);
    setNewItem({ title: "", description: "", category: "", location: "" });
    setIsAddDialogOpen(false);
  };

  const handleEditItem = () => {
    if (editingItem) {
      editItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      deleteItem(id);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {t.title} ({filteredItems.length})
        </CardTitle>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t.addItem}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`mb-4 p-4 rounded-lg border transition-colors duration-300 ${
                item.id === localHighlightedItemId
                  ? "bg-yellow-100 animate-highlight-fade"
                  : ""
              } ${item.found ? "bg-green-100" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleItemFound(item.id)}
                    title={item.found ? t.markAsLost : t.markAsFound}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 ${
                        item.found ? "text-green-500" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingItem(item)}
                    title={t.edit}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    title={t.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                <span>{item.category}</span>
                <span>•</span>
                <span>{item.location}</span>
                <span>•</span>
                <span>
                  {format(item.date, "PPp", {
                    locale: localeMap[language],
                  })}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.addNewItem}</DialogTitle>
            <DialogDescription>{t.addNewItemDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                {t.title}
              </Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                {t.description}
              </Label>
              <Input
                id="description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                {t.category}
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewItem({ ...newItem, category: value })
                }
                defaultValue={newItem.category}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t.selectCategory} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">
                    {t.categories.electronics}
                  </SelectItem>
                  <SelectItem value="clothing">
                    {t.categories.clothing}
                  </SelectItem>
                  <SelectItem value="accessories">
                    {t.categories.accessories}
                  </SelectItem>
                  <SelectItem value="documents">
                    {t.categories.documents}
                  </SelectItem>
                  <SelectItem value="jewelery">
                    {t.categories.jewelery}
                  </SelectItem>
                  <SelectItem value="luggage">
                    {t.categories.luggage}
                  </SelectItem>
                  <SelectItem value="keys">{t.categories.keys}</SelectItem>
                  <SelectItem value="cosmetics">
                    {t.categories.cosmetics}
                  </SelectItem>
                  <SelectItem value="glasses">
                    {t.categories.glasses}
                  </SelectItem>
                  <SelectItem value="medical">
                    {t.categories.medical}
                  </SelectItem>
                  <SelectItem value="other">{t.categories.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                {t.location}
              </Label>
              <Input
                id="location"
                value={newItem.location}
                onChange={(e) =>
                  setNewItem({ ...newItem, location: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddItem}>
              {t.add}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.editItem}</DialogTitle>
            <DialogDescription>{t.editItemDescription}</DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  {t.title}
                </Label>
                <Input
                  id="edit-title"
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  {t.description}
                </Label>
                <Input
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  {t.category}
                </Label>
                <Select
                  onValueChange={(value) =>
                    setEditingItem({ ...editingItem, category: value })
                  }
                  defaultValue={editingItem.category}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={t.selectCategory} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">
                      {t.categories.electronics}
                    </SelectItem>
                    <SelectItem value="clothing">
                      {t.categories.clothing}
                    </SelectItem>
                    <SelectItem value="accessories">
                      {t.categories.accessories}
                    </SelectItem>
                    <SelectItem value="documents">
                      {t.categories.documents}
                    </SelectItem>
                    <SelectItem value="jewelery">
                      {t.categories.jewelery}
                    </SelectItem>
                    <SelectItem value="luggage">
                      {t.categories.luggage}
                    </SelectItem>
                    <SelectItem value="keys">{t.categories.keys}</SelectItem>
                    <SelectItem value="cosmetics">
                      {t.categories.cosmetics}
                    </SelectItem>
                    <SelectItem value="glasses">
                      {t.categories.glasses}
                    </SelectItem>
                    <SelectItem value="medical">
                      {t.categories.medical}
                    </SelectItem>
                    <SelectItem value="other">{t.categories.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  {t.location}
                </Label>
                <Input
                  id="edit-location"
                  value={editingItem.location}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, location: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-found" className="text-right">
                  {t.found}
                </Label>
                <Checkbox
                  id="edit-found"
                  checked={editingItem.found}
                  onCheckedChange={(checked: boolean) =>
                    setEditingItem({
                      ...editingItem,
                      found: checked as boolean,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEditItem}>
              {t.save}
            </Button>
          </DialogFooter>
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
