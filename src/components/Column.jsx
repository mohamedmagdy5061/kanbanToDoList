import { useMemo, useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Paper, Typography, Button, Box } from '@mui/material';
import TaskCard from './TaskCard';
import { useTasks } from '../hooks/useTasks';
import { useTaskStore } from '../store/useTaskStore';
import CreateTaskDialog from './CreateTaskDialog';

const columnLabels = {
  backlog: 'TO DO',
  in_progress: 'IN PROGRESS',
  review: 'IN REVIEW',
  done: 'DONE',
};

const columnColors = {
  backlog: '#3b82f6',
  in_progress: '#f59e0b',
  review: '#8b5cf6',
  done: '#10b981',
};

export default function Column({ column }) {
  const [open, setOpen] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  });

  const { data: tasks = [], isLoading, createTask } = useTasks();

  const { search, page, setPage } = useTaskStore();

  const pageSize = 5;

  useEffect(() => {
    setPage(column, 1);
  }, [search, column, setPage]);

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return tasks
      .filter((task) => task.column === column)
      .filter((task) => {
        if (!term) return true;

        return (
          task.title?.toLowerCase().includes(term) ||
          task.description?.toLowerCase().includes(term)
        );
      });
  }, [tasks, column, search]);

  const paginatedTasks = filteredTasks.slice(0, page[column] * pageSize);

  const handleCreateTask = (task) => {
    createTask(task);
  };

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        p: 2,
        height: '80vh',
        overflowY: 'auto',
        borderRadius: 3,
        backgroundColor: isOver ? '#e2e8f0' : '#f1f5f9',
        transition: '0.2s',
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: columnColors[column],
            mr: 1,
          }}
        />
        <Typography variant="subtitle2" fontWeight={600}>
          {columnLabels[column]} ({filteredTasks.length})
        </Typography>
      </Box>

      {isLoading && <Typography>Loading...</Typography>}

      {!isLoading &&
        paginatedTasks.map((task) => 
        <TaskCard key={task.id} task={task} />
        )}

      {!isLoading && filteredTasks.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
          No tasks found
        </Typography>
      )}
      <Box mt={2}>
        <Button
          fullWidth
          variant="outlined"
          sx={{
            borderStyle: 'dashed',
            color: 'text.secondary',
          }}
          onClick={() => setOpen(true)}
        >
          + Add task
        </Button>
      </Box>
      {paginatedTasks.length < filteredTasks.length && (
        <Box mt={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setPage(column, page[column] + 1)}
          >
            Load More
          </Button>
        </Box>
      )}
      {open && (
        <CreateTaskDialog
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreateTask}
          column={column}
        />
      )}
    </Paper>
  );
}
