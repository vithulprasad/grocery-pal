export interface Product {
  id: string;
  name: string;
  category_id: string;
  description: string;
  default_quantity: number;
  default_unit: string;
  price?: number;
}

const dummyProducts: Product[] = [
  { id: '1', name: 'Apple', category_id: '1', description: 'Red apple', default_quantity: 6, default_unit: 'pcs', price: 2.5 },
  { id: '2', name: 'Banana', category_id: '1', description: 'Yellow banana', default_quantity: 1, default_unit: 'bunch', price: 1.2 },
  { id: '3', name: 'Broccoli', category_id: '2', description: 'Fresh broccoli', default_quantity: 1, default_unit: 'pcs', price: 3.0 },
  { id: '4', name: 'Milk', category_id: '3', description: 'Whole milk', default_quantity: 1, default_unit: 'ltr', price: 4.5 },
  { id: '5', name: 'Bread', category_id: '4', description: 'Whole wheat bread', default_quantity: 1, default_unit: 'loaf', price: 3.5 },
  { id: '6', name: 'Chicken Breast', category_id: '6', description: 'Boneless chicken', default_quantity: 1, default_unit: 'kg', price: 12.0 },
];

export const getProducts = async (): Promise<{ data: Product[] }> => {
  return { data: dummyProducts };
};

export const getProductById = async (id: string): Promise<{ data: Product | undefined }> => {
  return { data: dummyProducts.find((p) => p.id === id) };
};

export const createProduct = async (p: Omit<Product, 'id'>): Promise<{ data: Product }> => {
  return { data: { ...p, id: Date.now().toString() } };
};

export const updateProduct = async (id: string, p: Partial<Product>): Promise<{ data: Product }> => {
  return { data: { id, name: p.name || '', category_id: p.category_id || '', description: p.description || '', default_quantity: p.default_quantity || 1, default_unit: p.default_unit || 'pcs', price: p.price } };
};

export const deleteProduct = async (id: string) => {
  return { data: { success: true } };
};
