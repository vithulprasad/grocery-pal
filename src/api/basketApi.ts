import { GroceryItem } from './groceryApi';

export type BasketStatus = 'started' | 'completed' | 'cancelled';

export interface Basket {
  id: string;
  grocery_id: string;
  grocery_name: string;
  store_name: string;
  status: BasketStatus;
  items: GroceryItem[];
}

const dummyBaskets: Basket[] = [
  {
    id: '1', grocery_id: '1', grocery_name: 'Weekly Shopping', store_name: 'FreshMart', status: 'started',
    items: [
      { product_id: '1', product_name: 'Apple', quantity: 6, unit: 'pcs', assign_to: 'me', completed: false },
      { product_id: '4', product_name: 'Milk', quantity: 2, unit: 'ltr', assign_to: 'partner', completed: false },
    ],
  },
];

export const getBaskets = async (): Promise<{ data: Basket[] }> => {
  return { data: dummyBaskets };
};

export const getBasketById = async (id: string): Promise<{ data: Basket | undefined }> => {
  return { data: dummyBaskets.find((b) => b.id === id) };
};

export const createBasket = async (groceryId: string, groceryName: string, storeName: string, items: GroceryItem[]): Promise<{ data: Basket }> => {
  return { data: { id: Date.now().toString(), grocery_id: groceryId, grocery_name: groceryName, store_name: storeName, status: 'started', items } };
};

export const updateBasketStatus = async (id: string, status: BasketStatus): Promise<{ data: Basket }> => {
  return { data: { id, grocery_id: '', grocery_name: '', store_name: '', status, items: [] } };
};
