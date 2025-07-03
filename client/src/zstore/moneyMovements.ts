import { createMoneyMovement, updateMoneyMovement } from '@/services/moneyMovements.services';
import { create } from 'zustand';

interface State {
    loading: boolean;
    error: null | Error;
    createMovement: (body: any) => Promise<void>;
    updateMovement: (id: string, body: any) => Promise<void>;
}

export const useMoneyMovementStore = create<State>((set) => ({
    loading: false,
    error: null,
    createMovement: async (body) => {
    try {
        set({ loading: true, error: null });
        const res = await createMoneyMovement(body);

        if (!res.data) {
            console.error('❌ No se recibió data:', res);
            throw new Error('No se recibió respuesta del servidor');
        }

        set({ loading: false });
        return res.data;
    } catch (error) {
        console.error('❌ Error al crear el movimiento:', error?.response?.data || error.message || error);
        set({ loading: false, error: error as Error });
        throw error;
    }
},
    updateMovement: async (id, body) => {
        try {
            set({ loading: true, error: null });
            const res = await updateMoneyMovement(id, body);

            if (!res.data) {
                console.error('❌ No se recibió data:', res);
                throw new Error('No se recibió respuesta del servidor');
            }

            set({ loading: false });
            return res.data;
        } catch (error) {
            console.error('❌ Error al actualizar el movimiento:', error?.response?.data || error.message || error);
            set({ loading: false, error: error as Error });
            throw error;
        }
    },
}));
