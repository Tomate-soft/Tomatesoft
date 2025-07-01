import { createMoneyMovement } from '@/services/moneyMovements.services';
import { create } from 'zustand';

interface State {
    loading: boolean;
    error: null | Error;
    createMovement: (body: any) => Promise<void>;
}

export const useMoneyMovementStore = create<State>((set) => ({
    loading: false,
    error: null,
    createMovement: async (body) => {
        try {
            set({ loading: true, error: null });
            const res = await createMoneyMovement(body);
            if(!res.data) {
                throw new Error('Something went wrong');
            }
            const data = res.data;
            set({ loading: false});
            return data;
        } catch (error) {
            set({ loading: false, error: error as Error});
            throw new Error(error instanceof Error ? error.message : 'Something went wrong');
        }
    },
}));
