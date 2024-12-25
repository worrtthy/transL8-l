"use client"; // Ensures the code is executed on the client side

import { useState, useEffect } from "react"; // Import hooks for state and effects
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

  const iconClasses = isSaved ? "fill-yellow-500 stroke-yellow-500" : "stroke-black";

  return (
    <button
      type="button"
      onClick={async () => {
        await saveTranslation(sourceLan, targetLan, sourceText, targetText);
        onHandleSave();
      }}
      className="focus:outline-none"
    >
      <Bookmark className={`w-6 h-6 ${iconClasses}`} strokeWidth={2} />
    </button>
  );
}
