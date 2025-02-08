"use client";

import { Author } from "@/index";
import { cn } from "@/lib/utils";
import { useAuth } from "@/Store/Auth";

const UserCard = ({ user, online }: { user: Author; online: boolean }) => {
  const { getSelected, selectedUsers } = useAuth();
  const select = (user: Author) => {
    getSelected(user);
  };
  return (
    <>
      <div
        className={cn(
          "users flex gap-3 items-center justify-center md:justify-start capitalize cursor-pointer p-1 rounded-md",
          selectedUsers?._id === user._id && "bg-secondary/10"
        )}
        onClick={() => select(user)}
      >
        <div className="relative">
          <div
            className={cn(
              "w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden",
              online && "online"
            )}
          >
            <img
              src={user.picture}
              alt="user image"
              className="w-full h-full"
            />
          </div>
        </div>
        <span className="hidden md:block">
          {user.firstName + " " + user.lastName}
        </span>
      </div>
    </>
  );
};

export default UserCard;
