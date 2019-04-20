# cloud-component

> 用于远程加载 component registry 中注册的组件

[![NPM](https://img.shields.io/npm/v/cloud-component.svg)](https://www.npmjs.com/package/search-page)

## Install

```bash
yarn add cloud-component
```

## Usage

#### Use systemjs as the module loader
```tsx
import SystemJS from 'systemjs';
import create from 'cloud-component';

const registryServer = process.env.REACT_APP_COMPONENT_REGISTRY_SERVER || '';

const { loadComponent, CloudComponent } = create(SystemJS, registryServer);

export { loadComponent };

export default CloudComponent;
```

---

#### Use requirejs as the module loader
```tsx
import create from 'cloud-component';

const registryServer = process.env.REACT_APP_COMPONENT_REGISTRY_SERVER || '';

/* eslint-disable global-require, import/no-dynamic-require */
// @ts-ignore
const { loadComponent, CloudComponent } = create(require, registryServer);

export { loadComponent };

export default CloudComponent;
```

## License

MIT © [angular-moon](https://github.com/angular-moon)
