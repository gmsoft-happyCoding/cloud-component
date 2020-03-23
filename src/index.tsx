import React, { lazy, useMemo, ReactNode, forwardRef } from 'react';
import { flowRight } from 'lodash';
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

function create(moduleLoader: any, registrySever: string, mapper?: UrlMapper) {
  const loader = createLoader(moduleLoader, registrySever, mapper);

  /**
   * 通过 url or name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const loadComponent = ({ name, url }: RegistryInfo) =>
    flowRight(wrapSuspense, lazy, loader)({ name, url });

  /**
   * 通过 prop.url or prop.name 加载组件
   * name = project/component
   * 优先级: url > name
   */
  const CloudComponent = forwardRef(
    (props: RegistryInfo & SuspenseProps & AnyProps, ref: React.Ref<any>) => {
      const { name, url, ...restProps } = props;
      const Component = useMemo(() => loadComponent({ name, url }), [name, url]);
      // delete component when unmount
      // React.useEffect(() => () => SystemJS.delete(url), []);
      return <Component {...restProps} ref={ref} />;
    }
  );

  return { loadComponent, CloudComponent };
}

export default create;
