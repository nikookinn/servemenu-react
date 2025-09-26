import React from 'react';
import { Box } from '@mui/material';
import QRMenuInterface from './QRMenuInterface';

const IPhone3D: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '500px', sm: '550px', md: '600px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        px: { xs: 2, sm: 0 },
      }}
    >
      {/* iPhone Frame */}
      <Box
        sx={{
          width: { xs: '280px', sm: '320px', md: '340px' },
          height: { xs: '560px', sm: '640px', md: '680px' },
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          borderRadius: '50px',
          padding: '8px',
          position: 'relative',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 0 2px rgba(0, 0, 0, 0.8),
            0 30px 60px rgba(0, 0, 0, 0.8),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.5)
          `,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '4px',
            left: '4px',
            right: '4px',
            bottom: '4px',
            borderRadius: '46px',
            background: 'linear-gradient(145deg, #333 0%, #1a1a1a 100%)',
            zIndex: -1,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Screen */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            borderRadius: '42px',
            overflow: 'hidden',
            position: 'relative',
            border: '2px solid #000',
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
            zIndex: 1,
          }}
        >
          {/* Dynamic Island */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '10px', sm: '12px' },
              left: '50%',
              transform: 'translateX(-50%)',
              width: { xs: '110px', sm: '126px' },
              height: { xs: '32px', sm: '37px' },
              backgroundColor: '#000',
              borderRadius: { xs: '16px', sm: '19px' },
              zIndex: 10,
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.8)',
              border: '1px solid #333',
              pointerEvents: 'none',
            }}
          />

          {/* Side Buttons */}
          <Box
            sx={{
              position: 'absolute',
              left: '-4px',
              top: '120px',
              width: '4px',
              height: '32px',
              backgroundColor: '#2a2a2a',
              borderRadius: '2px 0 0 2px',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: '-4px',
              top: '170px',
              width: '4px',
              height: '60px',
              backgroundColor: '#2a2a2a',
              borderRadius: '2px 0 0 2px',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              left: '-4px',
              top: '240px',
              width: '4px',
              height: '60px',
              backgroundColor: '#2a2a2a',
              borderRadius: '2px 0 0 2px',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: '-4px',
              top: '180px',
              width: '4px',
              height: '80px',
              backgroundColor: '#2a2a2a',
              borderRadius: '0 2px 2px 0',
              pointerEvents: 'none',
            }}
          />

          {/* iPhone Screen Content */}
          <QRMenuInterface />
        </Box>
      </Box>
    </Box>
  );
};

export default IPhone3D;
