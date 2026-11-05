// src/lib/photoStorage.web.ts — en web las fotos se guardan en el navegador (localStorage)
export type SavedPhoto = { uri: string; name: string };

const KEY = 'fotos_guardadas';

export function listPhotos(): SavedPhoto[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedPhoto[]) : [];
  } catch {
    return [];
  }
}

export async function savePhoto(sourceUri: string): Promise<void> {
  // Convierte la imagen a texto (data URL) para poder guardarla en el navegador
  const blob = await (await fetch(sourceUri)).blob();
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

  const photos = listPhotos();
  photos.unshift({ uri: dataUrl, name: `foto_${Date.now()}.jpg` });
  localStorage.setItem(KEY, JSON.stringify(photos));
}

export function deletePhoto(uri: string): void {
  const photos = listPhotos().filter((p) => p.uri !== uri);
  localStorage.setItem(KEY, JSON.stringify(photos));
}