"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const SearchServer = ({ data }: ServerSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleClick = ({
    id,
    type,
  }: {
    id: string;
    type: "member" | "channel";
  }) => {
    if (type === "member") {
      setIsOpen(false);
      return router.push(`/server/${params?.serverId}/conversations/${id}`);
    }

    if (type === "channel") {
      setIsOpen(false);
      return router.push(`/server/${params?.serverId}/channels/${id}`);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="h-4 w-4 mr-2 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm text-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className="pointer-events-none select-none border bg-muted font-mono ml-auto text-xs rounded-full px-1.5 h-5 inline-flex items-center ">
          <span className="mr-1">CTRL</span>K
        </kbd>
      </button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen} hideClose>
        <div className="bg-[#2b2d31] p-3">
          <CommandInput placeholder="command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {data.map(({ label, type, data }) => {
              if (data === null) return null;
              return (
                <CommandGroup key={label} heading={label}>
                  {data?.map(({ id, name, icon }) => (
                    <CommandItem
                      key={id}
                      onSelect={() => handleClick({ id, type })}
                    >
                      {icon} {name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </div>
      </CommandDialog>
    </>
  );
};
