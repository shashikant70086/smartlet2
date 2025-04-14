import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Pagination, 
  FormControl, 
  InputLabel, 
  Select,
  MenuItem,
  Skeleton,
  Alert,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import ProductCard from './ProductCard';
import { useMode, SHOPPING_MODES } from '../ModeSelector/ModeContext';

const ProductGrid = ({ 
  title = "Products", 
  products = [], 
  loading = false, 
  error = null,
  onAddToCart 
}) => {
  const { currentMode } = useMode();
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  // Sort products based on sort option
  const sortedProducts = React.useMemo(() => {
    if (!products.length) return [];
    
    let sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'recommended':
      default:
        // If in AI or Hybrid mode, sort by AI recommended first
        if (currentMode !== SHOPPING_MODES.MANUAL) {
          return sorted.sort((a, b) => (b.aiRecommended ? 1 : 0) - (a.aiRecommended ? 1 : 0));
        }
        return sorted; // Default sorting in manual mode
    }
  }, [products, sortBy, currentMode]);
  
  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  
  // Reset to first page when sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);
  
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  
  // Helper for showing loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
        <Box sx={{ height: '100%' }}>
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="text" sx={{ mt: 1 }} />
          <Skeleton variant="text" width="60%" />
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Skeleton variant="text" width="40%" sx={{ mr: 1 }} />
            <Skeleton variant="text" width="20%" />
          </Box>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <Skeleton variant="rectangular" height={36} width="75%" sx={{ mr: 1 }} />
            <Skeleton variant="circular" width={36} height={36} />
          </Box>
        </Box>
      </Grid>
    ));
  };
  
  return (
    <Box sx={{ mb: 4 }}>
      {/* Header with title and sorting */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" gutterBottom={false}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {loading ? 'Loading products...' : `${products.length} products available`}
          </Typography>
        </Box>
        
        {/* Mode indicator */}
        {currentMode !== SHOPPING_MODES.MANUAL && (
          <Chip 
            label={currentMode === SHOPPING_MODES.FULL_AI ? "AI Shopping" : "Co-Shopping"} 
            color="primary" 
            variant="outlined"
            size="small"
          />
        )}
        
        {/* Sort options */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortBy}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="recommended">Recommended</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
            <MenuItem value="newest">Newest Arrivals</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Error state */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Product grid */}
      <Grid container spacing={3}>
        {loading ? (
          renderSkeletons()
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">
                No products found. Try different filters or check back later.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handleChangePage}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGrid;