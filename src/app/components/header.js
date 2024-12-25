import Image from "next/image";  // Importing Image from Next.js for optimized image handling
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";  // Importing Clerk components for user sign-in/sign-up and user button functionality
import { MenuBtn } from "./menu-btn";  // Importing the MenuBtn component for a menu button (likely for mobile or dropdown navigation)

// Header component for the site's navigation bar
export const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white/20 backdrop-blur-sm">
      {/* Main header container with sticky positioning, background blur effect, and transition on scroll */}
      <div className="w-full max-w-screen-xl px-2 5 lg:px-20 relative mx-auto border-b">
        {/* Container for header content with padding, centered layout, and border at the bottom */}
        <div className="flex h-14 items-center justify-between">
          {/* Flexbox container for horizontal layout with space between items */}
          <Image 
            src="/logo.png"  // Path to the logo image (ensure logo.png is placed in the public folder)
            alt="Transl8 Logo"  // Alt text for the logo image
            width={110}  // Specify width of the logo
            height={110}  // Specify height of the logo
          />
          {/* Displaying the logo image instead of the Globe icon */}
          <SignedOut>
            {/* Displayed when the user is not signed in */}
            <SignInButton>
              {/* Button to trigger sign-in/sign-up when the user is not signed in */}
              <button className="bg-blue-900 text-white px-2 py-2 rounded-md">Sign In/Sign Up</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {/* Displayed when the user is signed in */}
            <div className="flex">
              {/* Flexbox container for signed-in user actions */}
              <MenuBtn />  {/* Menu button for additional options or navigation */}
              <UserButton />  {/* Button to display user-related options like profile settings */}
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
