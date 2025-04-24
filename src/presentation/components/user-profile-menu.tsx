import { useState } from "react";

import placeholder from "../../assets/avatar.svg";

import { DropdownMenu, Avatar } from "radix-ui";
import { LogOut, User, Settings, HelpCircle } from "lucide-react";

interface UserProfileMenuProps {
  user?: {
    name: string;
    email: string;
    image?: string;
  };
  onSignOut?: () => void;
}

export function UserProfileMenu({
  user = {
    name: "John Doe",
    email: "john@example.com",
    image: "/placeholder.svg?height=40&width=40",
  },
  onSignOut = () => console.log("Sign out clicked"),
}: UserProfileMenuProps) {
  const [open, setOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-indigo-200 rounded-full  h-12 w-12">
          <Avatar.Root className="h-12 w-12 cursor-pointer hover:opacity-80 transition-opacity">
            <Avatar.Image className="size-5/6 ml-1" src={placeholder} alt={user.name} />
            <Avatar.Fallback>{getInitials(user.name)}</Avatar.Fallback>
          </Avatar.Root>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        className="w-56 bg-indigo-200 border-2 border-indigo-500 rounded-md"
      >
        <DropdownMenu.Label className="font-normal p-2 cursor-default">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="flex p-2 cursor-pointer hover:bg-indigo-300">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="flex p-2 cursor-pointer hover:bg-indigo-300">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="flex p-2 cursor-pointer hover:bg-indigo-300">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          className="flex p-2 cursor-pointer hover:bg-indigo-300"
          onClick={onSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
