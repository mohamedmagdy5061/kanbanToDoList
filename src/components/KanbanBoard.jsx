import { TextField, Container, Box, Typography } from '@mui/material';
import Column from './Column';
import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useTasks } from '../hooks/useTasks';
import TaskCard from './TaskCard';

const columns = ['backlog', 'in_progress', 'review', 'done'];

export default function KanbanBoard() {
  const { search, setSearch } = useTaskStore();
  const { data = [], updateTask } = useTasks();

  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    const task = data.find((t) => t.id === event.active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      updateTask({
        id: active.id,
        updates: { column: over.id },
      });
    }

    setActiveTask(null);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Kanban Board
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your tasks
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2, width: 250 }}
        />
      </Box>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Box
          display="flex"
          gap={2}
          overflow="auto"
          sx={{ paddingBottom: '10px' }}
        >
          {columns.map((col) => (
            <Box
              key={col}
              sx={{
                flex: 1,
              }}
            >
              <Column column={col} />
            </Box>
          ))}
        </Box>

        <DragOverlay>
          {activeTask ? (
            <Box sx={{ width: 220 }}>
              <TaskCard task={activeTask} />
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Container>
  );
}
