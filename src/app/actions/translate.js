"use server"; // Marks this file as a server-side file, ensuring server-side logic execution

import { GoogleGenerativeAI } from "@google/generative-ai"; // Importing the GoogleGenerativeAI library

// Supported languages list
const supportedLanguages = [
  "en", "fr", "es", "de", "zh", "ar", "sw", "hi", "yo", "ig", "ha"
];

// Function to handle text translation using Google's Generative AI model
async function translateText(text, targetLanguage, languageFrom = "") {
  // Validate if languages are supported
  if (!supportedLanguages.includes(targetLanguage)) {
    return `Translation to ${targetLanguage} is not supported.`;
  }

  if (languageFrom && !supportedLanguages.includes(languageFrom)) {
    return `Translation from ${languageFrom} is not supported.`;
  }

  try {
    // Create a new instance of GoogleGenerativeAI with the API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    
    // Initialize the Generative AI model with cleared context for each request
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      clearContext: true, // Clear context if supported
    });

    // Construct the translation prompt
    const prompt = languageFrom
      ? `Translate the following text from ${languageFrom} to ${targetLanguage}: ${text}`
      : `Translate the following text into ${targetLanguage}: ${text}`;
      
    const additionalPrompt = "Just return the translated text. No additional descriptions.";

    // Send the request to the AI model with the constructed prompt
    const result = await model.generateContent(prompt + additionalPrompt);
    
    // Return the translated text
    return result.response.text();
  } catch (error) {
    // Log and handle errors
    console.error("Translation error:", error);
    return "Translation failed. Please try again.";
  }
}

// Function to handle the translation process when called from the form submission
export async function translate(formData) {
  // Extract the text, target language, and source language from the form data
  const text = formData.get("text");
  const targetLanguage = formData.get("languageTo");
  const languageFrom = formData.get("languageFrom");

  // Ensure that both target language and source language are specified
  if (!text || !targetLanguage) {
    return { translation: "Invalid input. Please provide text and target language." };
  }

  // Call the translateText function and return the translated text
  const translation = await translateText(text, targetLanguage, languageFrom);
  return { translation };
}

// Function to handle audio transcription
export async function POST(request) {
  // Parse form data to retrieve the audio file
  const formData = await request.formData();
  const audioFile = formData.get("audio");

  // Validate the audio file
  const allowedMimeTypes = ["audio/wav", "audio/mp3"];
  if (!audioFile || !allowedMimeTypes.includes(audioFile.type)) {
    return Response.json({ error: "Invalid audio file type. Please upload a WAV or MP3 file." });
  }

  // Validate file size (e.g., max 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (audioFile.size > MAX_FILE_SIZE) {
    return Response.json({ error: "File is too large. Max file size is 5MB." });
  }

  // Create a new instance of GoogleGenerativeAI
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  
  // Initialize the Generative AI model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    clearContext: true, // Clear context for each transcription request
  });

  try {
    // Generate transcription using the AI model
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: audioFile.type,
          data: audioFile,
          language: formData.get("language") || "en-US", // Dynamic language input
        },
      },
      { text: "Please transcribe the audio." },
    ]);

    // Return the transcription
    return Response.json({ result: result.response.text() });
  } catch (error) {
    // Log and handle errors
    console.error("Transcription error:", error);
    return Response.json({ error: "Transcription failed. Please try again." });
  }
}
