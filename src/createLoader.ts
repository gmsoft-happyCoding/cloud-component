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

  /**
   * 如果没有指定moduleLoader
   * 在全局变量中查找合适的moduleLoader
   */
  if (!moduleLoader) {
    if (window.System) {
      moduleLoader = window.System;
    } else if (window.require) {
      moduleLoader = window.require;
    } else {
      const error = '没有指定moduleLoader, 在全局变量中也没有找到适合的moduleLoader!';
      // eslint-disable-next-line no-console
      console.error('moduleLoader Error =>', error);
      throw new Error(error);
    }
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

    /**
     * why return await promise
     * 为了捕获加载失败的异常
     * https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
     */
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
