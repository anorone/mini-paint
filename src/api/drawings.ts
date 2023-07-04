import { getDatabase, ref, get } from 'firebase/database';

interface Drawing {
  id: string;
  dataUrl: string;
  authorId: string;
  timestamp: number;
}

const getDrawingsRef = () => ref(getDatabase(), 'drawings');

const loadDrawings = async () => {
  const data = await get(getDrawingsRef());
  return (data.exists() ? data.val() : []) as Drawing[];
};

export { loadDrawings };
export type { Drawing };
