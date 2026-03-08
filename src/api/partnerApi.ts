export interface Partner {
  id: string;
  name: string;
  email: string;
}

const dummyUsers: Partner[] = [
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com' },
];

export const getAllUsers = async (): Promise<{ data: Partner[] }> => {
  return { data: dummyUsers };
};

export const selectPartner = async (partnerId: string): Promise<{ data: Partner | undefined }> => {
  return { data: dummyUsers.find((u) => u.id === partnerId) };
};
