// src/lib/photoStorage.native.ts — solo se usa en Android e iOS
import { Directory, File, Paths } from 'expo-file-system';

export type SavedPhoto = { uri: string; name: string };

function getPhotosDir(): Directory {
  const dir = new Directory(Paths.document, 'fotos');
  dir.create({ idempotent: true, intermediates: true });
  return dir;
}

export function listPhotos(): SavedPhoto[] {
  try {
    return getPhotosDir()
      .list()
      .filter((item): item is File => item instanceof File)
      .map((f) => ({ uri: f.uri, name: f.name }))
      .sort((a, b) => b.name.localeCompare(a.name));
  } catch {
    return [];
  }
}

export async function savePhoto(sourceUri: string): Promise<void> {
  const destination = new File(getPhotosDir(), `foto_${Date.now()}.jpg`);
  await new File(sourceUri).copy(destination);
}

export function deletePhoto(uri: string): void {
  new File(uri).delete();
}