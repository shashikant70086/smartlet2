import React from 'react';
import { Box, Typography, Container, Grid, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// Dummy product data
const products = [
  { id: 1, name: 'Smart Thermostat', price: 99.99, image: '/placeholder-image.jpg' },
  { id: 2, name: 'Smart Light Bulb', price: 29.99, image: '/placeholder-image.jpg' },
  { id: 3, name: 'Security Camera', price: 149.99, image: '/placeholder-image.jpg' },
  { id: 4, name: 'Smart Lock', price: 199.99, image: '/placeholder-image.jpg' },
  { id: 5, name: 'Smart Speaker', price: 79.99, image: '/placeholder-image.jpg' },
  { id: 6, name: 'Motion Sensor', price: 39.99, image: '/placeholder-image.jpg' },
];

const ProductsPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{ backgroundColor: '#e0e0e0' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/product/${product.id}`}>
                    View Details
                  </Button>
                  <Button size="small">Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductsPage;