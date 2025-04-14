import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useMode, SHOPPING_MODES } from '../components/ModeSelector/ModeContext';
import { useAuth } from '../hooks/useAuth';

// Create context
const ChatContext = createContext();

// Define message types
export const MESSAGE_TYPES = {
  USER: 'USER',
  AI: 'AI',
  SYSTEM: 'SYSTEM',
  PRODUCT_SUGGESTION: 'PRODUCT_SUGGESTION'
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { currentMode } = useMode();
  const { user } = useAuth || { user: null };

  // Send welcome message based on current mode
  useEffect(() => {
    // Clear chat when mode changes
    setMessages([]);
    
    // Add welcome message based on mode
    let welcomeMessage = '';
    
    switch(currentMode) {
      case SHOPPING_MODES.FULL_AI:
        welcomeMessage = "I'm your AI shopping assistant. Tell me what you're looking for, and I'll find the best products for you and can complete the purchase on your behalf.";
        break;
      case SHOPPING_MODES.MANUAL:
        welcomeMessage = "I'm here if you need me! You're in manual mode, so I'll observe and learn from your shopping behavior to provide better recommendations in the future.";
        break;
      case SHOPPING_MODES.HYBRID:
        welcomeMessage = "Let's shop together! I'll suggest products based on your preferences, and you can provide feedback to help me learn your style better.";
        break;
      default:
        welcomeMessage = "Welcome to Smartlet! How can I assist you today?";
    }
    
    addMessage({
      type: MESSAGE_TYPES.AI,
      content: welcomeMessage,
      timestamp: new Date()
    });
    
  }, [currentMode]);

  // Add a message to the chat
  const addMessage = useCallback((message) => {
    setMessages(prevMessages => [...prevMessages, {
      id: Date.now().toString(),
      ...message
    }]);
  }, []);

  // Send a message to the AI
  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    addMessage({
      type: MESSAGE_TYPES.USER,
      content,
      timestamp: new Date()
    });
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call your AI service
      // Here we're simulating a response
      setTimeout(() => {
        // Simulate AI response
        let response;
        
        switch(currentMode) {
          case SHOPPING_MODES.FULL_AI:
            response = "I've found some great options based on your request. Would you like me to proceed with the purchase?";
            break;
          case SHOPPING_MODES.HYBRID:
            response = "Here are some suggestions based on what you're looking for. Let me know if any of these match your preferences.";
            break;
          default:
            response = "I've noted your preferences. You can continue browsing our catalog.";
        }
        
        addMessage({
          type: MESSAGE_TYPES.AI,
          content: response,
          timestamp: new Date()
        });
        
        // If in AI or Hybrid mode, also add a product suggestion
        if (currentMode !== SHOPPING_MODES.MANUAL) {
          addMessage({
            type: MESSAGE_TYPES.PRODUCT_SUGGESTION,
            content: "Product suggestions based on your query",
            products: [
              { id: '1', name: 'Sample Product 1', price: 24.99, image: '/placeholder.jpg' },
              { id: '2', name: 'Sample Product 2', price: 34.99, image: '/placeholder.jpg' }
            ],
            timestamp: new Date()
          });
        }
        
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      addMessage({
        type: MESSAGE_TYPES.SYSTEM,
        content: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      });
      
      setIsLoading(false);
    }
  }, [addMessage, currentMode]);

  // Toggle chat window
  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  // Context value
  const value = {
    messages,
    isLoading,
    isChatOpen,
    sendMessage,
    toggleChat,
    clearChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext;