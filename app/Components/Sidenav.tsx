"use client";

import { useEffect } from "react";
import UserCard from "./UserCard";
import { useAuth } from "@/Store/Auth";
import User from "@/app/Skeleton/User";

const Sidenav = () => {
  const { getUsers, users, usersLoading, onlineUsers } = useAuth();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <aside className="w-[5rem] md:w-[20rem] bg-black py-4 px-2 min-h-[85vh]">
      <ul className="flex flex-col gap-4">
        {usersLoading ? (
          <User />
        ) : (
          users?.map((user) => (
            <li key={user._id}>
              <UserCard
                user={user}
                online={onlineUsers?.includes(user._id) ? true : false}
              />
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};

export default Sidenav;
