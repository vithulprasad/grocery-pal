import axiosClient from './axiosClient';

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const dummyCategories: Category[] = [
  { id: '1', name: 'Fruits', icon: '🍎', description: 'Fresh fruits' },
  { id: '2', name: 'Vegetables', icon: '🥦', description: 'Fresh vegetables' },
  { id: '3', name: 'Dairy', icon: '🥛', description: 'Milk, cheese, yogurt' },
  { id: '4', name: 'Bakery', icon: '🍞', description: 'Bread and pastries' },
  { id: '5', name: 'Snacks', icon: '🍫', description: 'Chips, cookies, candy' },
  { id: '6', name: 'Meat', icon: '🥩', description: 'Fresh meat and poultry' },
];

export const getCategories = async (): Promise<{ data: Category[] }> => {
  return { data: dummyCategories };
};

export const getCategoryById = async (id: string): Promise<{ data: Category | undefined }> => {
  return { data: dummyCategories.find((c) => c.id === id) };
};

export const createCategory = async (cat: Omit<Category, 'id'>): Promise<{ data: Category }> => {
  return { data: { ...cat, id: Date.now().toString() } };
};

export const updateCategory = async (id: string, cat: Partial<Category>): Promise<{ data: Category }> => {
  return { data: { id, name: cat.name || '', icon: cat.icon || '', description: cat.description || '' } };
};

export const deleteCategory = async (id: string) => {
  return { data: { success: true } };
};
