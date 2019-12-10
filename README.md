# cloud-component

> 用于远程加载 component registry 中注册的组件

[![NPM](https://img.shields.io/npm/v/cloud-component.svg)](https://www.npmjs.com/package/cloud-component)

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

---

#### custom loading
```tsx
<CloudComponent name="project/component" fallback={<CustomLoading />} />
```

---


#### custom loading by ConfigProvider
```tsx
import {CloudComponentConfigProvider} from 'cloud-component';

<CloudComponentConfigProvider fallback={<CustomLoading />} >
    <CloudComponent name="project/component1" />
    <CloudComponent name="project/component2" />
</CloudComponentConfigProvider>
```

## License

MIT © [angular-moon](https://github.com/angular-moon)
