import { getDatabase, ref, get } from 'firebase/database';

interface Drawing {
  id: string;
  dataUrl: string;
  authorId: string;
  timestamp: number;
}

interface Drawings {
  [id: Drawing['id']]: Drawing;
}

const getDrawingsRef = () => ref(getDatabase(), 'drawings');

const loadDrawings = async () => {
  const data = await get(getDrawingsRef());
  return (data.exists() ? data.toJSON() : []) as Drawings;
};

export { loadDrawings };
export type { Drawing, Drawings };
