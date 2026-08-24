import { TextField, Container, Box, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Column from './Column';
import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useTasks } from '../hooks/useTasks';
import TaskCard from './TaskCard';
import { colors } from '../theme';

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
            <Box sx={{ minHeight: '100svh', bgcolor: colors.graphite, py: 4 }}>
                  <Container maxWidth="xl">
                        <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="flex-end"
                              flexWrap="wrap"
                              gap={2}
                              mb={3}
                        >
                              <Box>
                                    <Typography variant="h4" component="h1" sx={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 800, letterSpacing: '0.01em', color: colors.textPrimary, lineHeight: 1.1 }}>
                                          Task Board
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: colors.textMuted, mt: 0.5 }}>
                                          Track work as it clears each station.
                                    </Typography>
                              </Box>

                              <TextField
                                    size="small"
                                    placeholder="Search manifest…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{
                                          width: 260,
                                          '& input': { fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.85rem' },
                                    }}
                                    slotProps={{
                                          input: {
                                                startAdornment: (
                                                      <InputAdornment position="start">
                                                            <SearchIcon fontSize="small" sx={{ color: colors.textMuted }} />
                                                      </InputAdornment>
                                                ),
                                          },
                                    }}
                              />
                        </Box>

                        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                              <Box
                                    display="flex"
                                    gap={2.5}
                                    overflow="auto"
                                    sx={{ paddingBottom: '10px' }}
                              >
                                    {columns.map((col) => (
                                          <Box
                                                key={col}
                                                sx={{
                                                      flex: 1,
                                                      minWidth: 260,
                                                }}
                                          >
                                                <Column column={col} />
                                          </Box>
                                    ))}
                              </Box>

                              <DragOverlay>
                                    {activeTask ? (
                                          <Box sx={{ width: 240, transform: 'rotate(2.5deg)' }}>
                                                <TaskCard task={activeTask} />
                                          </Box>
                                    ) : null}
                              </DragOverlay>
                        </DndContext>
                  </Container>
            </Box>
      );
}
