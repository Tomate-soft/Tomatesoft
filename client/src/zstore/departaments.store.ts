import { getDepartamentsService } from '@/services/departaments.services';
import { create } from 'zustand';

interface State {
    isLoading: boolean;
    error: Error | null;
    departaments: [];
    getDepartaments: () => void;

}

export const useDepartamentsStore = create<State>((set) => ({
    isLoading: false,
    error: null,
    departaments: [],
    getDepartaments: async () => {
        set({ isLoading: true });
        try {
            const res = await getDepartamentsService();
            set({ departaments: res.data, isLoading: false });
            
        } catch (error) {
            set({ error : error as Error, isLoading: false });  
        }
    }, 
}));                                                                                                                    

export default useDepartamentsStore;