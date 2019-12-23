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

#### find the module loader on the global

```tsx
import create from 'cloud-component';

const registryServer = process.env.REACT_APP_COMPONENT_REGISTRY_SERVER || '';

// 如果未指定任何模块加载器, 尝试在全局变量中查找合适的加载器(requirejs, sysyemjs)
const { loadComponent, CloudComponent } = create(null, registryServer);

export { loadComponent };

export default CloudComponent;
```

---

#### 可指定 name -> url 的映射, 用于调试, mapper 如果命中则不会再在 registry 中去查找 url

```tsx
import create from 'cloud-component';

const mapper =
  process.env.NODE_ENV === 'development'
    ? {
        'test-project/WhatToEat': 'http://test.com/WhatToEat',
      }
    : null;

const registryServer = process.env.REACT_APP_COMPONENT_REGISTRY_SERVER || '';

// 如果未指定任何模块加载器, 尝试在全局变量中查找合适的加载器(requirejs, sysyemjs)
const { loadComponent, CloudComponent } = create(null, registryServer);

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
import { CloudComponentConfigProvider } from 'cloud-component';

<CloudComponentConfigProvider fallback={<CustomLoading />}>
  <CloudComponent name="project/component1" />
  <CloudComponent name="project/component2" />
</CloudComponentConfigProvider>;
```

## License

MIT © [angular-moon](https://github.com/angular-moon)
