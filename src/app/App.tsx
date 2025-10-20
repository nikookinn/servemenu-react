import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { store } from './store';
import { theme } from './theme';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            // Mobile scroll optimizations
            '*': {
              WebkitOverflowScrolling: 'touch',
            },
            'html': {
              // Enable smooth scrolling
              scrollBehavior: 'smooth',
              // Optimize for mobile
              WebkitTextSizeAdjust: '100%',
              WebkitTapHighlightColor: 'transparent',
            },
            'body': {
              // Prevent horizontal scroll
              overflowX: 'hidden',
              // Enable momentum scrolling on iOS
              WebkitOverflowScrolling: 'touch',
              // Remove transform that breaks fixed positioning
              // transform: 'translateZ(0)', // ← Bu satır fixed position'ları bozuyor!
            },
            // Optimize touch interactions
            'button, a': {
              WebkitTapHighlightColor: 'transparent',
            },
          }}
        />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
