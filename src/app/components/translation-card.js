import { ArrowRight } from "lucide-react"; // Importing the ArrowRight icon from lucide-react library

// Mapping language codes to their respective country flags
const languageToCountry = {
  en: "🏴", // English flag
  es: "🇪🇸", // Spanish flag
  fr: "🇫🇷", // French flag
};

// The TranslationCard component takes in a "group" prop and renders translation details
export const TranslationCard = ({ group }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      {/* Language header displaying the source and target languages with flags */}
      <div className="flex items-center justify-center mb-4 text-2xl">
        {group.source_language && group.target_language ? (
          <>
            {/* Display source language flag and code */}
            <span>{languageToCountry[group.source_language]}</span>
            <span className="mx-2 text-gray-500">{group.source_language.toUpperCase()}</span>
            {/* Arrow icon between languages */}
            <ArrowRight className="text-gray-400" />
            {/* Display target language code and flag */}
            <span className="mx-2 text-gray-500">{group.target_language.toUpperCase()}</span>
            <span>{languageToCountry[group.target_language]}</span>
          </>
        ) : (
          // Display fallback if language data is missing
          <span>Unknown Languages</span>
        )}
      </div>

      {/* Main content area displaying the source texts and translations */}
      <div className="flex-grow space-y-4">
        {/* Loop over each source text and display corresponding translation */}
        {group.source_texts.map((sourceText, index) => (
          <div
            key={`${group.source_language}_${group.target_language}_${index}`} // Unique key for each entry
            className="border-b pb-4 last:border-b-0" // Styling for borders
          >
            {/* Display source text */}
            <div className="mb-2">
              <h3 className="font-semibold mb-1">Source</h3>
              <p>{sourceText || "No source text available"}</p> {/* Fallback message if no source text */}
            </div>
            {/* Display translation */}
            <div>
              <h3 className="font-semibold mb-1">Translations</h3>
              <p>{group.translated_texts[index] || "No translation available"}</p> {/* Fallback message if no translation */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
