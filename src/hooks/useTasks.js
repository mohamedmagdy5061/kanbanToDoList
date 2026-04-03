import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTasks,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
} from '../api/tasksApi';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const createMutation = useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) => updateTaskApi(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    ...query,
    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
