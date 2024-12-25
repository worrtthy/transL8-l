"use server"; // Marks this file as a server-side file, ensuring server-side logic execution

import { GoogleGenerativeAI } from "@google/generative-ai"; // Imports the GoogleGenerativeAI library to interact with Google's AI models

// Function to handle text translation using Google's Generative AI model
async function translateText(text, targetLanguage, languageFrom = "") {
  // Creates a new instance of GoogleGenerativeAI with the API key stored in environment variables
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  // Initializes the Generative AI model ('gemini-1.5-flash' model used for translation)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Constructs the prompt based on whether a source language is provided
  const prompt = languageFrom
    ? `Translate the following text from ${languageFrom} to ${targetLanguage} : ${text}`
    : `Detect the language of the text and translate it into ${targetLanguage} : ${text}`;
    
  // Additional prompt instructions to ensure only the translation is returned
  const additional_prompt =
    "Just return the translated text. Do not add additional descriptions such as `Here are the translations`";

  try {
    // Sends the request to the AI model with the constructed prompt
    const result = await model.generateContent(prompt + additional_prompt);
    // Logs the response from the AI model and returns the translated text
    console.log(result.response.text());
    return result.response.text();
  } catch (e) {
    // Logs any errors that occur during the request process
    console.log(e);
  }
  
  // Returns a default message if translation fails or an error occurs
  return "couldn't load translations";
}

// Function to handle the translation process when called from the form submission
export async function translate(formData) {
  // Extracts the text, target language, and source language from the form data
  const text = formData.get("text");
  const targetLanguage = formData.get("languageTo");
  const languageFrom = formData.get("languageFrom");

  // Calls the translateText function to get the translated text
  const translation = await translateText(text, targetLanguage, languageFrom);

  // Returns the translated text as part of the response
  return { translation };
}
