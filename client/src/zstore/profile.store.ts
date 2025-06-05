import { getProfiles, updateProfile } from '@/services/profile.services';
import { create } from 'zustand';


interface State {
    isloading: boolean;
    error: Error | string | null;
    profiles: [];
    getProfiles: () => void;
    updateProfile: (id: string, body: any) => void;
}


const useProfileStore = create<State>((set) => ({
    isloading: false,
    error: null,
    profiles: [],
    getProfiles: async () => {
        set({ isloading: true });
        try {
            const response = await getProfiles();
            set({ profiles: response.data, isloading: false });
        } catch (error) {
            set({ error: error as Error, isloading: false });
        }
    },
    updateProfile: async (id: string, body: any) => {
        set({ isloading: true });
        try {
            await updateProfile(id, body);
            set({ isloading: false });
        } catch (error) {
            set({ error: error as Error, isloading: false });
        }
    },
}));

export default useProfileStore;