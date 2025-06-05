import {
  getBillsService,
  getCancellationsService,
  getCashierSessionsService,
  getDiscountsService,
} from '@/services/historyServices';
import { getPaymentsService } from '@/services/payments.service';
import { create } from 'zustand';

interface State {
  isLoading: boolean;
  error: string | null;
  message: string | null;
  bills: [];
  payments: [];
  discounts: [];
  cancellations: [];
  cashierSessions: [];
  getBills: () => void;
  getPayments: () => void;
  getDiscounts: () => void;
  getCancellations: () => void;
  getCashierSessions: () => void;
}

export const useHistoryStore = create<State>((set) => ({
  isLoading: false,
  error: null,
  message: null,
  bills: [],
  payments: [],
  discounts: [],
  cancellations: [],
  cashierSessions: [],
  getBills: async () => {
    set({ isLoading: true });
    try {
      const response = await getBillsService();
      set({ isLoading: false, bills: response.data });
    } catch (error) {
      set({ isLoading: false, error: 'Something went wrong' });
    }
  },
  getPayments: async () => {
    set({ isLoading: true });
    try {
      const response = await getPaymentsService();
      set({ isLoading: false, payments: response.data });
    } catch (error) {
      set({ isLoading: false, error: 'Something went wrong' });
    }
  },
  getDiscounts: async () => {
    set({ isLoading: true });
    try {
      const response = await getDiscountsService();
      set({ isLoading: false, discounts: response.data });
      console.log(response.data);
    } catch (error) {
      set({ isLoading: false, error: 'Something went wrong' });
    }
  },
  getCancellations: async () => {
    set({ isLoading: true });
    try {
      const response = await getCancellationsService();
      console.log(response.data);
      set({ isLoading: false, cancellations: response.data });
    } catch (error) {
      set({ isLoading: false, error: 'Something went wrong' });
    }
  },
  getCashierSessions: async () => {
    set({ isLoading: true });
    try {
      const response = await getCashierSessionsService();
      set({ isLoading: false, cashierSessions: response.data });
    } catch (error) {
      set({ isLoading: false, error: 'Something went wrong' });
    }
  },
}));
