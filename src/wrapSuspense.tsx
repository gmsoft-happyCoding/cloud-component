import React, { Suspense } from "react";
import Loading from "./Loading";

const wrapSuspense = Component => props => (
  <Suspense fallback={<Loading tip="加载中..." />}>
    <Component {...props} />
  </Suspense>
);

export default wrapSuspense;
