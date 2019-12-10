import axios from 'axios';
import { RegistryInfo, UrlMapper } from './typing.d';
import createError from './createError';

// 创建组件加载器
const createLoader = (moduleLoader: any, registrySever: string, mapper?: UrlMapper) => ({
  name,
  url,
}: RegistryInfo) => async () => {
  if (!url && !name) {
    const error = '请传递有效的参数 url or name';
    // eslint-disable-next-line no-console
    console.error('loadComponent Error =>', error);
    return createError(error);
  }

  try {
    /**
     * 优先使用 url
     */
    let componentUrl = url;

    /**
     * 尝试在 mapper 中查找 url
     */
    if (!componentUrl && name && mapper) {
      componentUrl = mapper[name];
    }

    /**
     * 通过 registry api 获取 url
     */
    if (!componentUrl && name) {
      const [projectName, componentName] = name.split('/');
      const { data } = await axios.get(
        `/api/projects/${projectName}/components/${componentName}/url`,
        {
          baseURL: registrySever,
        }
      );

      componentUrl = data.url;
    }
    // Systemjs
    if (moduleLoader.import && typeof moduleLoader.import === 'function') {
      return await moduleLoader.import(componentUrl);
    }
    // requirejs
    return await new Promise((resolve, reject) => moduleLoader([componentUrl], resolve, reject));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('loadComponent Error =>', error);
    return createError(error.message);
  }
};

export default createLoader;
