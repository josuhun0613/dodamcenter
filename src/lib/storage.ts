import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

function getFilePath(collection: string) {
  return path.join(DATA_DIR, `${collection}.json`);
}

export async function getAll<T>(collection: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = getFilePath(collection);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function create<T extends { id?: string }>(collection: string, item: T): Promise<T> {
  const items = await getAll<T>(collection);
  const newItem = { ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  items.push(newItem as T);
  await ensureDataDir();
  await fs.writeFile(getFilePath(collection), JSON.stringify(items, null, 2));
  return newItem as T;
}

export async function update<T extends { id?: string }>(collection: string, id: string, updates: Partial<T>): Promise<T | null> {
  const items = await getAll<T>(collection);
  const index = items.findIndex((item: T & { id?: string }) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  await fs.writeFile(getFilePath(collection), JSON.stringify(items, null, 2));
  return items[index];
}

export async function remove(collection: string, id: string): Promise<boolean> {
  const items = await getAll<{ id: string }>(collection);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await fs.writeFile(getFilePath(collection), JSON.stringify(filtered, null, 2));
  return true;
}

export async function getById<T extends { id?: string }>(collection: string, id: string): Promise<T | null> {
  const items = await getAll<T>(collection);
  return items.find((item: T & { id?: string }) => item.id === id) || null;
}
