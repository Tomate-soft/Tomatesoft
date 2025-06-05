import axios from '@/configs/axios';
import { PRODUCTS_PATH } from '@/lib/path.lib';
import { updateProducts } from '@/services/products.services';
import { create } from 'zustand';

interface State {
  isLoading: boolean;
  error: Error | null;
  createProduct: (product: any) => void;
  createProductWithTable: (productArray: any) => void;
  updateProducts: (id: string, body: any) => void;
  setError: () => void;
  productsArray: [];
  getProducts: () => void;
}

export const useProductsStore = create<State>((set) => {
  return {
    productsArray: [],
    isLoading: false,
    error: null,
    createProduct: async (product: any) => {
      try {
        const res = await axios.post(`${PRODUCTS_PATH}`, product);
        if (res.status === 201) {
          console.log('product created');
        }
      } catch (error) {
        set({ error: error as Error });
      }
    },
    createProductWithTable: async (productArray: any) => {
      set({ isLoading: true });
      try {
        const res = await axios.post(`${PRODUCTS_PATH}/table-add`, productArray);
        if (res.status === 201) {
          set({ isLoading: false });
          console.log('product created');
        }
        set({ isLoading: false });
      } catch (error) {
        set({ isLoading: false, error: error as Error });

      }
    },
    updateProducts: async (id: string, body: any) => {
      set({ isLoading: true });
      try {
        const res = await updateProducts(id, body);
        if (res.status === 200) {
          console.log('product updated');
          set({ isLoading: false });
        }
        return res;
      } catch (error) {
        set({ isLoading: false, error: error as Error });
      }
    },
    setError: () => {
      set({ error: null });
    },

    getProducts: async () => {
      set({ isLoading: true });
      try {
        const res = await axios.get(`${PRODUCTS_PATH}`);
        if (res.status === 200) {
          set({ productsArray: res.data, isLoading: false });
        }
      } catch (error) {
        set({ isLoading: false, error: error as Error });
      }
    },
  };
});
