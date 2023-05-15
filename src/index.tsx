import React, { lazy, useMemo, ReactNode, forwardRef, ReactElement } from 'react';
import { flowRight, memoize } from 'lodash';
import { RegistryInfo, AnyProps, SuspenseProps, UrlMapper } from './typing.d';
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

export interface CloudComponentI {
  <P, T = any>(props: RegistryInfo & SuspenseProps & P & { ref?: React.Ref<T> }): ReactElement<
    P
  > | null;
}

function create(moduleLoader: any, registrySever: string, mapper?: UrlMapper) {
  const loader = createLoader(moduleLoader, registrySever, mapper);

  /**
   * 通过 url or name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const _loadComponent = ({ name, url }: RegistryInfo) =>
    flowRight(wrapSuspense, lazy, loader)({ name, url });

  /**
   * 缓存加载过的组件
   */
  const loadComponent = memoize(_loadComponent, JSON.stringify);

  /**
   * 通过 prop.url or prop.name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const CloudComponent: CloudComponentI = forwardRef(
    (props: RegistryInfo & SuspenseProps & AnyProps, ref: React.Ref<any>) => {
      const { name, url, ...restProps } = props;
      const Component = useMemo(() => loadComponent({ name, url }), [name, url]);

      return <Component {...restProps} ref={ref} />;
    }
  );

  return { loadComponent, CloudComponent };
}

export default create;
