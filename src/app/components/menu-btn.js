"use client";
import { useState, useEffect } from "react";  // Import hooks for state and effects
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MenuBtn = () => {
  const [isClient, setIsClient] = useState(false);  // State to check if component is rendered on the client-side
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);  // Set state to true when component is mounted on the client-side
  }, []);

  if (!isClient) {
    return null;  // Return nothing during server-side render to prevent hydration error
  }

  if (pathname === "/translations") {
    return (
      <Link
        className="mr-2 border rounded-md p-2"
        href="/"
      >
        Translate New
      </Link>
    );
  }
  return (
    <Link
      className="mr-2 border rounded-md p-2"
      href="/translations"
    >
      My Translations
    </Link>
  );
};
