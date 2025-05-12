import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxItem {
  id?: string;
  name: string;
  checked: boolean;
}

interface CollapsibleCheckboxSectionProps {
  title: string;
  items: CheckboxItem[];
  defaultOpen?: boolean;
  onItemChange?: (id: string, checked: boolean) => void;
  onManage?: () => void;
}

export function CollapsibleCheckboxSection({
  title,
  items,
  defaultOpen = false,
  onItemChange,
  onManage,
}: CollapsibleCheckboxSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (onItemChange) {
      onItemChange(id, checked);
    }
  };

  const handleManageClick = () => {
    if (onManage) {
      onManage();
    }
  };

  return (
    <div className="border rounded-md">
      <div className="flex justify-between items-center p-3 cursor-pointer" onClick={toggleSection}>
        <h2 className="font-medium">{title}</h2>
        <Button variant="ghost" size="sm" className="p-1 h-auto">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
      </div>

      {isOpen && (
        <div className="p-4 pt-0 border-t">
          <div className="flex justify-end mb-2">
            <Button variant="outline" size="sm" onClick={handleManageClick} disabled={!onManage}>
              Manage
            </Button>
          </div>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(item.id!, checked as boolean)
                    }
                    className={item.checked ? "bg-indigo-600 border-indigo-600" : ""}
                  />
                  <label htmlFor={item.id} className="text-sm">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 col-span-2">
              No items available. Please add items to this section.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
