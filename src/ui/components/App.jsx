import React from 'react';
import { HashRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './styles/theme';
import './app.css';

//import DashboardLayout from './Dashboard';
//import Admin from './Admin';

import Layout from './Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <div className={'app'}>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <Layout />
            </ThemeProvider>
          </StyledEngineProvider>
        </QueryClientProvider>
      </HashRouter>
    </div>
  );
}

export default App;




