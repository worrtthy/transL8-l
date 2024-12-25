"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dropdown } from "@/app/components/dropdown";
import { translate } from "@/app/actions/translate";
import VoiceRecorder from "@/app/components/voice-recorder";
import SaveBtn from "@/app/components/save-translation-btn";
import Footer from "./components/Footer";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "zh", label: "Mandarin" },
  { value: "ar", label: "Arabic" },
  { value: "sw", label: "Swahili" },
  { value: "hi", label: "Hindi" },
  { value: "yo", label: "Yoruba" },
  { value: "ig", label: "Igbo" },
  { value: "ha", label: "Hausa" },
];

export default function Home() {
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("es");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSave = () => {
    setIsSaved(true);
  };

  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };

  const handleLanguageToChange = (value) => {
    setLanguageTo(value);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputSet = async (value) => {
    setInputText(value);
    await handleTranslation(value);
  };

  const handleTranslation = async (text) => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("languageTo", languageTo);
    formData.append("languageFrom", languageFrom);
    const translation = await translate(formData);
    setTranslatedText(translation.translation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await handleTranslation(inputText);
  };

  if (!isClient) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-blue-700">Transl8</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Break language barriers instantly with Transl8 – fast, accurate, and effortless translation. Try it now!
        </p>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center p-2 pb-2 gap-4 sm:p-6">
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
              <div className="flex flex-col w-full sm:w-1/2">
                <Dropdown
                  name="languageFrom"
                  value={languageFrom}
                  options={languageOptions}
                  onChange={handleLanguageFromChange}
                />
                <textarea
                  placeholder="Enter text to translate"
                  className="border border-slate-800 rounded-md p-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-700"
                  value={inputText}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/2">
                <div className="flex justify-between">
                  <Dropdown
                    name="languageTo"
                    value={languageTo}
                    options={languageOptions}
                    onChange={handleLanguageToChange}
                  />
                  <SaveBtn
                    sourceLan={languageFrom}
                    targetLan={languageTo}
                    sourceText={inputText}
                    targetText={translatedText}
                    onHandleSave={onSave}
                    isSaved={isSaved}
                  />
                </div>
                <textarea
                  placeholder="Translated text will appear here"
                  className="border border-slate-800 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-700 text-black"
                  value={translatedText}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 h-16 mt-4">
              <button
                type="submit"
                className="p-2 rounded-md bg-slate-800 text-white focus:outline-none"
              >
                Translate
              </button>
              {languageFrom === "en" && (
                <VoiceRecorder handleSetText={handleInputSet} />
              )}
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </section>
  );
}
