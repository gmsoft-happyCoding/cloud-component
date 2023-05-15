import { useRequestInterceptor, useResponseInterceptor } from './util';
import { showNetworkError } from '@/utils';
import { axiosTokenInterceptor } from '@gmsoft/auth-sdk';

// @ts-ignore
useRequestInterceptor(axiosTokenInterceptor());

const errorHandler = error => {
  showNetworkError(error);
  return Promise.reject(error);
};

useResponseInterceptor(undefined, errorHandler);
