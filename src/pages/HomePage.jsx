import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to SmartLet
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/placeholder-image.jpg"
                alt="Featured product"
                sx={{ backgroundColor: '#e0e0e0' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Featured Products
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover our bestselling smart home devices
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/placeholder-image.jpg"
                alt="Smart Home"
                sx={{ backgroundColor: '#e0e0e0' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Smart Home Solutions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transform your home with our intelligent devices
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="/placeholder-image.jpg"
                alt="Support"
                sx={{ backgroundColor: '#e0e0e0' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our team is always here to help you
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;