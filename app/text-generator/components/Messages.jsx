"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MicrophoneIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

const Messages = ({ currId, chats, setChats }) => {
  const inputRef = useRef();
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currId == "") {
      setMessages([]);
    } else
      setMessages(() => {
        const c = chats.filter((c) => c._id == currId);
        return c[0].messages;
      });
  }, [currId]);

  const handleMessage = async () => {
    const message = {
      role: "system",
      message: inputRef.current.value,
      dateAndTime: getDateAndTime(),
    };

    inputRef.current.value = "";
    setMessages([...messages, message]);
    setLoading(true);

    let temp = [...messages, message];

    await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        temp.push({
          role: data.role,
          message: data.message,
          dateAndTime: getDateAndTime(),
        });
      });

    setMessages([...temp]);

    setLoading(false);

    let temp2 = chats;
    temp2.map((c) => {
      if (c._id == currId) {
        c.messages = temp;
      }
    });

    console.log(temp2);
    setChats([...temp2]);

    await fetch("api/mongo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: currId, messages: temp }),
    });
  };

  return (
    <>
      {currId == "" ? (
        <div className="bg-slate-900 w-3/4 grid grid-col-1 place-content-center gap-4 p-8">
          <div className="flex flex-col items-center text-4xl font-light text-slate-500">
            <div>Select a Chat</div>
            <div>or</div>
            <div>Create new Chat</div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 w-3/4 flex flex-col gap-4 p-8">
          {/* MESSAGES */}
          <div
            ref={scrollRef}
            className="flex flex-col gap-8 text-base overflow-y-auto px-2"
          >
            {messages?.map((m) => {
              if (m.role == "system") {
                return (
                  <div
                    key={m.message}
                    className="flex flex-col items-end self-end gap-2 ml-28"
                  >
                    <label className="text-xs">{m.dateAndTime}</label>
                    <div className="w-fit px-4 py-2 rounded-lg bg-slate-800">
                      {m.message}
                    </div>
                  </div>
                );
              }

              if (m.role == "assistant")
                return (
                  <div
                    key={m.message}
                    className="flex flex-col items-start self-start gap-2 mr-28"
                  >
                    <label className="text-xs">{m.dateAndTime}</label>
                    <div className="w-fit px-4 py-2 rounded-lg bg-slate-800">
                      {m.message}
                    </div>
                  </div>
                );
            })}
            {loading && (
              <div className="flex flex-col items-start self-start gap-2 mr-28">
                <label className="text-xs">{getDateAndTime()}</label>
                <div className="w-fit px-4 py-2 rounded-lg bg-slate-800 animate-pulse">
                  ...
                </div>
              </div>
            )}
          </div>
          {/* INPUT */}
          <div className="mt-auto">
            <div className="flex items-center gap-4 p-3 rounded-lg border">
              <button>
                <PaperClipIcon className="h-5 w-5" />
              </button>
              <input
                ref={inputRef}
                type="text"
                className="bg-transparent text-base w-full focus:outline-none"
                placeholder="Send a message"
                onKeyDown={(e) => e.key == "Enter" && handleMessage()}
              />
              <button>
                <MicrophoneIcon className="h-5 w-5" />
              </button>
              <button onClick={handleMessage}>
                <PaperAirplaneIcon className="h-5 w-5 text-green-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const getDateAndTime = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date();
  return (
    d.getHours() +
    "." +
    d.getMinutes() +
    " " +
    (d.getHours() >= 12 ? "PM" : "AM") +
    ", " +
    d.getDate() +
    " " +
    months[d.getMonth()]
  );
};

export default Messages;
