"use client";  // Indicating this component runs on the client-side (next.js 13+)

// Dropdown component for rendering a select input with options
export const Dropdown = ({ name, value, onChange, options }) => {
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
