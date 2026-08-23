import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import KanbanBoard from './components/KanbanBoard';
import theme from './theme';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <KanbanBoard />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
