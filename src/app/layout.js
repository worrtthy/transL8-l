import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Outfit } from "next/font/google";  // Importing Outfit font from Google Fonts
import "./globals.css";
import { Header } from "@/app/components/header";
import Head from "next/head"; // Import Head for meta tags

// Import Outfit font with the desired weights
const outfit = Outfit({
  weight: ["100", "300", "400", "500", "700", "900"],  // Adding multiple weights for flexibility
  subsets: ["latin"],  // Including the Latin subset
});

export const metadata = {
  title: "Transl8 - Language Translation App",
  description:
    "Transl8 is an innovative language translation app designed to bridge communication gaps. Developed by Group 10 for the CMP409 project, it supports languages like English, French, Spanish, and more. Ideal for diverse language needs, it leverages cutting-edge AI technology for seamless translation.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={`${outfit.className} antialiased bg-gray-100`}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
