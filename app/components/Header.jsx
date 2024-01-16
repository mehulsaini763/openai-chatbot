import React from "react";
import {
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="flex items-center justify-evenly gap-8 p-4 bg-zinc-800 ">
      <div className="shrink-0 grow"></div>
      <div className="bg-slate-800 border border-slate-500 flex items-center px-4 rounded-full overflow-hidden gap-8">
        <input
          className="bg-slate-800 p-2 max-w-72 grow focus:outline-none"
          type="text"
          placeholder="Search anything..."
        />
        <MagnifyingGlassIcon className="h-6 w-6" />
      </div>
      <div className="flex items-center grow justify-end gap-4">
        <BellIcon className="h-6 w-6" />
        <div className="flex items-center gap-2">
          <UserCircleIcon className="h-8 w-8" />
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
