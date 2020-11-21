import Select from 'antd/es/select';
import * as React from 'react';

interface SelectOption {
  label: string;
  value: string | number;
}

interface TableCellSelectProps {
  data: SelectOption[];
}

const TableCellSelect: React.FC<TableCellSelectProps> = ({
  data,
  ...otherProps
}) => {
  const options = data.map(({ label, value }) => (
    <Select.Option key={value} value={value}>
      {label}
    </Select.Option>
  ));

  return <Select {...otherProps}>{options}</Select>;
};

export { TableCellSelect };

export type { TableCellSelectProps };
