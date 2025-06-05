import { updateDishesService } from '@/services/dishes.services';
import { create } from 'zustand';

interface State{
    isLoading: boolean;
    error: Error | null;
    updateDishes: (id: string, body: any) => void;
}

export const useDishesStore = create<State>((set) => {
  return {
    isLoading: false,
    error: null,
    updateDishes: async (id, body) => {
     set({ isLoading: true});
     try {
      const res = await updateDishesService(id, body);
      set({ isLoading: false, error: null });
      return res;
     } catch (error) {
      set({ isLoading: false, error: error as Error});
      
     }
     finally {
      set({ isLoading: false });
     }
    },
  }
});
