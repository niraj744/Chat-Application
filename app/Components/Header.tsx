"use client";

import { Ellipsis, Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useAuth } from "@/Store/Auth";

const Header = () => {
  const { user, userloading, Logout } = useAuth();
  return (
    <header className="bg-[#3a86ff] p-2 rounded-md flex gap-3 justify-between items-center">
      <h1 className="font-bold text-xl capitalize">Chat app</h1>
      {userloading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <div className="img w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
            <img
              src={user?.picture}
              alt="user image"
              className="w-full h-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <LogoutLink>Logout</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </header>
  );
};

export default Header;
