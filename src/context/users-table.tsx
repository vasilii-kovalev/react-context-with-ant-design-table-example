import * as React from 'react';
import {
  ContextState,
  defaultContextState,
  tableHookCreator,
  tableProviderCreator,
  TableProviderProps,
} from './table';

const UsersTableContext = React.createContext<ContextState>(
  defaultContextState
);
UsersTableContext.displayName = 'UsersTableContext';

const UsersTableProvider: React.FC<TableProviderProps> = tableProviderCreator(
  UsersTableContext
);
UsersTableProvider.displayName = 'UsersTableProvider';

const useUsersTable = tableHookCreator(
  UsersTableContext,
  'useUsersTable',
  'UsersTableContext'
);

export { UsersTableProvider, useUsersTable };
