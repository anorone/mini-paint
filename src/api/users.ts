import { get, set } from 'firebase/database';
import refs from './refs';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  drawings: {
    [id: string]: boolean;
  };
}

interface Users {
  [id: User['id']]: User;
}

const addUser = async (data: Partial<User>) => {
  const user = { ...data, id: data.id!.slice(-4), drawings: {} };
  await set(refs.user(user.id), user);
  return user as User;
};

const loadUsers = async () => {
  const data = await get(refs.users());
  const users = data.exists() ? data.toJSON() : {};
  return users as Users;
};

export { addUser, loadUsers };
export type { Users };
