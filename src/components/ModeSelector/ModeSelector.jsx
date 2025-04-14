import React from 'react';
import { useMode, SHOPPING_MODES } from './ModeContext';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  ToggleButtonGroup, 
  ToggleButton, 
  Tooltip,
  Stack
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

const ModeSelector = () => {
  const { currentMode, changeMode, getCurrentModeDescription } = useMode();

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      changeMode(newMode);
    }
  };

  return (
    <Card elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Shopping Mode
        </Typography>
        
        <Stack spacing={2}>
          <ToggleButtonGroup
            value={currentMode}
            exclusive
            onChange={handleModeChange}
            aria-label="shopping mode"
            fullWidth
            sx={{ mb: 2 }}
          >
            <Tooltip title="AI shops and checks out for you" arrow>
              <ToggleButton 
                value={SHOPPING_MODES.FULL_AI} 
                aria-label="full ai mode"
                sx={{ 
                  py: 1,
                  '&.Mui-selected': { 
                    backgroundColor: 'primary.main', 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <SmartToyIcon sx={{ mb: 0.5 }} />
                  <Typography variant="body2">Full AI</Typography>
                </Box>
              </ToggleButton>
            </Tooltip>
            
            <Tooltip title="You browse, AI learns passively" arrow>
              <ToggleButton 
                value={SHOPPING_MODES.MANUAL} 
                aria-label="manual mode"
                sx={{ 
                  py: 1, 
                  '&.Mui-selected': { 
                    backgroundColor: 'primary.main', 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <PersonIcon sx={{ mb: 0.5 }} />
                  <Typography variant="body2">Manual</Typography>
                </Box>
              </ToggleButton>
            </Tooltip>
            
            <Tooltip title="You and AI shop together" arrow>
              <ToggleButton 
                value={SHOPPING_MODES.HYBRID} 
                aria-label="hybrid mode"
                sx={{ 
                  py: 1,
                  '&.Mui-selected': { 
                    backgroundColor: 'primary.main', 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <GroupsIcon sx={{ mb: 0.5 }} />
                  <Typography variant="body2">Hybrid</Typography>
                </Box>
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
          
          <Box 
            sx={{ 
              p: 1.5, 
              backgroundColor: 'background.paper', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {getCurrentModeDescription()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ModeSelector;