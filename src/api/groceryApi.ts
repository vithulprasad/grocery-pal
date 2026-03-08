export interface GroceryItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit: string;
  assign_to: 'me' | 'partner';
  completed: boolean;
}

export interface GroceryList {
  id: string;
  name: string;
  store_name: string;
  items: GroceryItem[];
  converted_to_basket: boolean;
}

const dummyLists: GroceryList[] = [
  {
    id: '1', name: 'Weekly Shopping', store_name: 'FreshMart',
    items: [
      { product_id: '1', product_name: 'Apple', quantity: 6, unit: 'pcs', assign_to: 'me', completed: false },
      { product_id: '4', product_name: 'Milk', quantity: 2, unit: 'ltr', assign_to: 'partner', completed: false },
    ],
    converted_to_basket: false,
  },
  {
    id: '2', name: 'Party Shopping', store_name: 'SuperStore',
    items: [
      { product_id: '5', product_name: 'Bread', quantity: 3, unit: 'loaf', assign_to: 'me', completed: false },
    ],
    converted_to_basket: false,
  },
];

export const getGroceryLists = async (): Promise<{ data: GroceryList[] }> => {
  return { data: dummyLists };
};

export const getGroceryListById = async (id: string): Promise<{ data: GroceryList | undefined }> => {
  return { data: dummyLists.find((g) => g.id === id) };
};

export const createGroceryList = async (g: Omit<GroceryList, 'id' | 'converted_to_basket'>): Promise<{ data: GroceryList }> => {
  return { data: { ...g, id: Date.now().toString(), converted_to_basket: false } };
};

export const updateGroceryList = async (id: string, g: Partial<GroceryList>): Promise<{ data: GroceryList }> => {
  return { data: { id, name: g.name || '', store_name: g.store_name || '', items: g.items || [], converted_to_basket: g.converted_to_basket || false } };
};

export const deleteGroceryList = async (id: string) => {
  return { data: { success: true } };
};
