import { create } from 'zustand';
import { Category } from '@/api/categoryApi';
import { Product } from '@/api/productApi';
import { GroceryList, GroceryItem } from '@/api/groceryApi';
import { Basket, BasketStatus } from '@/api/basketApi';
import { Partner } from '@/api/partnerApi';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;

  // Partner
  partner: Partner | null;
  setPartner: (p: Partner | null) => void;

  // Categories
  categories: Category[];
  setCategories: (c: Category[]) => void;
  addCategory: (c: Category) => void;
  updateCategory: (id: string, c: Partial<Category>) => void;
  removeCategory: (id: string) => void;

  // Products
  products: Product[];
  setProducts: (p: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  removeProduct: (id: string) => void;

  // Grocery Lists
  groceryLists: GroceryList[];
  setGroceryLists: (g: GroceryList[]) => void;
  addGroceryList: (g: GroceryList) => void;
  updateGroceryList: (id: string, g: Partial<GroceryList>) => void;
  removeGroceryList: (id: string) => void;

  // Baskets
  baskets: Basket[];
  setBaskets: (b: Basket[]) => void;
  addBasket: (b: Basket) => void;
  updateBasketStatus: (id: string, status: BasketStatus) => void;
  toggleBasketItem: (basketId: string, productId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, partner: null });
  },

  partner: null,
  setPartner: (partner) => set({ partner }),

  categories: [],
  setCategories: (categories) => set({ categories }),
  addCategory: (c) => set((s) => ({ categories: [...s.categories, c] })),
  updateCategory: (id, c) => set((s) => ({ categories: s.categories.map((cat) => (cat.id === id ? { ...cat, ...c } : cat)) })),
  removeCategory: (id) => set((s) => ({ categories: s.categories.filter((c) => c.id !== id) })),

  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (p) => set((s) => ({ products: [...s.products, p] })),
  updateProduct: (id, p) => set((s) => ({ products: s.products.map((prod) => (prod.id === id ? { ...prod, ...p } : prod)) })),
  removeProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

  groceryLists: [],
  setGroceryLists: (groceryLists) => set({ groceryLists }),
  addGroceryList: (g) => set((s) => ({ groceryLists: [...s.groceryLists, g] })),
  updateGroceryList: (id, g) => set((s) => ({ groceryLists: s.groceryLists.map((gl) => (gl.id === id ? { ...gl, ...g } : gl)) })),
  removeGroceryList: (id) => set((s) => ({ groceryLists: s.groceryLists.filter((g) => g.id !== id) })),

  baskets: [],
  setBaskets: (baskets) => set({ baskets }),
  addBasket: (b) => set((s) => ({ baskets: [...s.baskets, b] })),
  updateBasketStatus: (id, status) => set((s) => ({ baskets: s.baskets.map((b) => (b.id === id ? { ...b, status } : b)) })),
  toggleBasketItem: (basketId, productId) =>
    set((s) => ({
      baskets: s.baskets.map((b) =>
        b.id === basketId
          ? { ...b, items: b.items.map((i) => (i.product_id === productId ? { ...i, completed: !i.completed } : i)) }
          : b
      ),
    })),
}));
