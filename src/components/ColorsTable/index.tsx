import { ColumnType } from 'antd/es/table';
import * as React from 'react';
import { useQuery } from 'react-query';
import { build, fake } from '@jackfranklin/test-data-bot';
import { Table } from 'components/Table';
import { tableCells } from 'components/TableCell';
import { useColorsTable, toggleCheckedKey } from 'context/colors-table';

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
    render: function ColorCell(color: Color) {
      const {
        state: { checkedKeys },
        dispatch,
      } = useColorsTable();
      const colorId = color.id;

      return (
        <tableCells.checkbox
          {...color}
          dataIndex={colorId}
          checked={checkedKeys.includes(colorId)}
          onCheck={() => toggleCheckedKey(dispatch, colorId)}
        />
      );
    },
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
