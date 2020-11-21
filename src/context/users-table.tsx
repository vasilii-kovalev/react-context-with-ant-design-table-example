import * as React from 'react';

type CheckedKey = string;

interface UsersTableState {
  checkedKeys: CheckedKey[];
}

const actionTypes = {
  toggleCheckedKey: 'TOGGLE_CHECKED_KEY',
} as const;

interface ToggleCheckedKey {
  type: typeof actionTypes.toggleCheckedKey;
  checkedKey: CheckedKey;
}

type UsersTableAction = ToggleCheckedKey;

type UsersTablesDispatch = React.Dispatch<UsersTableAction>;

type UsersTableReducer = React.Reducer<UsersTableState, UsersTableAction>;

interface IUsersTableProvider {
  initialValue?: UsersTableState;
  reducer?: UsersTableReducer;
}

const defaultInitialValue: UsersTableState = {
  checkedKeys: [],
};

const defaultReducer: UsersTableReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.toggleCheckedKey: {
      const { checkedKey } = action;
      const { checkedKeys } = state;

      if (checkedKeys.includes(checkedKey)) {
        return {
          ...state,
          checkedKeys: checkedKeys.filter(key => key !== checkedKey),
        };
      }

      return {
        ...state,
        checkedKeys: checkedKeys.concat(checkedKey),
      };
    }

    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
};

const UsersTableContext = React.createContext<{
  state: UsersTableState;
  dispatch: React.Dispatch<UsersTableAction>;
}>({
  state: defaultInitialValue,
  dispatch: () => {},
});

const UsersTableProvider: React.FC<IUsersTableProvider> = ({
  initialValue = defaultInitialValue,
  reducer = defaultReducer,
  children,
}) => {
  const [state, dispatch] = React.useReducer<UsersTableReducer>(
    reducer,
    initialValue
  );

  const value = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <UsersTableContext.Provider value={value}>
      {children}
    </UsersTableContext.Provider>
  );
};

const useUsersTable = () => {
  const usersTable = React.useContext(UsersTableContext);

  if (usersTable === undefined) {
    throw new Error(`useUsersTable must be used within a UsersTableProvider`);
  }

  return usersTable;
};

const toggleCheckedKey = (
  dispatch: UsersTablesDispatch,
  checkedKey: CheckedKey
) => dispatch({ type: actionTypes.toggleCheckedKey, checkedKey });

export { UsersTableProvider, useUsersTable, toggleCheckedKey };
