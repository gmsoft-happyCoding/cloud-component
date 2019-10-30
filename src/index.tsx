import React, { lazy, useMemo, ReactNode } from 'react';
import { flowRight } from 'lodash';
import { RegistryInfo, AnyProps, SuspenseProps } from './typing.d';
import wrapSuspense from './wrapSuspense';
import createLoader from './createLoader';
import { ConfigContext, ConfigConsumerProps } from './context';

export interface CloudComponentConfigProviderProps extends ConfigConsumerProps {
  children?: ReactNode;
}

export const CloudComponentConfigProvider = ({
  children,
  ...restProps
}: CloudComponentConfigProviderProps) => (
  <ConfigContext.Provider value={restProps}>{children}</ConfigContext.Provider>
);

function create(moduleLoader: any, registrySever: string) {
  const loader = createLoader(moduleLoader, registrySever);

  /**
   * 通过 url or name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const loadComponent = ({ name, url, fallback }: RegistryInfo & SuspenseProps) =>
    flowRight(
      wrapSuspense,
      lazy,
      loader
    )({ name, url, fallback });

  /**
   * 通过 prop.url or prop.name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const CloudComponent = (props: RegistryInfo & SuspenseProps & AnyProps) => {
    const { name, url, fallback } = props;
    const Component = useMemo(() => loadComponent({ name, url, fallback }), [name, url, fallback]);
    // delete component when unmount
    // React.useEffect(() => () => SystemJS.delete(url), []);
    return <Component {...props} />;
  };

  return { loadComponent, CloudComponent };
}

export default create;
