"use client";  // Indicating this component runs on the client-side (next.js 13+)

import { useState, useEffect } from "react";  // Import hooks for state and effects

// Dropdown component for rendering a select input with options
export const Dropdown = ({ name, value, onChange, options }) => {
  const [isClient, setIsClient] = useState(false);  // State to check if component is rendered on the client-side

  useEffect(() => {
    setIsClient(true);  // Set state to true when component is rendered on the client-side
  }, []);

  if (!isClient) {
    return null;  // Return nothing during server-side render to prevent hydration error
  }

  return (
    <select
      name={name}  // The name attribute used to identify the select element
      className="rounded-md border-input border bg-background px-3 py-2 focus:ring-blue-200 mb-2 w-fit"  // TailwindCSS classes for styling the dropdown
      value={value}  // The current selected value of the dropdown
      onChange={(e) => onChange(e.target.value)}  // Function to handle value change when a new option is selected
    >
      {/* Loop through options and render each as an option element */}
      {options.map((option, index) => (
        <option
          key={`${name}_${index}`}  // Unique key for each option, combining name and index for uniqueness
          value={option.value}  // The value of the option, to be submitted in a form or processed on change
        >
          {option.label}  {/* Display the label for the option */}
        </option>
      ))}
    </select>
  );
};
