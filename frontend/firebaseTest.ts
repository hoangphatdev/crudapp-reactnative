import { db } from './firebaseConfig';

export interface User {
  id?: string;
  name: string;
  age: number;
}

// CREATE
export const addUser = async (user: Omit<User, 'id'>) => {
  await db.collection('users').add(user);
};

// READ
export const getUsers = async (): Promise<User[]> => {
  const snapshot = await db.collection('users').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};

// UPDATE
export const updateUser = async (id: string, data: Partial<User>) => {
  await db.collection('users').doc(id).update(data);
};

// DELETE
export const deleteUser = async (id: string) => {
  await db.collection('users').doc(id).delete();
};

