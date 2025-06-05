import {
  getTotalBillsService,
  getTotalCurrentSellsService,
} from '@/services/processOperationServices';
import { create } from 'zustand';

interface state {
  isLoading: boolean;
  errors: null | boolean;
  message: string | null;
  totalBills: [];
  totalProducts: [];
  getTotalBills: () => Promise<any[]>;
  getTotalCurrentSells: () => Promise<any[]>;
  sellTotal: number;
}

export const useDashboardStore = create<state>((set) => {
  return {
    sellTotal: 0,
    isLoading: false,
    errors: null,
    message: null,
    totalBills: [],
    getTotalBills: async () => {
      set({ isLoading: true });
      try {
        const res = await getTotalBillsService();
        const totalBills = res.data;
        const products = res.data.flatMap((item) => item.products);
        set({ isLoading: false, totalBills: totalBills, totalProducts: products });
      } catch (error) {
        set({ isLoading: false, errors: true, message: 'No se completo' });
      }
    },

    getTotalCurrentSells: async () => {
      set({ isLoading: true });
      try {
        const res = await getTotalCurrentSellsService();
        const total = res.data;
        set({ isLoading: false, sellTotal: total });
      } catch (error) {
        set({ isLoading: false, errors: true, message: 'No se completo' });
      }
    },
  };
});
