import * as React from 'react';

type CheckedKey = string;

interface ColorsTableState {
  checkedKeys: CheckedKey[];
}

const actionTypes = {
  toggleCheckedKey: 'TOGGLE_CHECKED_KEY',
} as const;

interface ToggleCheckedKey {
  type: typeof actionTypes.toggleCheckedKey;
  checkedKey: CheckedKey;
}

type ColorsTableAction = ToggleCheckedKey;

type ColorsTablesDispatch = React.Dispatch<ColorsTableAction>;

type ColorsTableReducer = React.Reducer<ColorsTableState, ColorsTableAction>;

interface ColorsTableProviderProps {
  initialValue?: ColorsTableState;
  reducer?: ColorsTableReducer;
}

const defaultInitialValue: ColorsTableState = {
  checkedKeys: [],
};

const defaultReducer: ColorsTableReducer = (state, action) => {
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

const ColorsTableContext = React.createContext<{
  state: ColorsTableState;
  dispatch: React.Dispatch<ColorsTableAction>;
}>({
  state: defaultInitialValue,
  dispatch: () => {},
});

const ColorsTableProvider: React.FC<ColorsTableProviderProps> = ({
  initialValue = defaultInitialValue,
  reducer = defaultReducer,
  children,
}) => {
  const [state, dispatch] = React.useReducer<ColorsTableReducer>(
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
    <ColorsTableContext.Provider value={value}>
      {children}
    </ColorsTableContext.Provider>
  );
};

const useColorsTable = () => {
  const colorsTable = React.useContext(ColorsTableContext);

  if (colorsTable === undefined) {
    throw new Error(`useColorsTable must be used within a ColorsTableProvider`);
  }

  return colorsTable;
};

const toggleCheckedKey = (
  dispatch: ColorsTablesDispatch,
  checkedKey: CheckedKey
) => dispatch({ type: actionTypes.toggleCheckedKey, checkedKey });

export { ColorsTableProvider, useColorsTable, toggleCheckedKey };
