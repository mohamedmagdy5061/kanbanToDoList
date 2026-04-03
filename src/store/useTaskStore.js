import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  search: '',
  setSearch: (value) => set({ search: value }),

  page: {
    backlog: 1,
    in_progress: 1,
    review: 1,
    done: 1,
  },

  setPage: (column, newPage) =>
    set((state) => ({
      page: {
        ...state.page,
        [column]: newPage,
      },
    })),
}));
