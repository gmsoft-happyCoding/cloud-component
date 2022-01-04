import { createContext } from 'react';
import { SuspenseProps } from './typing.d';

export interface ConfigConsumerProps extends SuspenseProps {
  ErrorComponent?: React.ComponentType<{ errorMessage: string }>;
}

export const ConfigContext = createContext<ConfigConsumerProps>({});
