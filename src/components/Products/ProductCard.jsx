import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  Typography, 
  Button, 
  Rating,
  Chip,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useMode, SHOPPING_MODES } from '../ModeSelector/ModeContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { currentMode } = useMode();
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  // Handle AI recommendation feedback for this product (in Hybrid mode)
  const showAIRecommendation = currentMode === SHOPPING_MODES.HYBRID || currentMode === SHOPPING_MODES.FULL_AI;
  
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      {/* AI recommendation badge (only in Hybrid mode) */}
      {showAIRecommendation && product.aiRecommended && (
        <Chip
          label="AI Recommended"
          size="small"
          color="primary"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1
          }}
        />
      )}

      {/* Discount tag */}
      {product.discount > 0 && (
        <Chip
          label={`-${product.discount}%`}
          size="small"
          color="error"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1
          }}
        />
      )}
      
      {/* Product image */}
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image || '/placeholder.jpg'}
          alt={product.name}
          sx={{ 
            objectFit: 'contain',
            bgcolor: 'grey.100',
            p: 2
          }}
        />
      </Link>
      
      {/* Product content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="subtitle1" 
          component={Link}
          to={`/products/${product.id}`}
          sx={{ 
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.2,
            height: '2.4em',
            '&:hover': {
              color: 'primary.main'
            }
          }}
        >
          {product.name}
        </Typography>
        
        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Rating 
            value={product.rating} 
            precision={0.5} 
            size="small" 
            readOnly 
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount})
          </Typography>
        </Box>
        
        {/* Price */}
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            color="primary.main" 
            sx={{ fontWeight: 'bold' }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          
          {product.discount > 0 && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                ml: 1, 
                textDecoration: 'line-through' 
              }}
            >
              ${(product.price * (100 + product.discount) / 100).toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>
      
      {/* Actions */}
      <CardActions sx={{ justifyContent: 'space-between', pb: 2, px: 2 }}>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<ShoppingCartIcon />}
          onClick={() => onAddToCart(product)}
          fullWidth
          sx={{ mr: 1 }}
        >
          Add to Cart
        </Button>
        
        <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
          <IconButton 
            onClick={handleFavoriteToggle}
            color={isFavorite ? "error" : "default"}
            size="small"
            sx={{ 
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProductCard;