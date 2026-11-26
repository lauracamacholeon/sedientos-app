/* ==========================================================================
   SEDIENTOS GRANIZADOS — Datos de la carta
   Este es el ÚNICO archivo que necesitas tocar para cambiar precios, sabores,
   horario o el número de WhatsApp. El resto de la página se arma sola.
   ========================================================================== */
import { BusinessConfig, Category, Faq, Product, Topping } from './models';

export const CONFIG: BusinessConfig = {
  name: 'Sedientos',
  slogan: 'Granizados con licor · #TeamSedientos',
  city: 'Tu ciudad',
  whatsapp: '573000000000',          // ← cambia por el número real (57 + celular)
  whatsappDisplay: '300 000 0000',
  instagram: 'https://instagram.com/',
  instagramHandle: '@sedientos',
  address: 'Calle 00 # 00-00, Barrio Centro',
  schedule: {
    0: ['15:00', '23:00'], // domingo
    1: null,               // lunes cerrado
    2: null,               // martes cerrado
    3: ['16:00', '23:00'],
    4: ['16:00', '23:00'],
    5: ['16:00', '01:00'], // viernes hasta la 1 AM
    6: ['15:00', '01:00'], // sábado hasta la 1 AM
  },
  paymentMethods: ['Nequi', 'Daviplata', 'Bancolombia', 'Efectivo'],
  deliveryNote: 'El domicilio se cobra aparte según tu barrio. Te confirmamos el valor por WhatsApp. Al entregar podemos pedir tu documento.',
  pickupNote: 'Pide por WhatsApp y recógelo listo, sin hacer fila.',
};

export const CATEGORIES: Category[] = [
  { id: 'granizados', name: 'Granizados',     emoji: '🍹', sub: 'Escoge tu sabor y tu tamaño: 9, 12 o 16 oz (el Supersediento).' },
  { id: 'compartir',  name: 'Para compartir', emoji: '🎉', sub: 'Peceras y neveritas para el parche. Tú escoges el sabor.' },
  { id: 'shots',      name: 'Shots',          emoji: '🥃', sub: 'Pa’ arrancar.' },
];

/** Adicionales: el cliente puede agregarlos a cualquier granizado. */
export const TOPPINGS: Record<string, Topping> = {
  combo1: { name: 'Combo 1', price: 6000, detail: 'Chiclets, osos, aros, gusanos y tocineta' },
  combo2: { name: 'Combo 2', price: 8000, detail: 'Chiclets, osos, aros, gusanos, tocineta, Bon Bon Bum, Candy Ranch, Oka Loka y paleta de 3 corazones' },
};

const VASOS = [
  { name: '9 oz', price: 12000 },
  { name: '12 oz', price: 15000 },
  { name: '16 oz · Supersediento', price: 25000 },
];

const ADICIONALES = ['combo1', 'combo2'];

export const PRODUCTS: Product[] = [
  /* ---------- Granizados ---------- */
  {
    id: 'climax', category: 'granizados',
    name: 'Clímax', desc: 'Vodka y lulo. Ácido, fresco y con carácter.',
    sizes: VASOS, toppings: ADICIONALES,
    colors: { top: '#e6f26a', bottom: '#8fbf2a' },
  },
  {
    id: 'tentacion', category: 'granizados', featured: true, badge: 'Favorito',
    name: 'Tentación', desc: 'Fresa, whisky y vodka. El que nadie resiste.',
    sizes: VASOS, toppings: ADICIONALES,
    colors: { top: '#ff7a98', bottom: '#c2183f', syrup: '#ffd6df' },
  },
  {
    id: 'capricho', category: 'granizados',
    name: 'Capricho', desc: 'Vodka y chicle. Dulce, rosado y peligroso.',
    sizes: VASOS, toppings: ADICIONALES,
    colors: { top: '#ffb3e6', bottom: '#ff4fb8' },
  },
  {
    id: 'barbie', category: 'granizados', featured: true, badge: 'Top',
    name: 'Barbie', desc: 'Vodka y frutos rojos. Rosado de pies a cabeza.',
    sizes: VASOS, toppings: ADICIONALES,
    colors: { top: '#ff8fc7', bottom: '#d61f7a', syrup: '#ffe1f0' },
  },
  {
    id: 'exotico', category: 'granizados',
    name: 'Exótico', desc: 'Con vodka Smirnoff. Limpio, frío y directo.',
    sizes: VASOS, toppings: ADICIONALES,
    colors: { top: '#c9f1ff', bottom: '#4fb6ee' },
  },
  {
    id: 'beso-negro', category: 'granizados',
    name: 'Beso negro', desc: 'Arándano y perla negra. Oscuro e intenso.',
    sizes: VASOS, toppings: ADICIONALES,
    colors: { top: '#9b5de5', bottom: '#2a0f45', syrup: '#14081f' },
  },
  {
    id: 'pikarico', category: 'granizados',
    name: 'Pikarico', desc: 'Vodka de tamarindo. Agridulce con picante.',
    sizes: VASOS, toppings: ADICIONALES,
    colors: { top: '#e0a35c', bottom: '#7a3d14', syrup: '#c4122f' },
  },

  /* ---------- Para compartir ---------- */
  {
    id: 'minipecera', category: 'compartir', shape: 'bowl', flavorPick: true,
    name: 'Minipecera', desc: 'Pecera pequeña con el sabor que quieras, pitillos y dulces para compartir.',
    sizes: [{ name: 'Minipecera', price: 60000 }], toppings: [],
    colors: { top: '#ff8fc7', bottom: '#a63bff' },
  },
  {
    id: 'pecera', category: 'compartir', shape: 'bowl', flavorPick: true,
    name: 'Pecera', desc: 'La pecera grande, con tu sabor favorito, pitillos y dulces para todo el parche.',
    sizes: [{ name: 'Pecera', price: 80000 }], toppings: [],
    colors: { top: '#7ebbf2', bottom: '#a63bff' },
  },
  {
    id: 'minineverita', category: 'compartir', shape: 'cooler', flavorPick: true,
    name: 'Minineverita', desc: 'Neverita con coctel de tu sabor favorito y toppings, para compartir.',
    sizes: [{ name: 'Minineverita', price: 70000 }], toppings: [],
    colors: { top: '#ff7a98', bottom: '#c2183f' },
  },
  {
    id: 'neverita', category: 'compartir', shape: 'cooler', flavorPick: true, featured: true, badge: 'Para el parche',
    name: 'Neverita', desc: 'Incluye 3 litros de coctel, 2 bebidas, shots de vodka y toppings.',
    sizes: [{ name: 'Neverita', price: 110000 }], toppings: [],
    colors: { top: '#ff5a6e', bottom: '#8c0f22' },
  },

  /* ---------- Shots ---------- */
  {
    id: 'shot', category: 'shots', shape: 'shot',
    name: 'Shot', desc: 'Shot de vodka para acompañar tu granizado.',
    sizes: [{ name: 'Shot', price: 5000 }], toppings: [],
    colors: { top: '#e9f6ff', bottom: '#7ebbf2' },
  },
];

/** Sabores que se pueden escoger en peceras y neveritas. */
export const FLAVORS = PRODUCTS.filter((p) => p.category === 'granizados').map((p) => p.name);

export const FAQS: Faq[] = [
  { q: '¿Venden a menores de edad?', a: 'No. Nuestros granizados tienen licor y solo los vendemos a mayores de 18 años. Al entregar podemos pedirte el documento.' },
  { q: '¿Hacen domicilios?', a: 'Sí. Arma tu pedido aquí, envíalo por WhatsApp y te confirmamos el valor del domicilio según tu barrio. Va sellado para que llegue frío.' },
  { q: '¿Cuál es el Supersediento?', a: 'Es el vaso de 16 oz: el más grande, para los que tienen mucha sed.' },
  { q: '¿Qué traen los combos de adicionales?', a: `Combo 1: ${TOPPINGS['combo1'].detail}. Combo 2: ${TOPPINGS['combo2'].detail}.` },
  { q: '¿Cómo puedo pagar?', a: `Recibimos ${CONFIG.paymentMethods.join(', ')}. Te mandamos los datos por WhatsApp cuando confirmemos tu pedido.` },
];

export const MARQUEE = ['#TeamSedientos', 'Granizados', 'Con licor', 'Peceras', 'Neveritas', 'Domicilios'];

/** Avisos obligatorios para venta de bebidas alcohólicas en Colombia. */
export const LEGAL = [
  'Prohibido el expendio de bebidas embriagantes a menores de edad.',
  'El exceso de alcohol es perjudicial para la salud.',
];
