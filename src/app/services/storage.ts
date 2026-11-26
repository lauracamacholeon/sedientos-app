import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

/** localStorage seguro: durante el prerender (en el servidor) no existe,
 *  así que aquí simplemente no hace nada. */
@Injectable({ providedIn: 'root' })
export class Storage {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  get<T>(key: string, fallback: T): T {
    if (!this.isBrowser) return fallback;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  set(key: string, value: unknown): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento lleno o bloqueado: el carrito sigue funcionando en memoria */
    }
  }
}
