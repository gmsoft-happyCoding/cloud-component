import { createContext } from 'react';
import { SuspenseProps } from './typing.d';

export interface ConfigConsumerProps extends SuspenseProps {}

export const ConfigContext = createContext<ConfigConsumerProps>({});
