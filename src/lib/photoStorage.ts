// src/lib/photoStorage.ts — solo sirve para los tipos; Metro usa .native.ts o .web.ts
export { deletePhoto, listPhotos, savePhoto } from './photoStorage.native';
export type { SavedPhoto } from './photoStorage.native';
