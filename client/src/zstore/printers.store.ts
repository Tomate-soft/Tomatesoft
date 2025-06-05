import { createPrinter, getPrinters, updatePrinter } from '@/services/printers.services';
import { create } from 'zustand';


interface state {
    isLoading: boolean;
    error: Error | null;
    printers: any[];
    getPrinters: () => void;
    updatePrinter: (id: string, body: any) => void; 
    createPrinter: (body: any) => void;
}
    

export const usePrintersStore = create<state>((set) => ({
    isLoading: false,
    error: null,
    printers: [],
    getPrinters: async () => {
        try {
            set({ isLoading: true });
            const response = await getPrinters();
            set({ printers: response.data, isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
    updatePrinter: async (id: string, body: any) => {
        try {
            set({ isLoading: true });
            await updatePrinter(id, body);
            set({ isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
    createPrinter: async (body: any) => {
        try {
            set({ isLoading: true });
            await createPrinter(body);
            set({ isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
}));