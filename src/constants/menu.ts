// src/constants/menu.ts
export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
}

export const CATEGORIES: string[] = ['Pizzas', 'Entradas', 'Bebidas', 'Postres'];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    category: 'Pizzas',
    name: 'Pepperoni clásica',
    description: 'Mediana, masa tradicional',
    price: 29.9,
  },
  {
    id: 'p2',
    category: 'Pizzas',
    name: 'Hawaiana',
    description: 'Piña y jamón, mediana',
    price: 31.9,
  },
  {
    id: 'p3',
    category: 'Pizzas',
    name: 'Vegetariana',
    description: 'Pimiento, champiñón, cebolla',
    price: 28.5,
  },
  {
    id: 'p4',
    category: 'Entradas',
    name: 'Palitos de ajo',
    description: 'Porción de 6 unidades',
    price: 12.9,
  },
  {
    id: 'p5',
    category: 'Bebidas',
    name: 'Gaseosa 1.5L',
    description: 'A elección',
    price: 8.5,
  },
  {
    id: 'p6',
    category: 'Postres',
    name: 'Brownie',
    description: 'Con trozos de chocolate',
    price: 9.9,
  },
];

export const DELIVERY_FEE = 5.0;
