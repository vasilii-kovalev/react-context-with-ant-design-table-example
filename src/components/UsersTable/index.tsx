import { ColumnType } from 'antd/es/table';
import * as React from 'react';
import { useQuery } from 'react-query';
import { build, fake } from '@jackfranklin/test-data-bot';
import { Table } from 'components/Table';
import { tableCells } from 'components/TableCell';
import { useUsersTable, toggleCheckedKey } from 'context/users-table';
import type { ITableCellCheckbox } from 'components/TableCell/Checkbox';

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const withUser = (Component: React.FC<ITableCellCheckbox>) => {
  const AugmentedCheckbox = (user: User) => {
    const {
      state: { checkedKeys },
      dispatch,
    } = useUsersTable();
    const userId = user.id;

    return (
      <Component
        {...user}
        dataIndex={userId}
        checked={checkedKeys.includes(userId)}
        onCheck={() => toggleCheckedKey(dispatch, userId)}
      />
    );
  };

  return AugmentedCheckbox;
};

const userBuilder = build<User>('User', {
  fields: {
    id: fake(faker => faker.random.uuid()),
    firstName: fake(faker => faker.name.firstName()),
    lastName: fake(faker => faker.name.lastName()),
  },
});

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
    render: withUser(tableCells.checkbox),
  },
];

const users = new Array(5).fill(null).map(() => userBuilder());

const UsersTable: React.FC = () => {
  const { data } = useQuery('users', () => Promise.resolve(users));

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export { UsersTable };
