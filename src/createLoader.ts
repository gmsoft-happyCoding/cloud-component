import axios from 'axios';
import { RegistryInfo } from './typing.d';
import createError from './createError';

// 创建组件加载器
const createLoader = (moduleLoader: any, registrySever: string) => ({
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
    if (!url && name) {
      const [projectName, componentName] = name.split('/');
      const { data } = await axios.get(
        `/api/projects/${projectName}/components/${componentName}/url`,
        {
          baseURL: registrySever,
        }
      );
      // eslint-disable-next-line prefer-destructuring
      url = data.url;
    }
    // Systemjs
    if (moduleLoader.import && typeof moduleLoader.import === 'function') {
      return await moduleLoader.import(url);
    }
    // requirejs
    return await new Promise((resolve, reject) => moduleLoader([url], resolve, reject));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('loadComponent Error =>', error);
    return createError(error.message);
  }
};

export default createLoader;
