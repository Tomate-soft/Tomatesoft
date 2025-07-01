import { getReopens, getReopensCurrent, getReopensHistory  } from '@/services/reopen.services';
import { create } from 'zustand';

interface state {
  loading: boolean;
  error: string | null;
  reopens: [];
  currentReopen: [],
  getReopens: () => Promise<void>;
  getReopensCurrent: () => void;
  getReopensHistory: () => void;
}

export const useReopenStore = create<state>((set) => ({
  loading: false,
  error: null,
  reopens: [],
  currentReopen: [],
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
   getReopensCurrent: async () => {
    set({ loading: true });
    try {
      const response = await getReopensCurrent();
      if (!response) {
        set({ loading: false, error: 'Something went wrong' });
        throw new Error('Something went wrong');
      }
      set({ loading: false, currentReopen: response.data });
    } catch (error) {
      set({ loading: false, error: 'Something went wrong' });
      throw new Error('Something went wrong');
    }
  },
  getReopensHistory: async () => {
    set({ loading: true });
    try {
      const response = await getReopensHistory();
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
