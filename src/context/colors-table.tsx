import * as React from 'react';
import {
  ContextState,
  defaultContextState,
  tableHookCreator,
  tableProviderCreator,
  TableProviderProps,
} from './table';

const ColorsTableContext = React.createContext<ContextState>(
  defaultContextState
);
ColorsTableContext.displayName = 'ColorsTableContext';

const ColorsTableProvider: React.FC<TableProviderProps> = tableProviderCreator(
  ColorsTableContext
);
ColorsTableProvider.displayName = 'ColorsTableProvider';

const useColorsTable = tableHookCreator(
  ColorsTableContext,
  'useColorsTable',
  'ColorsTableProvider'
);

export { ColorsTableProvider, useColorsTable };
