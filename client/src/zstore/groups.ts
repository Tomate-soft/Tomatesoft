import { getDishesService } from '@/services/dishes.services';
import {
  createGroupService,
  getGruopsService,
  updateGroupService,
} from '@/services/groups.service';
import { getModifiersService } from '@/services/modifiers.services';
import { create } from 'zustand';

interface Groups {
  isLoading: boolean;
  error: Error | null;
  groups: [];
  modifiers: [];
  dishes: [];
  getModifiers: () => void;
  getDishes: () => void;
  getGroups: () => void;
  createGroup: (body: any) => void;
  updateGroup: (id: string, body: any) => void;
}

export const useGroupsStore = create<Groups>((set) => ({
  isLoading: false,
  error: null,
  groups: [],
  modifiers: [],
  dishes: [],
  getModifiers: async () => {
    try {
      set({ isLoading: true });
      const res = await getModifiersService();
      if (!res) {
        set({
          isLoading: false,
          error: new Error('No se pudo cargar los modificadores'),
        });
      }
      set({
        isLoading: false,
        modifiers: res.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error as Error,
      });
    }
  },
  getDishes: async () => {
    try {
      set({ isLoading: true });
      const res = await getDishesService();
      if (!res) {
        set({
          isLoading: false,
          error: new Error('No se pudo cargar los complementos'),
        });
      }
      set({
        isLoading: false,
        dishes: res.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error as Error,
      });
    }
  },
  getGroups: async () => {
    try {
      set({ isLoading: true });
      const res = await getGruopsService();

      set({
        isLoading: false,
        groups: res.data,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error as Error,
      });
    }
  },
  createGroup: async (body: any) => {
    try {
      set({ isLoading: true });
      const res = await createGroupService(body);
      if (!res) {
        set({
          isLoading: false,
          error: new Error('No se pudo crear el grupo'),
        });
      }
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error as Error,
      });
    }
  },

  updateGroup: async (id, body) => {
    set({ isLoading: true });
    try {
      const response = await updateGroupService(id, body);
      if (!response) {
        set({
          isLoading: false,
          error: new Error('No se pudo crear el grupo'),
        });
      }
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ isLoading: false, error: new Error('No se pudeo completar') });
    }
    finally{
      set({isLoading: false})
    }
  },
}));
