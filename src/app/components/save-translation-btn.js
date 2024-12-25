"use client"; // Ensures the code is executed on the client side

import { useState, useEffect } from "react"; // Import hooks for state and effects
import { useUser, useSignIn } from "@clerk/nextjs"; // Imports Clerk hooks for user authentication and sign-in
import { Bookmark } from "lucide-react"; // Imports the Bookmark icon from lucide-react library
import { saveTranslation } from "@/app/actions/save-translation"; // Imports the saveTranslation action to save translation data

// SaveBtn component is responsible for handling the save button functionality
export default function SaveBtn({
  sourceLan, // Source language code (e.g., 'en')
  targetLan, // Target language code (e.g., 'es')
  sourceText, // The source text to be translated
  targetText, // The translated text
  isSaved, // Boolean to check if the translation is saved
  onHandleSave, // Function to handle the "saved" state change when clicked
}) {
  const [isClient, setIsClient] = useState(false);  // State to track client-side rendering

  useEffect(() => {
    setIsClient(true);  // Set the state to true once the component is mounted
  }, []);

  if (!isClient) {
    return null;  // Return null during SSR to avoid hydration error
  }

  // Conditional class for the bookmark icon when the translation is saved
  const btnClasses = isSaved ? "fill-yellow-500" : ""; // If saved, apply yellow color to the icon

  return (
    <button
      type="button"
      onClick={async () => {
        // On button click, save the translation using the saveTranslation action
        await saveTranslation(sourceLan, targetLan, sourceText, targetText);
        // Update the saved state after the translation is saved
        onHandleSave();
      }}
    >
      {/* Render the Bookmark icon with dynamic class for the filled state */}
      <Bookmark className={btnClasses} />
    </button>
  );
}
