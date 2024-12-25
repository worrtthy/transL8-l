"use client"; // Ensures the code is executed on the client side

import { useState, useEffect } from "react"; // Import hooks for state and effects
import { useUser, useSignIn } from "@clerk/nextjs"; // Imports Clerk hooks for user authentication and sign-in
import { Bookmark } from "lucide-react"; // Imports the Bookmark icon from lucide-react library
import { saveTranslation } from "@/app/actions/save-translation"; // Imports the saveTranslation action to save translation data

export default function SaveBtn({
  sourceLan,
  targetLan,
  sourceText,
  targetText,
  isSaved,
  onHandleSave,
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const btnClasses = isSaved ? "fill-yellow-500" : "stroke-black";

  return (
    <button
      type="button"
      onClick={async () => {
        await saveTranslation(sourceLan, targetLan, sourceText, targetText);
        onHandleSave();
      }}
      className="border border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
    >
      <Bookmark className={`w-6 h-6 ${btnClasses}`} />
    </button>
  );
}
