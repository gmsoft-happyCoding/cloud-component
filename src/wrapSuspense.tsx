import React, { Suspense, useContext, useMemo } from 'react';
import Loading from './Loading';
import { AnyProps, SuspenseProps } from './typing.d';
import { ConfigContext } from './context';

const wrapSuspense = Component => ({ fallback, ...restProps }: AnyProps & SuspenseProps) => {
  const context = useContext(ConfigContext);

  const fb = useMemo(() => {
    if (fallback !== undefined) {
      return fallback;
    }
    if (context && context.fallback !== undefined) {
      return context.fallback;
    }
    return <Loading tip="加载中..." />;
  }, [context, fallback]);

  return (
    <Suspense fallback={fb}>
      <Component {...restProps} />
    </Suspense>
  );
};

export default wrapSuspense;
