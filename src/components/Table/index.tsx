import AntDesignTable, { TableProps } from 'antd/es/table';
import * as React from 'react';

const TableInner = <RecordType extends object = any>(
  props: TableProps<RecordType>
) => <AntDesignTable {...props} />;

// React.memo doesn't work correctly with generics
// Solution: https://stackoverflow.com/a/60170425/11293963
export const Table = React.memo(TableInner) as typeof TableInner;
