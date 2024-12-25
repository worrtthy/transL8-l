"use server"; // Marks this file as a server-side file, ensuring server-side logic execution

import { GoogleGenerativeAI } from "@google/generative-ai"; // Importing the GoogleGenerativeAI library

// Function to handle text translation using Google's Generative AI model
async function translateText(text, targetLanguage, languageFrom = "") {
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

  try {
    // Send the request to the AI model with the constructed prompt
    const result = await model.generateContent(prompt + additionalPrompt);
    
    // Log the response and return the translated text
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    // Log and handle errors
    console.log(error);
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
          mimeType: "audio/wav",
          data: audioFile,
          language: "en-US", // Specify the language of the audio
        },
      },
      { text: "Please transcribe the audio in English." },
    ]);

    // Log and return the transcription
    console.log(result.response.text());
    return Response.json({ result: result.response.text() });
  } catch (error) {
    // Log and handle errors
    console.error(error);
    return Response.json({ error: "Transcription failed. Please try again." });
  }
}
