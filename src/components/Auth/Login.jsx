import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Divider,
  Alert,
  CircularProgress,
  Container,
  Paper
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { signInWithGoogle, loading, error } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Redirect will happen automatically since we're using Firebase Auth
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Header */}
        <Box 
          sx={{ 
            backgroundColor: 'primary.main', 
            color: 'white',
            p: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Smartlet
          </Typography>
          <Typography variant="subtitle1">
            The AI-Powered Adaptive Shopping Assistant
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Error message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
            Sign in to access personalized AI shopping assistance tailored to your preferences.
          </Typography>

          {/* Sign in button */}
          <Button
            variant="contained"
            fullWidth
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{ 
              py: 1.5,
              mb: 2,
              backgroundColor: '#4285F4',
              '&:hover': {
                backgroundColor: '#3367D6'
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign in with Google'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Guest access */}
          <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
            Want to try Smartlet without signing in?
          </Typography>
          
          <Button 
            variant="outlined" 
            fullWidth
            sx={{ py: 1.5 }}
          >
            Continue as Guest
          </Button>
        </CardContent>

        <Box sx={{ bgcolor: 'grey.100', p: 2, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Box>
      </Paper>

      {/* Features overview */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          Experience AI-Powered Shopping
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3
          }}
        >
          <FeatureCard 
            title="Full AI Purchase" 
            description="Let our AI handle your shopping based on your preferences and budget."
          />
          <FeatureCard 
            title="Manual Browsing" 
            description="Browse products normally while our AI learns from your preferences."
          />
          <FeatureCard 
            title="Hybrid Co-Shopping" 
            description="Collaborate with AI to find the perfect products together."
          />
        </Box>
      </Box>
    </Container>
  );
};

// Feature card component
const FeatureCard = ({ title, description }) => (
  <Card variant="outlined" sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default Login;