"use client";

import { useAuth } from "@/Store/Auth";
import { useMessage } from "@/Store/Message";
import { Image as IconImage, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Chatmodel from "./Chatmodel";

const Chat = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const input = useRef<null | HTMLInputElement>(null);
  const { fetchUser } = useAuth();
  const { selectedUsers } = useAuth();
  const { sentMessage } = useMessage();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!selectedUsers) {
    return (
      <div className="flex-1 content-center text-center bg-black">
        <h1 className="font-bold text-xl">
          Select atleast one chat to continue
        </h1>
      </div>
    );
  }
  const uploadFile = () => {
    if (!input || !input.current) return;
    input.current.click();
    input.current.onchange = function (e: any) {
      const type = e.target.files[0].type;
      if (type === "")
        return toast.error("Please upload image of type png or jpg");
      if (type === "image/png" || type === "image/jpg") {
        const imageUrl = URL.createObjectURL(e.target.files[0]);
        setSelectedImage(imageUrl);
      } else {
        toast.error("Please upload image of type png or jpg");
      }
    };
  };
  const removeImage = () => {
    if (input && input.current) {
      setSelectedImage("");
      input.current.value = "";
    }
  };
  const Sendmessage = async () => {
    if (!input || !input.current || !input.current.files)
      return toast.error("Input is required");
    const message = text;
    const picture = input.current.files[0];
    sentMessage({
      message,
      picture: picture || "",
      receiverID: selectedUsers._id,
    });
    setText("");
    setSelectedImage("");
    input.current.value = "";
  };

  return (
    <div className="main flex-1 bg-black relative p-2">
      <Chatmodel />
      <input
        type="file"
        name="upload file"
        accept="image/jpg,image/png"
        id="image"
        hidden
        ref={input}
      />
      <div className="w-full flex flex-col absolute left-0 bottom-[10px]">
        {selectedImage && (
          <div className="bg-secondary/10 p-2 flex justify-between">
            <div className="img w-[60px] h-[60px] overflow-hidden rounded-md">
              <img
                src={selectedImage}
                alt="user uploaded image"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="cursor-pointer" onClick={removeImage}>
              <X size={20} />
            </button>
          </div>
        )}
        <div className="input flex flex-col md:flex-row items-center">
          <input
            type="text"
            className="w-full p-3 bg-secondary/10 outline-none rounded-sm"
            placeholder="Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="p-2 bg-primary/10 text-[-webkit-center] text-white hover:bg-primary/20"
            onClick={uploadFile}
          >
            <IconImage />
          </button>
          <button
            className="p-2 bg-primary/10 text-white hover:bg-primary/20"
            onClick={Sendmessage}
            disabled={!text.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
