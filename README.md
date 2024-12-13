# Disclaimers

There are some potential improvement for the demo project:

1. Using react-quill (which meets the requirement) will throw errors in console, since findDOMNode is deprecated in React 19. Even though the current project uses React 18. I am bound to using specific NPM packages, so I can't use React 19.
2. Css file has been used for simplicity, in the real world I would use any CSS-in-JS, SCSS, styled-components, other utility css, etc
3. There is a way to improve potential re-renders by using useMemo, useCallback + React.memo combo but I would rather use it if the situaton demands (memoization is also a trade-off).
4. I am silently blocking the addition of duplicate bullets. This could be improved by displaying a toast message.
5. I decided not to store Option object in schema to make it clean for "API" DTO but this requires transforming field value string into Option as this is what react-select expect. Alternative would be using field value directly, but the trade-off is changing the schema to be an object and adding tranformation to API-friendly format since we need values of Options only.
6. There are small inconsistencies between the inputs (e.g., different border colors, no border radius for the rich text area, and varying heights). Ideally, these should be adjusted to align with a single design system. However, since the sources for the controls come from different NPM packages, I don't think it's crucial to address this for the demo.

Below is the default Readme for React + TypeScript + Vite boilerplate

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react"

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
})
```
