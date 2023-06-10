import React, { memo } from 'react';
import DashboardLayout from '../Dashboard';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from '../styles/theme';
const Admin = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div>
          <DashboardLayout />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default memo(Admin);
