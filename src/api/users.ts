import { getDatabase, ref, get, set } from 'firebase/database';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  drawings?: {
    [id: string]: boolean;
  };
}

interface Users {
  [id: User['id']]: User;
}

const refs = {
  users: () => ref(getDatabase(), 'users'),
  user: (id: string) => ref(getDatabase(), `users/${id}`),
};

const addUser = async ({ id, firstName, lastName }: User) => {
  const user = { id, firstName, lastName, drawings: {} };
  await set(refs.user(id), user);
  return user as User;
};

const loadUsers = async () => {
  const data = await get(refs.users());
  const users = data.exists() ? data.toJSON() : {};
  return users as Users;
};

export { addUser, loadUsers };
export type { Users };
