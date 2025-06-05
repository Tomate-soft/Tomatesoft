import { updateDailyRegister } from '@/services/dailyRegister.services';
import { create } from 'zustand';
interface state {
  isLoading: boolean;
  error: null | Error;
  updateRegister: (id: string, body: any) => void;
}

export const UseDailyRegisterStore = create<state>((set) => ({
  isLoading: false,
  error: null,
  updateRegister: async (id: string, body: any) => {
    try {
      set({ isLoading: true });
      const response = await updateDailyRegister(id, body);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false, error: error as Error });
    }
  },
}));
