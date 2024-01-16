"use client";
import React, { useEffect, useState } from "react";
import Chats from "./components/Chats";
import Messages from "./components/Messages";

const page = () => {
  const [chats, setChats] = useState([]);
  const [currId, setCurrId] = useState("");

  const getData = async () => {
    await fetch("api/mongo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setChats(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex gap-1 bg-zinc-800 h-full text-xs font-light overflow-hidden">
      <Chats
        currId={currId}
        setCurrId={setCurrId}
        chats={chats}
        setChats={setChats}
      />
      <Messages currId={currId} chats={chats} setChats={setChats} />
    </div>
  );
};

export default page;
