# Prototipo Móvil — App de Domino's (React Native + Expo Router)

Prototipo funcional de interfaz móvil con 3 pantallas interactivas — **Login → Menú → Pedido** (con Detalle de producto).

## Descripción

Aplicación móvil que simula el flujo de pedido de una pizzería: inicio de sesión, catálogo de productos por categorías y resumen de pedido con cálculo de subtotal, envío y total. Es un prototipo de **UI/UX**: no requiere base de datos, backend ni autenticación real.

## Tecnologías

- [Expo](https://expo.dev/) (SDK 57)
- [Expo Router](https://docs.expo.dev/router/introduction/) — navegación basada en archivos
- React Native + TypeScript
- Context API (estado del carrito en memoria)

## Requisitos

- Node.js LTS instalado
- App **Expo Go** en tu celular (Android/iOS), o un emulador

## Instalación

```bash
npm install
npx expo start
```

Escanea el QR con Expo Go (Android) o la cámara (iOS) para probarlo en tu dispositivo.

## Estructura del proyecto

```
src/
├── app/
│   ├── _layout.tsx          -> Stack Navigator raíz + CartProvider
│   ├── index.tsx            -> Pantalla 1: Login
│   ├── principal.tsx        -> Pantalla 2: Menú (categorías + productos)
│   ├── detalle.tsx          -> Pantalla 3: Detalle del producto
│   └── pedido.tsx           -> Pantalla 4: Resumen y confirmación de pedido
├── components/
│   └── StepIndicator.tsx    -> Barra "1. Login / 2. Menú / 3. Pedido"
├── constants/
│   ├── theme.ts             -> Colores, spacing y radios compartidos
│   └── menu.ts              -> Catálogo de productos (mock) + categorías
├── hooks/
│   └── useCart.ts           -> Contexto y hook del carrito (estado en memoria)
├── declarations.d.ts        -> Tipado de módulos CSS para TypeScript
└── global.css               -> Estilos globales
```

## Flujo de navegación

1. **Login** (`index.tsx`) — formulario de correo y contraseña; "Iniciar sesión" navega al menú.
2. **Menú** (`principal.tsx`) — pestañas de categorías (Pizzas, Entradas, Bebidas, Postres), lista de productos con selector de cantidad (+/−); tocar un producto abre su **Detalle**.
3. **Detalle** (`detalle.tsx`) — información completa del producto seleccionado, con control de cantidad.
4. **Pedido** (`pedido.tsx`) — resumen del carrito: subtotal, costo de envío (S/ 5.00) y total, con botón "Confirmar pedido".

La barra de pasos superior (`StepIndicator`) permite saltar directamente entre Login, Menú y Pedido.

## Notas

- No se requiere backend, API ni autenticación real: todo el estado del pedido vive en memoria (`useCart.ts`) mientras la app está abierta.
- Los datos del catálogo son de ejemplo (`constants/menu.ts`).

