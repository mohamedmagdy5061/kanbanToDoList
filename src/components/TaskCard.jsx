import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useDraggable } from '@dnd-kit/core';

const priorityStyles = {
  HIGH: { color: '#dc2626', bg: '#fee2e2' },
  MEDIUM: { color: '#d97706', bg: '#fef3c7' },
  LOW: { color: '#6b7280', bg: '#e5e7eb' },
};

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: String(task.id),
  });

  const priority = priorityStyles[task.priority] || priorityStyles.LOW;

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        mb: 2,
        borderRadius: 3,
        cursor: 'grab',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        textAlign: 'start',
        opacity: isDragging ? 0.6 : 1,
        border: '1px solid #e5e7eb',
        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
        backgroundColor: '#fff',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              {...listeners}
              {...attributes}
              sx={{ cursor: 'grab', display: 'flex' }}
            >
              <DragIndicatorIcon fontSize="small" />
            </Box>
            <Typography fontWeight={600}>{task.title}</Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, mb: 1.5 }}
        >
          {task.description}
        </Typography>

        <Box
          sx={{
            display: 'inline-block',
            px: 1.2,
            py: 0.3,
            borderRadius: 1,
            fontSize: '0.7rem',
            fontWeight: 600,
            color: priority.color,
            backgroundColor: priority.bg,
          }}
        >
          {task.priority}
        </Box>
      </CardContent>
    </Card>
  );
}
