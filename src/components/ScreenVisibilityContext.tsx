import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the screen visibility state
type ScreenVisibilityState = { [key: string]: boolean };

// Define the context type
interface ScreenVisibilityContextType {
  screenVisibility: ScreenVisibilityState;
  handleScreen: (screen: string) => void;
}

// Create the context
const ScreenVisibilityContext = createContext<ScreenVisibilityContextType | undefined>(undefined);

// Create the provider component
export const ScreenVisibilityProvider = ({ children }: { children: ReactNode }) => {
  // Define the screen visibility state with dynamic keys
  const [screenVisibility, setScreenVisibility] = useState<ScreenVisibilityState>({
    splash: true,  // SplashPage is visible by default
    main: false,  // LoginPage is not visible by default
    chapter_1: false,
    chapter_2: false,
    // Add other screens as needed...
  });

  // Function to handle the screen change when a button is clicked
  const handleScreen = (screen: string) => {
    setScreenVisibility((prevState) => {
      const updatedVisibility: ScreenVisibilityState = {};
      // Set visibility to show only the passed screen and hide others
      for (const key in prevState) {
        updatedVisibility[key] = false;
      }
      updatedVisibility[screen] = true;
      return updatedVisibility;
    });
  };

  return (
    <ScreenVisibilityContext.Provider value={{ screenVisibility, handleScreen }}>
      {children}
    </ScreenVisibilityContext.Provider>
  );
};

// Custom hook to access the context
export const useScreenVisibility = (): ScreenVisibilityContextType => {
  const context = useContext(ScreenVisibilityContext);
  if (!context) {
    throw new Error('useScreenVisibility must be used within a ScreenVisibilityProvider');
  }
  return context;
};
