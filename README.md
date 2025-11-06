# MVT Noticias (Express + TypeScript + Vanilla CSS)

Aplicación web estilo MVT que renderiza HTML desde funciones TypeScript (sin EJS), con búsqueda y paginación en el servidor, pruebas unitarias y E2E.

## Requisitos
- Node.js 18+
- Windows PowerShell (este repo usa scripts compatibles en Windows)

## Instalar

```powershell
npm install
```

## Ejecutar en desarrollo

```powershell
npm run dev
```

Se iniciará el servidor en http://localhost:34444

## Compilar y ejecutar build (JS)

```powershell
npm run build
node .\build\index.js

El servidor de producción también escucha en http://localhost:34444
```

## Pruebas

- Unit + E2E (jest + supertest)

```powershell
npm test
```

Si ves advertencias de ts-jest (TS151002), ya está habilitado `isolatedModules` en `tsconfig.json`.

## Estructura
- `src/news/*`: modelo, vistas y router para Noticias (búsqueda/paginación servidor)
- `src/template/renderer.ts`: funciones TS que generan el HTML (layout, menús, listas, detalle)
- `src/public/css/app.css`: estilos oscuro azul/negro
- `database/news.json`: dataset local de noticias
- `test/*`: unit y e2e

## Notas
- Eliminado EJS y sus tipos del proyecto; todo el HTML se genera en TS y se envía con `res.send(...)`.
- Los scripts usan `rimraf` para limpiar `./build` en Windows.