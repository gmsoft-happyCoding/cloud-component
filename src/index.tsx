import React, { lazy, useMemo } from 'react';
import { flowRight } from 'lodash';
import { RegistryInfo, AnyProps } from './typing.d';
import wrapSuspense from './wrapSuspense';
import createLoader from './createLoader';

function create(moduleLoader: any, registrySever: string) {
  const loader = createLoader(moduleLoader, registrySever);

  /**
   * 通过 url or name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const loadComponent = ({ name, url }: RegistryInfo) =>
    flowRight(
      wrapSuspense,
      lazy,
      loader
    )({ name, url });

  /**
   * 通过 prop.url or prop.name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const CloudComponent = (props: RegistryInfo & AnyProps) => {
    const { name, url } = props;
    const Component = useMemo(() => loadComponent({ name, url }), [name, url]);
    // delete component when unmount
    // React.useEffect(() => () => SystemJS.delete(url), []);
    return <Component {...props} />;
  };

  return { loadComponent, CloudComponent };
}

export default create;
