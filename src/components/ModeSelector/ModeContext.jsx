import React, { createContext, useState, useContext, useEffect } from 'react';

// Define shopping modes constants
export const SHOPPING_MODES = {
  MANUAL: 'MANUAL',
  HYBRID: 'HYBRID',
  FULL_AI: 'FULL_AI'
};

// Create context
const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  // Default to HYBRID mode, or get from localStorage
  const [currentMode, setCurrentMode] = useState(() => {
    const savedMode = localStorage.getItem('shopping_mode');
    return savedMode ? savedMode : SHOPPING_MODES.HYBRID;
  });

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('shopping_mode', currentMode);
  }, [currentMode]);

  // Change mode
  const changeMode = (mode) => {
    if (Object.values(SHOPPING_MODES).includes(mode)) {
      setCurrentMode(mode);
    } else {
      console.error(`Invalid mode: ${mode}`);
    }
  };

  // Get mode description
  const getModeDescription = () => {
    switch (currentMode) {
      case SHOPPING_MODES.MANUAL:
        return "Manual Mode: Browse and shop on your own. The AI assistant won't intervene unless requested.";
      case SHOPPING_MODES.HYBRID:
        return "Hybrid Mode: The AI will provide suggestions, but you maintain full control over selection and purchasing.";
      case SHOPPING_MODES.FULL_AI:
        return "Full AI Mode: The AI assistant will actively guide your shopping experience and can complete purchases on your behalf.";
      default:
        return "Select a shopping mode to personalize your experience.";
    }
  };

  // Context value
  const value = {
    currentMode,
    changeMode,
    getModeDescription,
    SHOPPING_MODES
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
};

// Custom hook to use the mode context
export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};

export default ModeContext;