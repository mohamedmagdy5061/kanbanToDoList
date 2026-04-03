import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const fetchTasks = async () => {
  const { data } = await api.get('/tasks');
  return data;
};

export const createTask = async (task) => {
  const { data } = await api.post('/tasks', task);
  return data;
};

export const updateTask = async (id, task) => {
  const { data } = await api.patch(`/tasks/${id}`, task);
  return data;
};

