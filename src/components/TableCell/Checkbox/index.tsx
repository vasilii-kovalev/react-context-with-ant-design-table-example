import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as React from 'react';

interface ITableCellCheckbox {
  dataIndex: string | number;
  checked?: boolean;
  onCheck?: (event: CheckboxChangeEvent) => void;
}

const TableCellCheckbox: React.FC<ITableCellCheckbox> = ({
  dataIndex,
  checked,
  onCheck,
}) => {
  console.log(checked);
  console.log(onCheck);

  return <Checkbox key={dataIndex} checked={checked} onChange={onCheck} />;
};

export { TableCellCheckbox };

export type { ITableCellCheckbox };
