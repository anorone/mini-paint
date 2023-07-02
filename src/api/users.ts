import { getDatabase, ref, get } from 'firebase/database';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  drawings: string[];
}

interface Users {
  [id: User['id']]: User;
}

const getUsersRef = () => ref(getDatabase(), 'users');

const loadUsers = async () => {
  const data = await get(getUsersRef());
  const users = data.exists() ? data.toJSON() : {};
  return users as Users;
};

export { loadUsers };
export type { Users };
