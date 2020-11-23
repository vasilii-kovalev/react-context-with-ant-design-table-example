import * as React from 'react';

type CheckedKey = string;

interface TableState {
  checkedKeys: CheckedKey[];
}

const actionTypes = {
  toggleCheckedKey: 'TOGGLE_CHECKED_KEY',
} as const;

interface ToggleCheckedKey {
  type: typeof actionTypes.toggleCheckedKey;
  checkedKey: CheckedKey;
}

type TableAction = ToggleCheckedKey;

type TablesDispatch = React.Dispatch<TableAction>;

type TableReducer = React.Reducer<TableState, TableAction>;

interface ContextState {
  state: TableState;
  dispatch: React.Dispatch<TableAction>;
}

type TableContext = React.Context<ContextState>;

interface TableProviderProps {
  initialValue?: TableState;
  reducer?: TableReducer;
}

const defaultInitialValue: TableState = {
  checkedKeys: [],
};

const defaultContextState: ContextState = {
  state: defaultInitialValue,
  dispatch: () => {},
};

const defaultReducer: TableReducer = (state, action) => {
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

const tableProviderCreator = (Context: TableContext) => {
  const TableProvider: React.FC<TableProviderProps> = ({
    initialValue = defaultInitialValue,
    reducer = defaultReducer,
    children,
  }) => {
    const [state, dispatch] = React.useReducer(reducer, initialValue);

    const value = React.useMemo(
      () => ({
        state,
        dispatch,
      }),
      [state, dispatch]
    );

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return TableProvider;
};

const tableHookCreator = (
  Context: TableContext,
  hookName: string,
  providerName: string
) => {
  /*
    It is not possible to create a function and then change its name,
    because it's read-only. With this hack hooks' names will look like this:
    * UsersTable
    * ColorsTable

    instead of:
    * Table
    * Table

    Also React.useDebug value can be used, but it places the given value AFTER
    a hook's name like this:
    * Table: "useUsersTable"
    * Table: "useColorsTable"
    which is not I wanted.

    Inspired by: https://stackoverflow.com/a/41854075/11293963
  */
  return {
    [hookName]() {
      const tableState = React.useContext(Context);

      if (tableState === undefined) {
        throw new Error(`${hookName} must be used within ${providerName}`);
      }

      return tableState;
    },
  }[hookName];
};

const toggleCheckedKey = (dispatch: TablesDispatch, checkedKey: CheckedKey) =>
  dispatch({ type: actionTypes.toggleCheckedKey, checkedKey });

export {
  defaultContextState,
  tableHookCreator,
  tableProviderCreator,
  toggleCheckedKey,
};

export type { TableProviderProps, ContextState };
