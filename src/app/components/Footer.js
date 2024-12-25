// Import necessary packages
import React from "react";

// Footer Component
const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#f1f1f1", color: "black" }}
      className="text-center py-4"
    >
      <p>
        Made with love by{" "}
        <a
          href="https://docs.google.com/document/d/1g9iv1Fy13sT9EWjfchvsM5QA92fUebaamIh8-4yE11E/edit?usp=sharing" // Replace with your actual Google Docs link
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Group 10; 
        </a>
         All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
