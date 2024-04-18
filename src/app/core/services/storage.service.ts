import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable()
export class StorageService {
  async remove(key: string) {
    await Filesystem.deleteFile({
      path: key,
      directory: Directory.Library,
    });
  }

  async set(key: string, value: any) {
    const jsonString = JSON.stringify(value);
    const cleanedJsonString = jsonString.replace(/[^\x00-\x7F]/g, '');
    const base64String = btoa(cleanedJsonString);

    await Filesystem.writeFile({
      path: key,
      data: base64String,
      directory: Directory.Library,
    });
  }

  async get(key: string) {
    const value = await Filesystem.readFile({
      path: key,
      directory: Directory.Library,
    });

    const base64String = value.data;

    const jsonString = atob(base64String);

    const jsonObject = JSON.parse(jsonString);

    return jsonObject;
  }
}
