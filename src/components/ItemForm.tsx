import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { LostItem } from "@/lib/localization/types";

interface ItemFormProps {
  onSubmit: (item: Omit<LostItem, "id" | "found" | "addedBy">) => void;
  translations: any;
  initialValues?: Partial<LostItem>;
}

const ItemForm: React.FC<ItemFormProps> = ({
  onSubmit,
  translations,
  initialValues = {},
}) => {
  const [title, setTitle] = React.useState(initialValues.title || "");
  const [description, setDescription] = React.useState(
    initialValues.description || ""
  );
  const [location, setLocation] = React.useState(initialValues.location || "");
  const [room, setRoom] = React.useState(initialValues.room || "");
  const [date, setDate] = React.useState<Date | undefined>(
    initialValues.date || new Date()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      location,
      room,
      category: "",
      date: date || new Date(),
    });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="title">{translations.formTitle}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">{translations.formDescription}</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/3 max-w-[6ch]">
              <Label htmlFor="room">{translations.formRoom}</Label>
              <Input
                id="room"
                value={room}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "" ||
                    (/^\d{1,3}$/.test(value) && parseInt(value) <= 999)
                  ) {
                    setRoom(value);
                  }
                }}
                maxLength={4}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="location">{translations.formLocation}</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="date">{translations.formDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>{translations.pickDate}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 m-0" align="start">
                <Card className="w-full h-full shadow-md border-none p-2">
                  <CardContent className="p-0">
                    <Calendar selected={date} onSelect={setDate} />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" className="w-full">
            {translations.formSubmit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
