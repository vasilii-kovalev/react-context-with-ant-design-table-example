import { ColumnType } from 'antd/es/table';
import * as React from 'react';
import { useQuery } from 'react-query';
import { build, fake } from '@jackfranklin/test-data-bot';
import { Table } from '../Table';
import { tableCells } from '../TableCell';
import { useColorsTable } from 'context/colors-table';
import { TableCellCheckboxProps } from 'components/TableCell/Checkbox';
import { toggleCheckedKey } from 'context/table';

interface Color {
  id: string;
  color: string;
}

const colorBuilder = build<Color>('Color', {
  fields: {
    id: fake(faker => faker.random.uuid()),
    color: fake(faker => faker.internet.color()),
  },
});

const colors = new Array(5).fill(null).map(() => colorBuilder());

const withSelectedColor = (Component: React.FC<TableCellCheckboxProps>) => {
  const MemoizedComponent = React.memo(Component);

  return function ColorCell(color: Color) {
    const {
      state: { checkedKeys },
      dispatch,
    } = useColorsTable();
    const colorId = color.id;

    const checked = checkedKeys.includes(colorId);
    const handleCheck = React.useCallback(
      () => toggleCheckedKey(dispatch, colorId),
      [dispatch, colorId]
    );

    return (
      <MemoizedComponent
        {...color}
        dataIndex={colorId}
        checked={checked}
        onCheck={handleCheck}
      />
    );
  };
};

const columns: ColumnType<Color>[] = [
  {
    title: 'Color HEX',
    dataIndex: 'color',
    width: '40%',
  },
  {
    title: 'Preview',
    width: '40%',
    render: tableCells.colorPreview,
  },
  {
    title: 'Selected',
    render: withSelectedColor(tableCells.checkbox),
  },
];

const ColorsTable: React.FC = () => {
  const { data } = useQuery('colors', () => Promise.resolve(colors));

  return (
    <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
  );
};

export { ColorsTable };

export type { Color };
