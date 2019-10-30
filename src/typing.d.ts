import { ReactNode } from 'react';

export interface RegistryInfo {
  /**
   * 组件名字
   * format project/component
   */
  name?: string;
  /**
   * 组件加载的url
   */
  url?: string;
}

export interface SuspenseProps {
  fallback?: ReactNode;
}

export interface AnyProps {
  [key: string]: any;
}
