import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useTasks } from '../hooks/useTasks';

const priorities = ['LOW', 'MEDIUM', 'HIGH'];

export default function CreateTaskDialog({ open, onClose, onCreate, column }) {
  const { isCreating } = useTasks();
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'LOW',
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    onCreate({
      ...form,
      column,
    });

    setForm({
      title: '',
      description: '',
      priority: 'LOW',
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Task</DialogTitle>

      <DialogContent>
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
