import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as React from 'react';

interface TableCellCheckboxProps {
  dataIndex: string | number;
  checked?: boolean;
  onCheck?: (event: CheckboxChangeEvent) => void;
}

const TableCellCheckbox: React.FC<TableCellCheckboxProps> = ({
  dataIndex,
  checked,
  onCheck,
}) => <Checkbox key={dataIndex} checked={checked} onChange={onCheck} />;

export { TableCellCheckbox };

export type { TableCellCheckboxProps };
