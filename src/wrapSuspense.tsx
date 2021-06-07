import React, { Suspense, useContext, useMemo, forwardRef } from 'react';
import Loading from './Loading';
import { AnyProps, SuspenseProps } from './typing.d';
import { ConfigContext } from './context';

const wrapSuspense = (Component: React.LazyExoticComponent<any>) =>
  forwardRef(({ fallback, ...restProps }: AnyProps & SuspenseProps, ref: React.Ref<any>) => {
    const context = useContext(ConfigContext);

    const fb = useMemo(() => {
      if (fallback !== undefined) {
        return fallback;
      }
      if (context && context.fallback !== undefined) {
        return context.fallback;
      }
      return <Loading />;
    }, [context, fallback]);

    return (
      <Suspense fallback={fb}>
        <Component {...restProps} ref={ref} />
      </Suspense>
    );
  });

export default wrapSuspense;
