/* Tipos de datos de la carta. Si agregas un campo nuevo a un producto,
   agrégalo primero aquí para que TypeScript te avise si falta en algún lado. */

export interface BusinessConfig {
  name: string;
  slogan: string;
  city: string;
  whatsapp: string;          // solo números, con 57 adelante: 573001234567
  whatsappDisplay: string;   // como se muestra en la página: 300 123 4567
  instagram: string;         // URL completa
  instagramHandle: string;   // @usuario
  address: string;
  /** Horario por día. 0 = domingo … 6 = sábado. null = cerrado. Formato 24 h. */
  schedule: Record<number, [string, string] | null>;
  paymentMethods: string[];
  deliveryNote: string;
  pickupNote: string;
}

export interface Category {
  id: string;
  name: string;
  sub: string;
  emoji: string;
}

export interface Size {
  name: string;   // "12 oz"
  price: number;  // en pesos, sin puntos: 6000
}

export type CupShape = 'cup' | 'bowl' | 'cooler' | 'shot';

/** Colores del vaso dibujado. Cuando tengas fotos reales, usa `image` y esto se ignora. */
export interface CupColors {
  top: string;     // color del hielo (arriba)
  bottom: string;  // color del fondo del vaso
  syrup?: string;  // chorrito por encima (leche condensada, chamoy…)
}

export interface Product {
  id: string;
  category: string;
  name: string;
  desc: string;
  sizes: Size[];
  toppings: string[];      // ids de TOPPINGS que se le pueden agregar
  colors: CupColors;
  image?: string;          // ruta en /public, por ejemplo 'img/tentacion.webp'
  shape?: CupShape;        // dibujo provisional: vaso, pecera, neverita o shot
  flavorPick?: boolean;    // true = el cliente escoge uno de los SABORES (peceras, neveritas)
  badge?: string;          // etiqueta: "Favorito", "Nuevo", "Solo martes"…
  days?: number[];         // si existe, solo se puede pedir esos días (0 = domingo)
  featured?: boolean;      // aparece en "Los favoritos"
  available?: boolean;     // false = agotado (se muestra pero no se puede pedir)
}

export interface Topping {
  name: string;
  price: number;
  detail?: string;         // qué trae, se muestra debajo del nombre
}

export interface Faq {
  q: string;
  a: string;
}
