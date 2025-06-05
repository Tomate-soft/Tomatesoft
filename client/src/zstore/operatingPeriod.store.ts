import { create } from 'zustand';
import {
  approvePeriodService,
  getCurrentPeriodService,
  getOperatingPeriodsService,
} from '@/services/operatingPeriods';

interface state {
  isLoading: boolean;
  erros: boolean;
  message: string;
  operatingPeriods: any[];
  getOperatingPeriods: () => void;
  approvePeriod: (id: string, body: { userId: string }) => Promise<void>;
  currentPeriod: any;
  getCurrentPeriod: () => void;
}

export const useOperatingPeriodStore = create<state>((set) => ({
  isLoading: false,
  erros: false,
  message: '',
  operatingPeriods: [],
  getOperatingPeriods: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await getOperatingPeriodsService();
      const operatingPeriods = response.data;
      if (!operatingPeriods) {
        set({
          isLoading: false,
          erros: true,
          message: 'Ocurrio un error al recuperar los periodos de operacion',
        });
        return;
      }
      if (operatingPeriods) {
        set({
          isLoading: false,
          erros: false,
          operatingPeriods,
        });
      }
      return operatingPeriods;
    } catch (error) {
      set({
        isLoading: false,
        erros: true,
        message: 'Ocurrio un error al recuperar los periodos de operacion',
      });
      return error;
    }
  },
  approvePeriod: async (id, body) => {
   
    set({ isLoading: true });
    try {
      const res = await approvePeriodService(id, body);
      if (res.status === 200) {
        set({
          isLoading: false,
          erros: false,
          message: 'El periodo de operacion ha sido aprobado',
        });
        return;
      }
    } catch (error) {
      throw new Error('No se pudo aprobar el periodo de operacion');
    }
  },
  currentPeriod: null,
  getCurrentPeriod: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await getCurrentPeriodService();
      const currentPeriod = response.data;
      if (!currentPeriod) {
        set({
          isLoading: false,
          erros: true,
          message: 'Ocurrio un error al recuperar el periodo de operacion',
        });
        return;
      }
        set({
          isLoading: false,
          erros: false,
          currentPeriod,
        });
        console.log(currentPeriod);
    } catch (error) {
      set({
        isLoading: false,
        erros: true,
        message: 'Ocurrio un error al recuperar el periodo de operacion',
      });
      return error;
    }
  },
}));
