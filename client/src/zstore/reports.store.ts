import { create } from 'zustand';
import { getWorkedTimeReport } from '@/services/report.services';


type TData = {
  period: string;
  workData: Record<string, unknown>[];
}

interface ReportsStore {
  isLoading: boolean;
  error: null | Error;
  getReports: () => Promise<void>;
  data: TData | undefined;
}

export const useReportsStore = create<ReportsStore>((set) => {
  return {
    isLoading: false,
    error: null,
    getReports: async () => {
      set({ isLoading: true });
      try {
        const response = await getWorkedTimeReport();
        if(!response.data){
            set({isLoading: false})
        }
        set({ isLoading: false, error: null, data: response.data });
        return response.data;
      } catch (error) {
        set({ isLoading: false, error: error as Error });
      } finally {
        set({  isLoading: false, error: null });
      }
    },
    data: undefined,
  };
})
