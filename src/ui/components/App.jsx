import './app.css';
import React from 'react';
import Admin from './Admin';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  HashRouter,
} from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <div className={'app'}>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <Admin />
        </QueryClientProvider>
      </HashRouter>
    </div>
  );
}

export default App;
