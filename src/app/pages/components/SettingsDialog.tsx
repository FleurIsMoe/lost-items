import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDropzone } from 'react-dropzone';

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
      autoDelete: string;
      autoDeleteDescription: string;
      autoDeleteDays: string;
      autoDeleteMonths: string;
      autoDeleteYears: string;
      autoDeleteAfter: string;
      autoDeleteNever: string;
      dragDropText: string;
      dropFilesText: string;
      csvFormat: string;
      jsonFormat: string;
      xmlFormat: string;
      litemsFormat: string;
      timeUnits: {
        days: string;
        months: string;
        years: string;
      };
      exportSuccess: string;
      importSuccess: string;
      importError: string;
      duplicateWarning: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
  items: LostItem[];
  setItems: (items: LostItem[]) => void;
}

interface AutoDeleteSettings {
  enabled: boolean;
  value: number;
  unit: 'days' | 'months' | 'years';
}

export function SettingsDialog({
  t,
  isOpen,
  onClose,
  items,
  setItems,
}: SettingsDialogProps) {
  const [exportFormat, setExportFormat] = useState("litems");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);
  const [autoDelete, setAutoDelete] = useState<AutoDeleteSettings>(() => {
    const saved = localStorage.getItem('autoDeleteSettings');
    return saved ? JSON.parse(saved) : {
      enabled: false,
      value: 30,
      unit: 'days'
    };
  });

  useEffect(() => {
    localStorage.setItem('autoDeleteSettings', JSON.stringify(autoDelete));
    
    if (autoDelete.enabled) {
      const checkAndDeleteOldItems = () => {
        const now = new Date();
        const filteredItems = items.filter(item => {
          const itemDate = new Date(item.date);
          const diff = now.getTime() - itemDate.getTime();
          const days = diff / (1000 * 60 * 60 * 24);
          
          let threshold = autoDelete.value;
          if (autoDelete.unit === 'months') threshold *= 30;
          if (autoDelete.unit === 'years') threshold *= 365;
          
          return days <= threshold;
        });

        if (filteredItems.length < items.length) {
          setItems(filteredItems);
          toast.info(`Automatically deleted ${items.length - filteredItems.length} old items`);
        }
      };

      checkAndDeleteOldItems();
      const interval = setInterval(checkAndDeleteOldItems, 24 * 60 * 60 * 1000); // Check daily
      return () => clearInterval(interval);
    }
  }, [autoDelete, items]);

  const handleExport = () => {
    let exportData: string;
    const filename = `lost-items-export-${new Date().toISOString().split('T')[0]}`;

    switch (exportFormat) {
      case 'csv':
        exportData = 'ID,Title,Description,Location,Found,Date\n' +
          items.map(item => 
            `${item.id},"${item.title}","${item.description}","${item.location}",${item.found},${item.date}`
          ).join('\n');
        break;
      case 'json':
        exportData = JSON.stringify(items, null, 2);
        break;
      case 'xml':
        exportData = `<?xml version="1.0" encoding="UTF-8"?>
<lostItems>
${items.map(item => `  <item>
    <id>${item.id}</id>
    <title>${item.title}</title>
    <description>${item.description}</description>
    <location>${item.location}</location>
    <found>${item.found}</found>
    <date>${item.date}</date>
    <category>${item.category}</category>
  </item>`).join('\n')}
</lostItems>`;
        break;
      case 'litems':
        exportData = `LITEMS1.0
# Lost Items Export Format
# Created: ${new Date().toISOString()}
# Items: ${items.length}

${items.map(item => 
`[ITEM]
ID=${item.id}
TITLE=${item.title}
DESC=${item.description}
LOC=${item.location}
FOUND=${item.found}
DATE=${item.date}
CAT=${item.category}
[END]`).join('\n\n')}`;
        break;
      default:
        return;
    }

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(t.settings.exportSuccess);
  };

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/csv': ['.csv'],
      'text/xml': ['.xml'],
      'text/plain': ['.litems']
    },
    multiple: false
  });

  const processImportedItems = (importedItems: LostItem[]) => {
    const existingIds = new Set(items.map(item => item.id));
    const newItems = importedItems.filter(item => !existingIds.has(item.id));
    
    if (newItems.length > 0) {
      setItems([...items, ...newItems]);
      toast.success(t.settings.importSuccess);
    } else {
      toast.error(t.settings.duplicateWarning);
    }
  };

  const parseXML = (xmlText: string): LostItem[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const items: LostItem[] = [];

    const itemElements = xmlDoc.getElementsByTagName("item");
    for (let i = 0; i < itemElements.length; i++) {
      const item = itemElements[i];
      const getElementText = (tagName: string) => item.getElementsByTagName(tagName)[0]?.textContent || '';
      
      items.push({
        id: getElementText("id"),
        title: getElementText("title"),
        description: getElementText("description"),
        location: getElementText("location"),
        found: getElementText("found") === "true",
        date: new Date(getElementText("date")),
        category: getElementText("category"),
        addedBy: getElementText("addedBy") || 'import',
        room: getElementText("room")
      });
    }

    return items;
  };

  const parseLITEMS = (litemsText: string): LostItem[] => {
    const items: LostItem[] = [];
    const sections = litemsText.split('[ITEM]').slice(1); // Skip header

    for (const section of sections) {
      const itemData: { [key: string]: string } = {};
      const lines = section.split('\n');
      
      for (const line of lines) {
        if (line.includes('=')) {
          const [key, value] = line.split('=').map(s => s.trim());
          if (key && value) {
            itemData[key] = value;
          }
        }
      }

      if (itemData.ID) {
        items.push({
          id: itemData.ID,
          title: itemData.TITLE,
          description: itemData.DESC,
          location: itemData.LOC,
          found: itemData.FOUND === "true",
          date: new Date(itemData.DATE),
          category: itemData.CAT,
          addedBy: itemData.ADDEDBY || 'import',
          room: itemData.ROOM
        });
      }
    }

    return items;
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      let importedItems: LostItem[] = [];

      try {
        if (file.name.endsWith('.json')) {
          importedItems = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          const headers = lines[0].split(',');
          
          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            const values = lines[i].split(',').map(v => v.trim().replace(/^"(.*)"$/, '$1'));
            const item: any = {};
            
            headers.forEach((header, index) => {
              const value = values[index];
              if (header.toLowerCase() === 'found') {
                item[header.toLowerCase()] = value === 'true';
              } else if (header.toLowerCase() === 'date') {
                item[header.toLowerCase()] = new Date(value);
              } else {
                item[header.toLowerCase()] = value;
              }
            });

            item.addedBy = 'import';
            importedItems.push(item as LostItem);
          }
        } else if (file.name.endsWith('.xml')) {
          importedItems = parseXML(content);
        } else if (file.name.endsWith('.litems')) {
          importedItems = parseLITEMS(content);
        }

        processImportedItems(importedItems);
      } catch (error) {
        console.error('Import error:', error);
        toast.error(t.settings.importError);
      }
    };

    reader.readAsText(file);
  };

  const handleDeleteAll = () => {
    if (deleteAllConfirm) {
      setItems([]);
      setDeleteAllConfirm(false);
      toast.success("All items have been deleted");
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

          <TabsContent value="export" className="mt-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">{t.settings.export}</h4>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <Label className="text-sm font-medium">{t.settings.format}</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setExportFormat("csv")}
                      className={`p-4 rounded-lg border-2 transition-colors text-left space-y-2 ${
                        exportFormat === "csv" 
                          ? "border-primary bg-primary/10" 
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium">CSV</div>
                      <div className="text-sm text-muted-foreground">{t.settings.csvFormat}</div>
                    </button>
                    <button
                      onClick={() => setExportFormat("json")}
                      className={`p-4 rounded-lg border-2 transition-colors text-left space-y-2 ${
                        exportFormat === "json" 
                          ? "border-primary bg-primary/10" 
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium">JSON</div>
                      <div className="text-sm text-muted-foreground">{t.settings.jsonFormat}</div>
                    </button>
                    <button
                      onClick={() => setExportFormat("xml")}
                      className={`p-4 rounded-lg border-2 transition-colors text-left space-y-2 ${
                        exportFormat === "xml" 
                          ? "border-primary bg-primary/10" 
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium">XML</div>
                      <div className="text-sm text-muted-foreground">{t.settings.xmlFormat}</div>
                    </button>
                    <button
                      onClick={() => setExportFormat("litems")}
                      className={`p-4 rounded-lg border-2 transition-colors text-left space-y-2 ${
                        exportFormat === "litems" 
                          ? "border-primary bg-primary/10" 
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium">LITEMS</div>
                      <div className="text-sm text-muted-foreground">{t.settings.litemsFormat}</div>
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleExport}
                  className="w-full"
                >
                  {t.settings.exportButton}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="import" className="mt-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">{t.settings.import}</h4>
              <div className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>{t.settings.dropFilesText}</p>
                  ) : (
                    <p>{t.settings.dragDropText}</p>
                  )}
                </div>
                {selectedFile && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate">{selectedFile.name}</span>
                    <Button
                      onClick={() => handleImport(selectedFile)}
                      className="ml-2"
                    >
                      {t.settings.importButton}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="delete" className="mt-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-4">{t.settings.delete}</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="delete-confirm"
                    checked={deleteAllConfirm}
                    onCheckedChange={(checked) => setDeleteAllConfirm(checked as boolean)}
                  />
                  <Label htmlFor="delete-confirm">
                    {t.settings.deleteConfirm}
                  </Label>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAll}
                  disabled={!deleteAllConfirm}
                  className="w-full"
                >
                  {t.settings.deleteAllButton}
                </Button>
              </div>
            </Card>

            <Card className="p-4 mt-4">
              <h4 className="font-semibold mb-4">{t.settings.autoDelete}</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="auto-delete"
                    checked={autoDelete.enabled}
                    onCheckedChange={(checked) => 
                      setAutoDelete(prev => ({ ...prev, enabled: checked as boolean }))
                    }
                  />
                  <Label htmlFor="auto-delete">
                    {t.settings.autoDeleteDescription}
                  </Label>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={autoDelete.value}
                    onChange={(e) => 
                      setAutoDelete(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))
                    }
                    min="1"
                    disabled={!autoDelete.enabled}
                  />
                  <Select 
                    value={autoDelete.unit}
                    onValueChange={(value: 'days' | 'months' | 'years') => 
                      setAutoDelete(prev => ({ ...prev, unit: value }))
                    }
                    disabled={!autoDelete.enabled}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">{t.settings.autoDeleteDays}</SelectItem>
                      <SelectItem value="months">{t.settings.autoDeleteMonths}</SelectItem>
                      <SelectItem value="years">{t.settings.autoDeleteYears}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export { SettingsDialog };
