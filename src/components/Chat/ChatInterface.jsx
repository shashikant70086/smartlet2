import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Fab, 
  Slide, 
  Divider,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Stack,
  Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useChat, MESSAGE_TYPES } from '../../context/ChatContext';
import { useMode, SHOPPING_MODES } from '../ModeSelector/ModeContext';

const ChatInterface = () => {
  const { messages, isLoading, isChatOpen, sendMessage, toggleChat } = useChat();
  const { currentMode } = useMode();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
// Move the export statement to the bottom of the file



  // Chat toggle button that shows on mobile/tablet
  const ChatToggleButton = () => (
    <Fab 
      color="primary" 
      aria-label="chat"
      onClick={toggleChat}
      sx={{ 
        position: 'fixed', 
        bottom: 16, 
        right: 16,
        zIndex: 1000
      }}
    >
      {isChatOpen ? <CloseIcon /> : <ChatIcon />}
    </Fab>
  );

  return (
    <>
      {/* Mobile chat toggle button */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <ChatToggleButton />
      </Box>

      {/* Chat panel */}
      <Slide direction="up" in={isChatOpen} mountOnEnter unmountOnExit
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '100%',
            height: '80vh',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            overflow: 'hidden'
          }}
        >
          <ChatContent 
            messages={messages} 
            isLoading={isLoading}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
            currentMode={currentMode}
          />
        </Paper>
      </Slide>

      {/* Desktop chat panel */}
      <Paper
        elevation={3}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          height: '100%',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <ChatContent 
          messages={messages} 
          isLoading={isLoading}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          currentMode={currentMode}
        />
      </Paper>
    </>
  );
};

// Chat content component (shared between mobile and desktop)
const ChatContent = ({ messages, isLoading, inputValue, setInputValue, handleSendMessage, messagesEndRef, currentMode }) => {
  return (
    <>
      {/* Chat header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyOutlinedIcon />
          <Typography variant="h6">Smartlet Assistant</Typography>
        </Box>
        <Typography variant="caption">
          {currentMode === SHOPPING_MODES.FULL_AI ? 'Full AI Mode' : 
           currentMode === SHOPPING_MODES.HYBRID ? 'Hybrid Mode' : 'Manual Mode'}
        </Typography>
      </Box>
      
      <Divider />
      
      {/* Messages area */}
      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflow: 'auto',
          bgcolor: 'grey.50'
        }}
      >
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <Box sx={{ display: 'flex', m: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </Box>
      
      <Divider />
      
      {/* Input area */}
      <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <form onSubmit={handleSendMessage}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <IconButton 
              color="primary" 
              type="submit" 
              disabled={!inputValue.trim() || isLoading}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
      </Box>
    </>
  );
};

// Component for individual messages
const ChatMessage = ({ message }) => {
  const isAI = message.type === MESSAGE_TYPES.AI;
  const isUser = message.type === MESSAGE_TYPES.USER;
  const isSystem = message.type === MESSAGE_TYPES.SYSTEM;
  const isProductSuggestion = message.type === MESSAGE_TYPES.PRODUCT_SUGGESTION;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        maxWidth: '100%'
      }}
    >
      {/* Message bubble */}
      {!isProductSuggestion && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            maxWidth: '80%'
          }}
        >
          {/* Avatar for AI or System messages */}
          {(isAI || isSystem) && (
            <Avatar 
              sx={{ 
                bgcolor: isAI ? 'primary.main' : 'grey.500',
                width: 32,
                height: 32
              }}
            >
              <SmartToyOutlinedIcon fontSize="small" />
            </Avatar>
          )}

          {/* Message content */}
          <Paper
            elevation={1}
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: isUser ? 'primary.main' : isSystem ? 'grey.200' : 'background.paper',
              color: isUser ? 'white' : 'text.primary',
              borderTopRightRadius: isUser ? 0 : 2,
              borderTopLeftRadius: isUser ? 2 : 0,
              maxWidth: '100%',
              wordBreak: 'break-word',
              border: isAI ? '1px solid' : 'none',
              borderColor: 'divider'
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
          </Paper>

          {/* Avatar for User messages */}
          {isUser && (
            <Avatar 
              sx={{ 
                bgcolor: 'secondary.main',
                width: 32,
                height: 32
              }}
            >
              <PersonOutlineOutlinedIcon fontSize="small" />
            </Avatar>
          )}
        </Box>
      )}

      {/* Product suggestion grid */}
      {isProductSuggestion && message.products && (
        <Box sx={{ width: '100%', mt: 1, mb: 1 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}
          >
            {message.content}
          </Typography>
          <Grid container spacing={1}>
            {message.products.map(product => (
              <Grid item xs={6} key={product.id}>
                <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={product.image || "/placeholder.jpg"}
                    alt={product.name}
                    sx={{ objectFit: 'contain', bgcolor: 'grey.100' }}
                  />
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="body2" noWrap>{product.name}</Typography>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      fullWidth 
                      sx={{ mt: 1, fontSize: '0.7rem' }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Timestamp */}
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ mt: 0.5, fontSize: '0.7rem' }}
      >
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Typography>
    </Box>
  );
};

export default ChatInterface;