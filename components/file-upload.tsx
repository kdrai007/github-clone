"use client";
import { X } from "lucide-react";
import Image from "next/image";
import "@uploadthing/react/styles.css";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const filetype = value?.split(".").pop();
  if (value && filetype !== ".pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} alt="uploaded image" className="rounded-full" fill />
        <button className="bg-rose-500 p-1 shadow-sm rounded-full absolute top-0 right-0 text-white">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => console.log(error)}
    />
  );
};
