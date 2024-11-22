"use client";

import { ModeToggle } from "./misc/mode-toggle";
import Link from "next/link";
import { MoonIcon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center">
          <MoonIcon className="h-6 w-6 mr-2" />
          <span className="font-bold text-xl">Sleepify</span>
        </Link>
        <div className="ml-auto">
          <Link href="/api/auth/logout/" prefetch={false} className="me-4">
            Logout
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
