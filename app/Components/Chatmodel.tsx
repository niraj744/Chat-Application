"use client";

import { Message } from "@/index";
import { cn } from "@/lib/utils";
import { useAuth } from "@/Store/Auth";
import { useMessage } from "@/Store/Message";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";

const Chatmodel = () => {
  const messageref = useRef<null | HTMLDivElement>(null);
  const { selectedUsers } = useAuth();
  const {
    loadingMessage,
    getMessages,
    messages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessage();

  useEffect(() => {
    getMessages(selectedUsers?._id!);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUsers?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageref && messageref.current) {
      messageref.current.scrollTo(0, messageref.current.scrollHeight);
    }
  }, [messages]);

  if (loadingMessage)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div
      className="flex flex-col gap-2 h-[60vh] md:h-[70vh] overflow-y-auto"
      ref={messageref}
    >
      {messages.map((message: Message) => (
        <div
          key={message._id}
          className={cn(
            message.senderID === selectedUsers?._id
              ? "flex justify-start"
              : "flex justify-end"
          )}
        >
          <div className="message">
            <span className="text-secondary/40 text-xs">
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </span>
            <p
              className={cn(
                "p-2 rounded-2xl w-fit mt-1",
                message.senderID === selectedUsers?._id
                  ? "bg-secondary/10"
                  : "bg-[#3a86ff]"
              )}
            >
              {message.message}
            </p>
            {message.picture && (
              <div className="w-[15rem] h-[13rem] rounded-md overflow-hidden mt-1">
                <img
                  src={message.picture}
                  alt="user upload image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chatmodel;
