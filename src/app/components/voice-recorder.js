"use client"; // Ensures the code is executed on the client side

import { useState, useRef, useEffect } from "react"; // Import necessary hooks
import { Mic, Square } from "lucide-react"; // Import icons for mic and square button

export default function VoiceRecorder({ handleSetText }) {
  // State to track if recording is ongoing
  const [isRecording, setIsRecording] = useState(false);
  
  // State to store the base64 encoded audio data after recording
  const [audioBase64, setAudioBase64] = useState(null);

  // Refs to hold the media recorder instance and the audio chunks
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // State to track if the component has been mounted to avoid hydration issues
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure code only runs on the client side
  }, []);

  if (!isClient) {
    return null; // Return nothing during SSR to prevent hydration mismatch
  }

  // Start recording function that accesses the user's microphone
  const startRecording = async () => {
    try {
      // Request permission to access the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize the MediaRecorder to record the audio stream
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Collect audio data as chunks when available
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data); // Store chunks in a ref
        }
      };

      // Once the recording stops, process the audio data
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/wav" }); // Create a Blob from chunks
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob); // Convert the Blob to base64
        reader.onloadend = async () => {
          const base64Audio = reader.result;
          setAudioBase64(base64Audio.split(",")[1]); // Save the base64 audio string
          
          // Prepare the audio data to be uploaded to the server
          const formData = new FormData();
          formData.append("audio", base64Audio.split(",")[1]);

          // Send the audio to an API for transcription
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();
          console.log("Audio uploaded successfully", result);
          
          // Pass the transcribed text to the parent component
          handleSetText(result.result);
        };
        chunksRef.current = []; // Reset the chunks after processing
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true); // Set the state to indicate that recording is in progress
    } catch (error) {
      console.error("Error accessing microphone", error); // Log an error if microphone access fails
    }
  };

  // Stop the recording
  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop(); // Stop the media recorder
      setIsRecording(false); // Update the state to reflect that recording has stopped
    }
  };

  // Toggle between starting and stopping the recording
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording if it's already in progress
      stopRecording();
    } else {
      // Start recording if it's not currently recording
      startRecording();
    }
  };

  return (
    <div className="flex items-center p-4">
      {/* Button to start/stop recording */}
      <button
        type="button"
        onClick={toggleRecording}
        className={`w-12 h-12 rounded-full border flex items-center justify-center ${
          isRecording ? "bg-red-500 text-white" : "" // Change button style based on recording state
        }`}
      >
        {/* Display either Mic or Square icon based on recording state */}
        {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>
      
      {/* Hidden input field to store the base64 encoded audio data */}
      <input
        type="hidden"
        name="audio"
        value={audioBase64 || ""} // Set the audio data if available
        aria-label="Recorded audio"
      />
    </div>
  );
}
