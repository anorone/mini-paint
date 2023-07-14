import { getDatabase, ref, child } from 'firebase/database';

const refs = {
  db: () => ref(getDatabase()),
  users: () => ref(getDatabase(), 'users'),
  drawings: () => ref(getDatabase(), 'drawings'),
  user: (id: string) => child(refs.users(), id),
  drawing: (id: string) => child(refs.drawings(), id),
};

export default refs;
