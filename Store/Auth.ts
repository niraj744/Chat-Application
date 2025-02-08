"use client";

import { Axiosinstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { preetyError } from "@/PreetyError";
import { Author } from "@/index";
import { io, Socket } from "socket.io-client";

interface Types {
  userloading: boolean;
  user: null | Author;
  fetchUser: () => void;
  Logout: () => void;
  socket: Socket | null;
  socketConnection: () => void;
  disConnecteSocket: () => void;
  getSelected: (user: Author) => void;
  usersLoading: boolean;
  users: null | Author[];
  getUsers: () => void;
  onlineUsers: null | string[];
  selectedUsers: null | Author;
}

export const useAuth = create<Types>((set, get) => ({
  userloading: false,
  user: null,
  socket: null,
  usersLoading: false,
  users: null,
  onlineUsers: null,
  selectedUsers: null,
  fetchUser: async () => {
    set({ userloading: true });
    try {
      const response = await Axiosinstance.get("/api/auth/getUser");
      const user = response.data.user;
      set({ user: user });
      get().socketConnection();
    } catch (error) {
      const e = preetyError(error);
      toast.error(e?.message);
    } finally {
      set({ userloading: false });
    }
  },
  getUsers: async () => {
    set({ usersLoading: true });
    try {
      const response = await Axiosinstance.get("/api/auth/getUsers");
      const users = response.data;
      set({ users: users });
    } catch (error) {
      const e = preetyError(error);
      toast.error(e?.message);
      get().disConnecteSocket();
    } finally {
      set({ usersLoading: false });
    }
  },
  getSelected: (user) => {
    set({ selectedUsers: user });
  },
  socketConnection: () => {
    const { user, socket } = get();
    if (!user || socket?.connected) return;
    const s = io("http://localhost:8080", {
      query: {
        userID: user._id,
      },
    });
    s.connect();
    set({ socket: s });
    s.on("onlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
  disConnecteSocket: () => {
    const { socket } = get();
    if (socket && socket.connected) socket.disconnect();
  },
  Logout: async () => {
    get().disConnecteSocket();
  },
}));
