import { ColumnType } from 'antd/es/table';
import Form, { FormInstance } from 'antd/es/form';
import { Table } from 'components/Table';
import { tableCells } from 'components/TableCell';
import { useColorsTable } from 'context/colors-table';
import * as React from 'react';
import { useQuery } from 'react-query';
import { User } from 'components/UsersTable';
import { Color } from 'components/ColorsTable';
import { useUsersTable } from 'context/users-table';

interface Association {
  id: string;
  firstName: string;
  color?: string;
}

const columns: ColumnType<Association>[] = [
  {
    title: 'First name',
    dataIndex: 'firstName',
    width: '40%',
    render: (value: User['firstName'], record, index) => (
      <Form.Item name={['associations', index, 'firstName']}>
        <span>{value}</span>
      </Form.Item>
    ),
  },
  {
    title: 'Color',
    width: '40%',
    render: function ColorFormItem(value: Association, record, index) {
      const {
        state: { checkedKeys },
      } = useColorsTable();
      const { data: colors = [] } = useQuery<Color[]>('colors');
      const colorsOptions = colors
        .filter(({ id }) => checkedKeys.includes(id))
        .map(({ color }) => ({
          label: color,
          value: color,
        }));

      return (
        <Form.Item name={['associations', index, 'color']}>
          <tableCells.select data={colorsOptions} />
        </Form.Item>
      );
    },
  },
  {
    title: 'Preview',
    render: (value: Association, record, index) => (
      <Form.Item shouldUpdate>
        {({ getFieldValue }) => (
          <tableCells.colorPreview
            color={getFieldValue(['associations', index, 'color'])}
          />
        )}
      </Form.Item>
    ),
  },
];

interface AssociationsTableProps {
  form: FormInstance;
}

const AssociationsTable: React.FC<AssociationsTableProps> = ({ form }) => {
  const {
    state: { checkedKeys },
  } = useUsersTable();
  const { data: users = [] } = useQuery<User[]>('users');

  const data = users
    .filter(({ id }) => checkedKeys.includes(id))
    .map(
      ({ firstName, id }): Association => ({
        id,
        firstName,
        color: undefined,
      })
    );

  return (
    <Form form={form} initialValues={{ associations: data }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
    </Form>
  );
};

export { AssociationsTable };

export type { Association };
