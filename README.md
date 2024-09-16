# tm_inside

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Git submodule

```sh
git submodule update --init --recursive
```

### Compile SDK

Make sure Rust and wasm-pack is installed for this step

```sh
wasm-pack build --features wasm --no-default-features
```

### Install Deps

Bun needs to be installed for running this project, other package managers can be used but are not tested

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun build
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
