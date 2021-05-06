import React, { memo } from 'react';
import DashboardLayout from '../Dashboard';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
const Admin = () => {
  return (
    <ThemeProvider theme={theme}>
        <div>
          <DashboardLayout />
        </div>
    </ThemeProvider>
  );
};

export default memo(Admin);
