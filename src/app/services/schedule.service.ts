import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CONFIG } from '../data/menu';

export const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

/** Hora actual en Colombia (UTC-5), sin importar la zona del celular del cliente. */
function colombiaNow(): Date {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 - 5 * 3600000);
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const fmtHour = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`;
};

export interface OpenStatus {
  open: boolean;
  label: string;  // "Abierto · cierra 9 PM"
  short: string;  // "Abierto" | "Abre 2 PM"
}

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  /** null mientras se prerenderiza: en el servidor no sabemos la hora del cliente. */
  readonly now = signal<Date | null>(null);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.now.set(colombiaNow());
      setInterval(() => this.now.set(colombiaNow()), 60_000);
    }
  }

  readonly today = computed(() => this.now()?.getDay() ?? -1);

  readonly status = computed<OpenStatus | null>(() => {
    const now = this.now();
    if (!now) return null;
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const todayHours = CONFIG.schedule[day];
    const yesterday = CONFIG.schedule[(day + 6) % 7];

    // Horario de ayer que pasa de medianoche (ej. viernes 4 PM – 1 AM).
    if (yesterday && toMin(yesterday[1]) <= toMin(yesterday[0]) && mins < toMin(yesterday[1])) {
      return { open: true, label: `Abierto · cierra ${fmtHour(yesterday[1])}`, short: 'Abierto ahora' };
    }

    if (todayHours) {
      const [from, to] = todayHours;
      const overnight = toMin(to) <= toMin(from);
      if (mins >= toMin(from) && (overnight || mins < toMin(to))) {
        return { open: true, label: `Abierto · cierra ${fmtHour(to)}`, short: 'Abierto ahora' };
      }
      if (mins < toMin(from)) {
        return { open: false, label: `Cerrado · abre hoy ${fmtHour(from)}`, short: `Abre ${fmtHour(from)}` };
      }
    }
    // Busca el próximo día con horario.
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      const h = CONFIG.schedule[d];
      if (h) {
        const when = i === 1 ? 'mañana' : DAYS[d].toLowerCase();
        return { open: false, label: `Cerrado · abre ${when} ${fmtHour(h[0])}`, short: `Abre ${when}` };
      }
    }
    return { open: false, label: 'Cerrado', short: 'Cerrado' };
  });

  isAvailableToday(days?: number[]): boolean {
    if (!days) return true;
    const t = this.today();
    return t === -1 ? true : days.includes(t);
  }
}
