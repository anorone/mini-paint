import { get, push, update } from 'firebase/database';
import refs from './refs';

interface Drawing {
  id: string;
  name: string;
  dataUrl: string;
  authorId: string;
  timestamp: number;
}

interface Drawings {
  [id: Drawing['id']]: Drawing;
}

const addDrawing = async (data: Partial<Drawing>) => {
  const id = await push(refs.drawings()).key;
  const drawing = { ...data, id, timestamp: Date.now() };
  const updates = {
    [`/drawings/${drawing.id}`]: drawing,
    [`/users/${drawing.authorId}/drawings/${drawing.id}`]: true,
  };
  await update(refs.db(), updates);
  return drawing as Drawing;
};

const loadDrawings = async () => {
  const data = await get(refs.drawings());
  return (data.exists() ? data.toJSON() : []) as Drawings;
};

export { addDrawing, loadDrawings };
export type { Drawing, Drawings };
