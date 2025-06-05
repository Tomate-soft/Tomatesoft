import { getRoles } from '@/services/role.services';
import { create } from 'zustand';

interface State {
    isLoading: boolean;
    error: Error | null;
    roles: [];
    getRoles: () => void;

}

export const useRoleStore = create<State>((set) => ({
    isLoading: false,
    error: null,
    roles: [],
    getRoles: async () => {
        set({ isLoading: true });
        try {
            const res = await getRoles();
            set({ roles: res.data, isLoading: false });
            
        } catch (error) {
            set({ error : error as Error, isLoading: false });  
        }
    }, 
}));                                                                                                                    

export default useRoleStore;