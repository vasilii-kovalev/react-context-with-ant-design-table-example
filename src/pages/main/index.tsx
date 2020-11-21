import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Layout from 'antd/es/layout';
import notification from 'antd/es/notification';
import Row from 'antd/es/row';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UsersTable } from 'components/UsersTable';
import { ColorsTable } from 'components/ColorsTable';
import { useUsersTable } from 'context/users-table';
import { useColorsTable } from 'context/colors-table';

const MainPage: React.FC = () => {
  const history = useHistory();
  const {
    state: { checkedKeys: usersSelectedKeys },
  } = useUsersTable();
  const {
    state: { checkedKeys: colorsSelectedKeys },
  } = useColorsTable();

  const handleClick = () => {
    if (!usersSelectedKeys.length) {
      return notification.open({
        message: 'Please, select at least one user',
        placement: 'bottomLeft',
      });
    }

    if (!colorsSelectedKeys.length) {
      return notification.open({
        message: 'Please, select at least one color',
        placement: 'bottomLeft',
      });
    }

    history.push('/associations');
  };

  return (
    <Layout style={{ padding: 8 }}>
      <Layout.Content>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <UsersTable />
          </Col>
          <Col span={12}>
            <ColorsTable />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={handleClick}>Associate</Button>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export { MainPage };

export default MainPage;
