import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModalItem {
  id?: string;
  name: string;
}

interface ManageItemsModalProps {
  title: string;
  items: ModalItem[];
  isOpen: boolean;
  onClose: () => void;
  // onSave: (items: CheckboxItem[]) => void;
  onSave: (newItemName: string) => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function ManageItemsModal({
  title,
  items: initialItems,
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
}: ManageItemsModalProps) {
  const [items, setItems] = useState<ModalItem[]>([...initialItems]);
  const [isCreating, setIsCreating] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [editingItem, setEditingItem] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setItems([...initialItems]);
      setIsCreating(false);
      setNewItemName("");
      setEditingItem(null);
    }
  }, [isOpen, initialItems, title]);

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    onDelete(id);
  };

  const handleEditItem = (id: string, name: string) => {
    setEditingItem({ id, name });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id ? { ...item, name: editingItem.name } : item,
        ),
      );
      onUpdate(editingItem.id, editingItem.name);
      setEditingItem(null);
    }
  };

  // const handleCreateNew = async (route: string, data: unknown) => {
  //   setIsCreating(true);

  // };

  const handleSaveNew = () => {
    if (newItemName.trim()) {
      const newId = `item-${Date.now()}`;
      setItems([...items, { id: newId, name: newItemName }]);
      setNewItemName("");
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewItemName("");
    setEditingItem(null);
    onClose();
  };

  const handleSave = () => {
    onSave(newItemName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Manage {title}</DialogTitle>
          <div className="flex gap-2 pt-4">
            <Button variant="destructive" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              Create New
            </Button>
          </div>
        </DialogHeader>

        <Input
          id="newItemName"
          className="w-full"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />

        <div className="mt-4">
          {/* Table Header */}
          <div className="grid grid-cols-2 font-medium bg-gray-100 p-2 rounded-t-md">
            <div>Name</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="border rounded-b-md divide-y max-h-[50vh] overflow-y-auto">
            {isCreating && (
              <div className="grid grid-cols-2 items-center p-2 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Input
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="New item name"
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button size="sm" onClick={() => setIsCreating(false)} variant="outline">
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveNew} disabled={!newItemName.trim()}>
                    Save
                  </Button>
                </div>
              </div>
            )}

            {editingItem && (
              <div className="flex p-2 bg-gray-50 gap-4 items-center ">
                <div className="flex items-center w-full">
                  <Input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button size="sm" onClick={() => setEditingItem(null)} variant="outline">
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSaveEdit} disabled={!editingItem.name.trim()}>
                    Save
                  </Button>
                </div>
              </div>
            )}

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-2 items-center p-2">
                <div>{item.name}</div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id!)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditItem(item.id!, item.name)}
                    disabled={!!editingItem || isCreating}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
