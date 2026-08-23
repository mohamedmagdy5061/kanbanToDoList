import { useMemo, useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Paper, Typography, Button, Box } from '@mui/material';
import TaskCard from './TaskCard';
import ColumnHeader from './ColumnHeader';
import { useTasks } from '../hooks/useTasks';
import { useTaskStore } from '../store/useTaskStore';
import CreateTaskDialog from './CreateTaskDialog';
import { colors, stationSignal } from '../theme';

export default function Column({ column }) {
      const [open, setOpen] = useState(false);
      const { setNodeRef, isOver } = useDroppable({
            id: column,
      });

      const {
            data: tasks = [],
            isLoading,
            isError,
            createTask,
            isCreating,
      } = useTasks();

      const { search, page, setPage } = useTaskStore();

      const pageSize = 5;
      const signal = stationSignal[column];

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

      return (
            <Paper
                  ref={setNodeRef}
                  elevation={0}
                  sx={{
                        borderRadius: 2.5,
                        overflow: 'hidden',
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: colors.bay,
                        border: `1px solid ${isOver ? signal : colors.bayBorder}`,
                        boxShadow: isOver ? `0 0 0 3px ${signal}33` : 'none',
                        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  }}
            >
                  <Box sx={{ height: 4, backgroundColor: signal, flexShrink: 0 }} />

                  <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
                        <ColumnHeader column={column} count={filteredTasks.length} />

                        {isLoading && (
                              <Typography sx={{ color: colors.textMuted, fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.85rem' }}>
                                    Loading…
                              </Typography>
                        )}

                        {isError && (
                              <Typography color="error" variant="body2" mt={2}>
                                    Failed to load tasks. Please try again.
                              </Typography>
                        )}

                        {!isLoading &&
                              !isError &&
                              paginatedTasks.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                              ))}

                        {!isLoading && !isError && filteredTasks.length === 0 && (
                              <Typography
                                    variant="body2"
                                    textAlign="center"
                                    mt={3}
                                    sx={{ color: colors.textMuted }}
                              >
                                    No tasks in this bay.
                              </Typography>
                        )}

                        <Box mt={2}>
                              <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                          borderStyle: 'dashed',
                                          borderColor: colors.bayBorder,
                                          color: colors.textMuted,
                                          fontFamily: '"IBM Plex Mono", monospace',
                                          fontSize: '0.8rem',
                                          letterSpacing: '0.06em',
                                          '&:hover': { borderColor: signal, color: colors.textPrimary },
                                    }}
                                    onClick={() => setOpen(true)}
                              >
                                    + ADD TASK
                              </Button>
                        </Box>
                        {paginatedTasks.length < filteredTasks.length && (
                              <Box mt={1.5}>
                                    <Button
                                          fullWidth
                                          size="small"
                                          onClick={() => setPage(column, page[column] + 1)}
                                          sx={{ color: colors.textMuted }}
                                    >
                                          Load more
                                    </Button>
                              </Box>
                        )}
                  </Box>
                  {open && (
                        <CreateTaskDialog
                              open={open}
                              onClose={() => setOpen(false)}
                              onCreate={createTask}
                              isCreating={isCreating}
                              column={column}
                        />
                  )}
            </Paper>
      );
}
