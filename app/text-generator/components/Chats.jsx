"use client";
import React from "react";
import {
  BackspaceIcon,
  ChatBubbleLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";

const Chats = ({ currId, setCurrId, chats, setChats }) => {
  const createChat = async () => {
    const chat = { _id: nanoid(), messages: [] };
    setChats([...chats, chat]);
    setCurrId(chat._id);
    await fetch("api/mongo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chat),
    });
  };

  const deleteChat = async () => {
    setChats([...chats.filter((c) => c._id != currId)]);
    setCurrId("");
    await fetch("api/mongo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chats.filter((c) => c._id == currId)),
    });
  };

  return (
    <div className="bg-slate-900 w-1/4 flex flex-col gap-4 p-8">
      <p className="text-2xl">Text Generator</p>
      <div className="flex flex-col gap-2">
        {chats.length != 0 ? (
          chats.map((c) => (
            <button
              key={c._id}
              className={`bg-slate-800 flex items-center gap-2 rounded-full px-4 py-2 ${
                currId == c._id && "border border-green-600"
              }`}
              onClick={() => {
                setCurrId(c._id);
              }}
            >
              <ChatBubbleLeftIcon className="w-6 h-6" />
              <div className="line-clamp-1 text-left">{c.messages[0]?.message||"Chat"}</div>
            </button>
          ))
        ) : (
          <div className="text-xl font-extralight text-slate-500">
            Create New Chat
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-auto">
        <button
          className="flex items-center gap-2 rounded-full border border-green-600 text-green-500 px-4 py-2"
          onClick={createChat}
        >
          <PlusCircleIcon className="w-6 h-6" />
          New Chat
        </button>
        <button
          className="flex items-center gap-2 rounded-full border border-red-600 text-red-500 px-4 py-2"
          onClick={deleteChat}
        >
          <BackspaceIcon className="w-6 h-6" />
          Clear Converstion
        </button>
      </div>
    </div>
  );
};

export default Chats;
