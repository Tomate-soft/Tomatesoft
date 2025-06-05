import {create} from "zustand";
import { clousureManualPeriodService } from "@/services/ClousureOfOperations.services";


interface State {
    isLoading: boolean;
    errors: null | Error;
    closeManualPeriod: (body: any) => void;
}

export const useOperationalClousureStore = create<State>((set) => ({
    isLoading: false,
    errors: null,
    closeManualPeriod: async (body: any) => {
        set({ isLoading: true, errors: null });
        try {
            const response = await clousureManualPeriodService(body);  
            set({ isLoading: false});
            return response;
        } catch (error) {
            set({ isLoading: false, errors: error as Error });
        }
    },
}));
