import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useDraggable } from '@dnd-kit/core';
import { colors, prioritySignal } from '../theme';

const priorityCode = { HIGH: 'H', MEDIUM: 'M', LOW: 'L' };

const TaskCard = ({ task }) => {
      const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
            id: String(task.id),
      });

      const priorityKey = prioritySignal[task.priority] ? task.priority : 'LOW';
      const tab = prioritySignal[priorityKey];

      return (
            <Box
                  ref={setNodeRef}
                  {...listeners}
                  {...attributes}
                  sx={{
                        display: 'flex',
                        mb: 1.5,
                        cursor: 'grab',
                        opacity: isDragging ? 0.5 : 1,
                        borderRadius: '2px 10px 10px 2px',
                        overflow: 'hidden',
                        backgroundColor: colors.paper,
                        boxShadow: `0 1px 2px ${colors.paperShadow}`,
                        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                        '&:hover': {
                              boxShadow: `0 4px 10px ${colors.paperShadow}`,
                              transform: 'translateY(-1px)',
                        },
                  }}
            >
                  <Box sx={{ width: 6, flexShrink: 0, backgroundColor: tab }} />
                  <Box
                        sx={{
                              flex: 1,
                              minWidth: 0,
                              px: 1.75,
                              py: 1.5,
                              borderLeft: `1px dashed ${colors.inkMuted}`,
                              textAlign: 'start',
                        }}
                  >
                        <Box display="flex" alignItems="flex-start" gap={0.75}>
                              <DragIndicatorIcon fontSize="small" sx={{ color: colors.inkMuted, mt: '2px' }} />
                              <Typography sx={{ fontWeight: 600, color: colors.ink, lineHeight: 1.3 }}>
                                    {task.title}
                              </Typography>
                        </Box>

                        {task.description && (
                              <Typography
                                    variant="body2"
                                    sx={{ mt: 0.75, mb: 1.25, color: colors.inkMuted, lineHeight: 1.4 }}
                              >
                                    {task.description}
                              </Typography>
                        )}

                        <Box
                              sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 20,
                                    height: 20,
                                    borderRadius: '4px',
                                    border: `1px solid ${tab}`,
                                    fontFamily: '"IBM Plex Mono", monospace',
                                    fontSize: '0.68rem',
                                    fontWeight: 600,
                                    color: tab,
                              }}
                        >
                              {priorityCode[priorityKey]}
                        </Box>
                  </Box>
            </Box>
      );
};

export default memo(TaskCard);
