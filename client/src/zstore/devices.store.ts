import { createDevice, getDevices, updateDevice } from '@/services/devices.service';
import { create } from 'zustand';


interface state {
    isLoading: boolean;
    error: Error | null;
    devices: any[];
    getDevices: () => void;
    updateDevice: (id: string, data: any) => void;
    createDevice: (data: any, id: string) => void;
}
    

export const useDevicesStore = create<state>((set) => ({
    isLoading: false,
    error: null,
    devices: [],
    getDevices: async () => {
        try {
            set({ isLoading: true });
            const response = await getDevices();
            set({ devices: response.data, isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
    updateDevice: async (id: string, data: any) => {
        try {
            set({ isLoading: true });
            const response = await updateDevice(id, data);
            set({  isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
    createDevice: async (data: any, id: string) => {
        try {
            set({ isLoading: true });
            const response = await createDevice(data, id);
            set({  isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
}));