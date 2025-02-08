"use client";

import { Axiosinstance } from "@/lib/axios";
import { preetyError } from "@/PreetyError";
import toast from "react-hot-toast";
import { create } from "zustand";
import { Message } from "@/index";
import { useAuth } from "./Auth";

interface Props {
  message: string;
  picture?: File | string;
  receiverID: string;
}

interface MessageTypes {
  messages: Message[];
  loadingMessage: boolean;
  sentMessage: ({ message, picture, receiverID }: Props) => void;
  getMessages: (receiverID: string) => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useMessage = create<MessageTypes>((set, get) => ({
  messages: [],
  loadingMessage: false,
  sentMessage: async (data) => {
    try {
      const res = await Axiosinstance.post("/api/message/sendMessage", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status >= 200) {
        toast.success("Message sent successfully");
        const message = res.data.newMessage;
        const messages = get().messages;
        set({ messages: [...messages, message] });
      }
    } catch (error) {
      const e = preetyError(error);
      toast.error(e?.message);
    }
  },
  getMessages: async (receiverID) => {
    set({ loadingMessage: true });
    try {
      const res = await Axiosinstance.get(
        `/api/message/getMessages/${receiverID}`
      );
      if (res.status >= 200) set((state) => ({ messages: res.data }));
    } catch (error) {
      const e = preetyError(error);
      toast.error(e?.message);
    } finally {
      set((state) => ({ loadingMessage: false }));
    }
  },
  subscribeToMessages: () => {
    const { selectedUsers } = useAuth.getState();
    if (!selectedUsers) return;
    const socket = useAuth.getState().socket;
    socket?.on("message", (newMessage: Message) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderID === selectedUsers._id;
      if (!isMessageSentFromSelectedUser) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuth.getState().socket;
    socket?.off("message");
  },
}));
