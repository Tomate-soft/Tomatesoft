import { updateMopdifiersService } from "@/services/modifiers.services";
import { create } from 'zustand';




interface State {
    isLoading: boolean;
    error: Error | null;
    updateModifier: (id: string, body: any) => void;
}


export const useModifiersStore = create<State>((set) => {
    return {
        isLoading: false,
        error: null,
        updateModifier: async (id: string, body: any) => {
            set({ isLoading: true });
            try {
                const res = await updateMopdifiersService(id, body);
                if (res.status === 200) {
                    set({ isLoading: false });
                    console.log('modifier updated');
                }
                set({ isLoading: false });
                return res;
            } catch (error) {
                set({ error: error as Error });
            }
            finally {
                set({ isLoading: false });
            }
        },
    };
});
