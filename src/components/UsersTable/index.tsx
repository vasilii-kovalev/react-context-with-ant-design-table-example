import { ColumnType } from 'antd/es/table';
import * as React from 'react';
import { useQuery } from 'react-query';
import { build, fake } from '@jackfranklin/test-data-bot';
import { Table } from '../Table';
import { tableCells } from '../TableCell';
import { useUsersTable } from 'context/users-table';
import { TableCellCheckboxProps } from 'components/TableCell/Checkbox';
import { toggleCheckedKey } from 'context/table';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const userBuilder = build<User>('User', {
  fields: {
    id: fake(faker => faker.random.uuid()),
    firstName: fake(faker => faker.name.firstName()),
    lastName: fake(faker => faker.name.lastName()),
  },
});

const users = new Array(5).fill(null).map(() => userBuilder());

const withSelectedUser = (Component: React.FC<TableCellCheckboxProps>) => {
  const MemoizedComponent = React.memo(Component);

  return function UserCell(user: User) {
    const {
      state: { checkedKeys },
      dispatch,
    } = useUsersTable();
    const userId = user.id;

    const checked = checkedKeys.includes(userId);
    const handleCheck = React.useCallback(
      () => toggleCheckedKey(dispatch, userId),
      [dispatch, userId]
    );

    return (
      <MemoizedComponent
        {...user}
        dataIndex={userId}
        checked={checked}
        onCheck={handleCheck}
      />
    );
  };
};

const columns: ColumnType<User>[] = [
  {
    title: 'First name',
    dataIndex: 'firstName',
    width: '40%',
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    width: '40%',
  },
  {
    title: 'Selected',
    render: withSelectedUser(tableCells.checkbox),
  },
];

const UsersTable: React.FC = () => {
  const { data } = useQuery('users', () => Promise.resolve(users));

  return (
    <Table columns={columns} dataSource={data} pagination={false} rowKey="id" />
  );
};

export { UsersTable };

export type { User };
