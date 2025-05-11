"use client"

import { useState } from "react"
import { Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CheckboxItem {
  id: string
  label: string
  checked: boolean
}

interface ManageItemsModalProps {
  title: string
  items: CheckboxItem[]
  isOpen: boolean
  onClose: () => void
  onSave: (items: CheckboxItem[]) => void
}

export function ManageItemsModal({ title, items: initialItems, isOpen, onClose, onSave }: ManageItemsModalProps) {
  const [items, setItems] = useState<CheckboxItem[]>([...initialItems])
  const [isCreating, setIsCreating] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [editingItem, setEditingItem] = useState<{ id: string; name: string } | null>(null)

  // Réinitialiser l'état lorsque la modale s'ouvre avec de nouveaux éléments
  useState(() => {
    if (isOpen) {
      setItems([...initialItems])
      setIsCreating(false)
      setNewItemName("")
      setEditingItem(null)
    }
  })

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleEditItem = (id: string, name: string) => {
    setEditingItem({ id, name })
  }

  const handleSaveEdit = () => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? { ...item, label: editingItem.name } : item)))
      setEditingItem(null)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
  }

  const handleSaveNew = () => {
    if (newItemName.trim()) {
      const newId = `item-${Date.now()}`
      setItems([...items, { id: newId, label: newItemName, checked: false }])
      setNewItemName("")
      setIsCreating(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const handleSave = () => {
    onSave(items)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleCreateNew}>
              Create New
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4">
          {/* En-tête du tableau */}
          <div className="grid grid-cols-2 font-medium bg-gray-100 p-2 rounded-t-md">
            <div>Name</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Corps du tableau */}
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
              <div className="grid grid-cols-2 items-center p-2 bg-gray-50">
                <div className="flex items-center gap-2">
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
                <div>{item.label}</div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditItem(item.id, item.label)}
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
  )
}
