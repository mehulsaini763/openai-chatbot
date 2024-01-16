"use client";
import React from "react";
import {
  Squares2X2Icon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftIcon,
  PhotoIcon,
  MusicalNoteIcon,
  BookmarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="bg-slate-800 flex flex-col justify-center gap-8 p-8">
      <Link href={"/dashboard"}>
        <Squares2X2Icon
          className={`w-6 h-6 ${pathname == "/dashboard" && "text-green-600"}`}
        />
      </Link>
      <Link href={"/trending"}>
        <ArrowTrendingUpIcon  className={`w-6 h-6 ${
            pathname == "/trending" && "text-green-600"
          }`} />
      </Link>

      <Link href={"/text-generator"}>
        <ChatBubbleLeftIcon
          className={`w-6 h-6 ${
            pathname == "/text-generator" && "text-green-600"
          }`}
        />
      </Link>

      <Link href={"/image-generator"}>
        <PhotoIcon
          className={`w-6 h-6 ${
            pathname == "/image-generator" && "text-green-600"
          }`}
        />
      </Link>
      <Link href={"/audio-generator"}>
        <MusicalNoteIcon
          className={`w-6 h-6 ${
            pathname == "/audio-generator" && "text-green-600"
          }`}
        />
      </Link>
      <Link href={"/bookmarks"}>
        <BookmarkIcon
          className={`w-6 h-6 ${pathname == "/bookmarks" && "text-green-600"}`}
        />
      </Link>
      <button>
        <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Sidebar;
