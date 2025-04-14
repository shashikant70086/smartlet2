import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Grid, Card, CardMedia, Button, Divider, Rating } from '@mui/material';

// Dummy product data
const products = {
  1: { 
    id: 1, 
    name: 'Smart Thermostat', 
    price: 99.99, 
    image: '/placeholder-image.jpg',
    description: 'Control your home temperature from anywhere with our smart thermostat. Compatible with most HVAC systems and smart home assistants.',
    rating: 4.5,
    reviews: 128
  },
  2: { 
    id: 2, 
    name: 'Smart Light Bulb', 
    price: 29.99, 
    image: '/placeholder-image.jpg',
    description: 'Adjust lighting brightness and color from your smartphone. Energy efficient and long-lasting.',
    rating: 4.2,
    reviews: 85
  },
  3: { 
    id: 3, 
    name: 'Security Camera', 
    price: 149.99, 
    image: '/placeholder-image.jpg',
    description: 'HD video recording with night vision capability. Get motion alerts directly to your phone.',
    rating: 4.8,
    reviews: 210
  },
  4: { 
    id: 4, 
    name: 'Smart Lock', 
    price: 199.99, 
    image: '/placeholder-image.jpg',
    description: 'Keyless entry for your home. Lock and unlock your door remotely and track access history.',
    rating: 4.6,
    reviews: 156
  },
  5: { 
    id: 5, 
    name: 'Smart Speaker', 
    price: 79.99, 
    image: '/placeholder-image.jpg',
    description: 'Voice-controlled speaker with premium sound. Ask questions, play music, and control your smart home.',
    rating: 4.4,
    reviews: 194
  },
  6: { 
    id: 6, 
    name: 'Motion Sensor', 
    price: 39.99, 
    image: '/placeholder-image.jpg',
    description: 'Detect movement in your home and trigger automations. Battery powered and easy to install.',
    rating: 4.1,
    reviews: 72
  }
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products[id] || { name: 'Product Not Found', price: 0, description: '', rating: 0, reviews: 0 };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
                sx={{ backgroundColor: '#e0e0e0' }}
              />
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.reviews} reviews)
              </Typography>
            </Box>
            
            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${product.price.toFixed(2)}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
              Add to Cart
            </Button>
            
            <Button variant="outlined" color="primary" size="large">
              Add to Wishlist
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;