import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, Chip } from '@mui/material';
import { Lightbulb, TrendingUp, History } from '@mui/icons-material';
import { AuthContext } from './AuthContext';
import { ModeContext } from './ModeContext';

const RecommendationWidget = ({ productId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { mode } = useContext(ModeContext);

  // Fetches personalized recommendations based on user, current product, and shopping mode
  useEffect(() => {
    if (!productId || !user) return;
    
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to your recommendation service
        const response = await mockFetchRecommendations(productId, user.id, mode);
        setRecommendations(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations');
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [productId, user, mode]);

  // Mock recommendation engine - would be replaced with actual API call
  const mockFetchRecommendations = async (productId, userId, currentMode) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Different recommendations based on the selected shopping mode
    if (currentMode === 'full') {
      return [
        { id: 'p1', name: 'Premium Upgrade Option', confidence: 0.94, reason: 'AI selected based on your preferences' },
        { id: 'p2', name: 'Bundle Deal Item', confidence: 0.87, reason: 'Frequently purchased together' },
        { id: 'p3', name: 'Complementary Product', confidence: 0.78, reason: 'Enhances product experience' }
      ];
    } else if (currentMode === 'hybrid') {
      return [
        { id: 'p4', name: 'Similar Alternative', confidence: 0.85, reason: 'Based on your browsing' },
        { id: 'p5', name: 'Popular Addition', confidence: 0.76, reason: 'Trending with customers like you' }
      ];
    } else {
      // Manual mode - still show some passive recommendations
      return [
        { id: 'p6', name: 'People Also Viewed', confidence: 0.72, reason: 'Popular comparison' },
      ];
    }
  };

  // Returns appropriate icon based on recommendation reason
  const getReasonIcon = (reason) => {
    if (reason.includes('preferences') || reason.includes('browsing')) return <Lightbulb fontSize="small" />;
    if (reason.includes('Trending') || reason.includes('Popular')) return <TrendingUp fontSize="small" />;
    return <History fontSize="small" />;
  };

  if (error) {
    return (
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }

  // Don't show empty recommendations
  if (!loading && recommendations.length === 0) return null;

  return (
    <Card variant="outlined" sx={{ mt: 2, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {mode === 'full' ? 'AI Recommendations' : 
           mode === 'hybrid' ? 'Suggested for You' : 
           'You May Also Like'}
        </Typography>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress size={24} />
          </div>
        ) : (
          <Grid container spacing={2}>
            {recommendations.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body1">{item.name}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
                      {getReasonIcon(item.reason)}
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                        {item.reason}
                      </Typography>
                    </div>
                    {mode === 'full' && (
                      <Chip 
                        size="small" 
                        label={`${Math.round(item.confidence * 100)}% match`}
                        color={item.confidence > 0.9 ? 'success' : 'primary'}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        
        <Button 
          size="small" 
          sx={{ mt: 2 }}
          disabled={loading}
          onClick={() => setRecommendations(prev => [...prev.sort(() => Math.random() - 0.5)])}
        >
          Refresh Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendationWidget;