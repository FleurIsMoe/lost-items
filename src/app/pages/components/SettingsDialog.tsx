import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { LostItem } from "@/lib/localization/types";

interface SettingsDialogProps {
  t: {
    settings: {
      title: string;
      description: string;
      export: string;
      import: string;
      delete: string;
      format: string;
      file: string;
      exportButton: string;
      importButton: string;
      deleteConfirm: string;
      deleteAllButton: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
  items: LostItem[];
  setItems: (items: LostItem[]) => void;
}

export default function SettingsDialog({
  t,
  isOpen,
  onClose,
  items,
  setItems,
}: SettingsDialogProps) {
  const [exportFormat, setExportFormat] = useState("csv");
  const [importFile, setImportFile] = useState<File | null>(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);

  const handleExport = () => {
    let content = "";
    if (exportFormat === "csv") {
      content = "ID,Title,Description,Category,Location,Date,Found\n";
      content += items
        .map(
          (item) =>
            `${item.id},${item.title},${item.description},${item.category},${item.location},${item.date},${item.found}`
        )
        .join("\n");
    } else if (exportFormat === "json") {
      content = JSON.stringify(items, null, 2);
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lost_items_export.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      let importedItems: LostItem[] = [];

      if (importFile.name.endsWith(".csv")) {
        const lines = content.split("\n");
        const headers = lines[0].split(",");
        importedItems = lines.slice(1).map((line) => {
          const values = line.split(",");
          const item: any = {};
          headers.forEach((header, index) => {
            item[header.toLowerCase()] = values[index];
          });
          return item as LostItem;
        });
      } else if (importFile.name.endsWith(".json")) {
        importedItems = JSON.parse(content);
      }

      setItems([...items, ...importedItems]);
      setImportFile(null);
    };

    reader.readAsText(importFile);
  };

  const handleDeleteAll = () => {
    if (deleteAllConfirm) {
      setItems([]);
      setDeleteAllConfirm(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.settings.title}</DialogTitle>
          <DialogDescription>{t.settings.description}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">{t.settings.export}</TabsTrigger>
            <TabsTrigger value="import">{t.settings.import}</TabsTrigger>
            <TabsTrigger value="delete">{t.settings.delete}</TabsTrigger>
          </TabsList>
          <TabsContent value="export">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="export-format" className="text-right">
                  {t.settings.format}
                </Label>
                <select
                  id="export-format"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="col-span-3"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleExport}>
                {t.settings.exportButton}
              </Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="import">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="import-file" className="text-right">
                  {t.settings.file}
                </Label>
                <Input
                  id="import-file"
                  type="file"
                  accept=".csv,.json"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleImport}
                disabled={!importFile}
              >
                {t.settings.importButton}
              </Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="delete">
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="delete-confirm"
                  checked={deleteAllConfirm}
                  onCheckedChange={(checked) =>
                    setDeleteAllConfirm(checked as boolean)
                  }
                />
                <Label htmlFor="delete-confirm">
                  {t.settings.deleteConfirm}
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleDeleteAll}
                disabled={!deleteAllConfirm}
                variant="destructive"
              >
                {t.settings.deleteAllButton}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
