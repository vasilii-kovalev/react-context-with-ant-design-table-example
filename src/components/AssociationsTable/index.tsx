import { ColumnType } from 'antd/es/table';
import Form, { FormInstance } from 'antd/es/form';
import { Table } from '../Table';
import { tableCells } from '../TableCell';
import { useColorsTable } from 'context/colors-table';
import * as React from 'react';
import { useQuery } from 'react-query';
import { User } from '../UsersTable';
import { Color } from '../ColorsTable';
import { useUsersTable } from 'context/users-table';
import { AssociationsFormValues } from 'pages/associations';
import { TableCellColorPreviewProps } from 'components/TableCell/ColorPreview';
import { TableCellSelectProps } from 'components/TableCell/Select';

interface Association {
  id: string;
  firstName: string;
  color?: string;
}

const withColorPreview = (Component: React.FC<TableCellColorPreviewProps>) => {
  const MemoizedComponent = React.memo<{ value?: Association['color'] }>(
    ({ value, ...otherProps }) => <Component color={value} {...otherProps} />
  );

  return function AssociationColorPreview(
    value: Association,
    record: Association,
    index: number
  ) {
    return (
      // Here we just spy on this value
      <Form.Item name={['associations', index, 'color']} key={value.id}>
        <MemoizedComponent />
      </Form.Item>
    );
  };
};

const withColorSelect = (Component: React.FC<TableCellSelectProps>) => {
  const MemoizedComponent = React.memo(Component);

  return function ColorFormItem(
    value: Association,
    record: Association,
    index: number
  ) {
    const {
      state: { checkedKeys },
    } = useColorsTable();
    const { data: colors = [] } = useQuery<Color[]>('colors');
    const colorsOptions = React.useMemo(
      () =>
        colors
          .filter(({ id }) => checkedKeys.includes(id))
          .map(({ color }) => ({
            label: color,
            value: color,
          })),
      [checkedKeys, colors]
    );

    return (
      <Form.Item name={['associations', index, 'color']} key={value.id}>
        <MemoizedComponent data={colorsOptions} />
      </Form.Item>
    );
  };
};

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
    render: withColorSelect(tableCells.select),
  },
  {
    title: 'Preview',
    render: withColorPreview(tableCells.colorPreview),
  },
];

interface AssociationsTableProps {
  form: FormInstance<AssociationsFormValues>;
}

const AssociationsTable: React.FC<AssociationsTableProps> = ({ form }) => {
  const {
    state: { checkedKeys },
  } = useUsersTable();
  const { data: users = [] } = useQuery<User[]>('users');
  const data = React.useMemo(
    () =>
      users
        .filter(({ id }) => checkedKeys.includes(id))
        .map(
          ({ firstName, id }): Association => ({
            id,
            firstName,
            color: undefined,
          })
        ),
    [checkedKeys, users]
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
