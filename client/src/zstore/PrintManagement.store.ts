import { create } from 'zustand';



interface PrintManagementStore {
  isLoading: boolean;
  error: string;
  printOnSiteOrderTicket: (body)=>void;
}


export const usePrintManagementStore = create<PrintManagementStore>()(
  (set) => ({
    isLoading: false,
    error: '',
    printOnSiteOrderTicket: async (body) => {
      set({ isLoading: true });
      try {
        const response = await fetch('http://localhost:3000/api/print/onsiteorderticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.ok) {
          set({ isLoading: false, error: '' });
          return data;
        } else {
          set({ isLoading: false, error: data.message });
          return data;
        }
      } catch (error) {
        set({ isLoading: false, error: error.message });
        return error;
      }
    },
  }),
);