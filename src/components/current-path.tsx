"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function CurrentPath() {
  const pathname = usePathname();
  const path = pathname.split("/").filter(Boolean);
  return (
    <div className="w-full  text-center ">
      <h1 className="text-xl font-bold ">{path[0]}</h1>
    </div>
  );
}
