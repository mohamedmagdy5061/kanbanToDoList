import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Alert,
  Typography,
} from '@mui/material';
import { colors, stationLabels } from '../theme';

const priorities = ['LOW', 'MEDIUM', 'HIGH'];

export default function CreateTaskDialog({
  open,
  onClose,
  onCreate,
  isCreating,
  column,
}) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'LOW',
  });
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    setError(null);

    onCreate(
      { ...form, column },
      {
        onSuccess: () => {
          setForm({ title: '', description: '', priority: 'LOW' });
          onClose();
        },
        onError: () => {
          setError('Failed to create task. Please try again.');
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 0.5 }}>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            color: colors.textMuted,
          }}
        >
          NEW STRIP · {stationLabels[column]?.toUpperCase()}
        </Typography>
        Add task
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Title"
          fullWidth
          value={form.title}
          onChange={handleChange('title')}
          sx={{ mb: 2, mt: 1 }}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange('description')}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Priority"
          fullWidth
          value={form.priority}
          onChange={handleChange('priority')}
        >
          {priorities.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isCreating || !form.title.trim()}
        >
          {isCreating ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
