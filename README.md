# Design System

Catálogo interativo de Design System extraído com a skill **extract-ds**.

## Como executar

Para abrir o catálogo com suporte completo aos módulos e assets da página:

```bash
python -m http.server 3000
```
ou
```bash
npx serve .
```

Depois acesse no navegador:
- **Overview (Visão Geral):** [http://localhost:3000/design-system.html#overview](http://localhost:3000/design-system.html#overview)
- **Components (Biblioteca de Componentes):** [http://localhost:3000/design-system.html#components](http://localhost:3000/design-system.html#components)

## Estrutura de arquivos

- `design-system.html`: Catálogo principal com abas interativas Overview / Components e barra de navegação sticky.
- `assets/overview/index.html`: Cópia funcional do site com textos editoriais e de marketing adaptados para demonstrar o design system.
