# Instagram Design System

Catálogo interativo de Design System extraído com a skill **extract-ds**, acompanhado de um site informativo sobre o Instagram construído reutilizando os mesmos tokens visuais.

## Como executar localmente

```bash
npm install
npm run dev
```

O site principal fica em `http://localhost:3000/`. O catálogo do Design System fica em `http://localhost:3000/design-system.html#overview` e `http://localhost:3000/design-system.html#components`.

## Publicação

O workflow em `.github/workflows/deploy-pages.yml` publica automaticamente o conteúdo de `dist/` no GitHub Pages a cada push em `main`.

Site: https://flavinhotop245.github.io/Instagram-Design-System/

## Estrutura

- `index.html`: site informativo do Instagram.
- `design-system.html`: catálogo principal com Overview e Components.
- `assets/overview/index.html`: cópia funcional usada pelo catálogo.
- `src/`: estilos e interações do site principal.
