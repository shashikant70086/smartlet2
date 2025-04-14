import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { useMode, SHOPPING_MODES } from '../ModeSelector/ModeContext';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { cart, toggleCart } = useCart();
  const { currentMode } = useMode();

  // Get the number of items in cart
  const cartItemCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Smartlet
          </Typography>
          
          {/* Mode indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Mode:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {currentMode === SHOPPING_MODES.MANUAL && "Manual"}
              {currentMode === SHOPPING_MODES.HYBRID && "Hybrid"}
              {currentMode === SHOPPING_MODES.FULL_AI && "Full AI"}
            </Typography>
          </Box>
          
          {/* Navigation Links */}
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          
          {/* Cart Button */}
          <Button color="inherit" onClick={toggleCart}>
            Cart ({cartItemCount})
          </Button>
          
          {/* Auth Buttons */}
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/profile">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Container sx={{ mt: 4, mb: 4 }}>
        {/* Main content */}
        {children}
      </Container>
      
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, px: 2, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} Smartlet. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Smart shopping made simple
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default MainLayout;