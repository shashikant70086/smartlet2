import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Avatar, 
  TextField, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage = () => {
  // Dummy user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    phone: '555-123-4567'
  };
  
  // Dummy order history
  const orders = [
    { id: 'ORD-001', date: '2025-04-10', status: 'Delivered', total: 249.98 },
    { id: 'ORD-002', date: '2025-03-25', status: 'Shipped', total: 79.99 },
    { id: 'ORD-003', date: '2025-03-12', status: 'Delivered', total: 129.97 }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar 
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              
              <Button variant="outlined" sx={{ mt: 2 }}>
                Change Avatar
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    defaultValue={user.name}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue={user.email}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    defaultValue={user.phone}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    defaultValue={user.address}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary">
                  Save Changes
                </Button>
              </Box>
              
              <Divider sx={{ my: 4 }} />
              
              <Typography variant="h6" gutterBottom>
                Order History
              </Typography>
              
              <List>
                {orders.map((order) => (
                  <Paper key={order.id} sx={{ mb: 2 }}>
                    <ListItem>
                      <ListItemText
                        primary={`Order ${order.id}`}
                        secondary={`Date: ${order.date} | Status: ${order.status}`}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ textAlign: 'right' }}>
                          ${order.total.toFixed(2)}
                        </Typography>
                        <Button size="small">View Details</Button>
                      </Box>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;