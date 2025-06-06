import {
  getCurrentPaymentsService,
  updatePaymentService,
} from '@/services/payments.service';
import { create } from 'zustand';

interface state {
  isLoading: boolean;
  errors: null | boolean;
  message: string | null;
  payments: [];
  getPayments: () => Promise<any[]>;
  getCurrentPayments: () => Promise<any[]>;
  updatePayment: (id: string, body: any) => Promise<any>;
}

export const usePaymentsStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: null,
    message: null,
    payments: [],
    getPayments: async () => {
      /*
      set({ isLoading: true });
      try {
        const res = await getPaymentsService();
        console.log(res);
        const payments = res.data;
        set({ isLoading: false, payments: payments });
      } catch (error) {
        set({ isLoading: false, errors: true, message: 'No se completo' });
      }
        */
    },
    getCurrentPayments: async () => {
      set({ isLoading: true });
      try {
        const res = await getCurrentPaymentsService();
        console.log(res);
        const payments = res.data;
        set({ isLoading: false, payments: payments });
      } catch (error) {
        set({ isLoading: false, errors: true, message: 'No se completo' });
      }
    },

    updatePayment: async (id: string, body: any) => {
      set({ isLoading: true });
      try {
        const res = await updatePaymentService(id, body);
        const payments = res.data;
        set({ isLoading: false, payments: payments });
      } catch (error) {
        set({ isLoading: false, errors: true, message: 'No se completo' });
      }
    },
  };
});
