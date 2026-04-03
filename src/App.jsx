import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import KanbanBoard from './components/KanbanBoard';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <KanbanBoard />
    </QueryClientProvider>
  );
}

export default App;
