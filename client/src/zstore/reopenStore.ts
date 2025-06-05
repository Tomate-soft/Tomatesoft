import { getReopens } from '@/services/reopen.services';
import { create } from 'zustand';

interface state {
  loading: boolean;
  error: string | null;
  reopens: [];
  getReopens: () => Promise<void>;
}

export const useReopenStore = create<state>((set) => ({
  loading: false,
  error: null,
  reopens: [],
  getReopens: async () => {
    set({ loading: true });
    try {
      const response = await getReopens();
      if (!response) {
        set({ loading: false, error: 'Something went wrong' });
        throw new Error('Something went wrong');
      }
      set({ loading: false, reopens: response.data });
    } catch (error) {
      set({ loading: false, error: 'Something went wrong' });
      throw new Error('Something went wrong');
    }
  },
}));
