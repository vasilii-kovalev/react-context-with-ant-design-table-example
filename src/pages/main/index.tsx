import Button from 'antd/es/button';
import Col, { ColProps } from 'antd/es/col';
import Layout from 'antd/es/layout';
import notification from 'antd/es/notification';
import Row, { RowProps } from 'antd/es/row';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { UsersTable } from 'components/UsersTable';
import { ColorsTable } from 'components/ColorsTable';
import { useUsersTable } from 'context/users-table';
import { useColorsTable } from 'context/colors-table';

const layoutStyle: React.CSSProperties = { padding: 8 };
const rowGutter: RowProps['gutter'] = [16, 16];
const colSpan: ColProps['span'] = 12;

const MainPage: React.FC = () => {
  const history = useHistory();
  const {
    state: { checkedKeys: usersSelectedKeys },
  } = useUsersTable();
  const {
    state: { checkedKeys: colorsSelectedKeys },
  } = useColorsTable();
  const isAnyUserSelected = usersSelectedKeys.length > 0;
  const isAnyColorSelected = colorsSelectedKeys.length > 0;

  const handleClick = React.useCallback(() => {
    if (!isAnyUserSelected) {
      return notification.open({
        message: 'Please, select at least one user',
        placement: 'bottomLeft',
      });
    }

    if (!isAnyColorSelected) {
      return notification.open({
        message: 'Please, select at least one color',
        placement: 'bottomLeft',
      });
    }

    history.push('/associations');
  }, [isAnyUserSelected, isAnyColorSelected, history]);

  return (
    <Layout style={layoutStyle}>
      <Layout.Content>
        <Row gutter={rowGutter}>
          <Col span={colSpan}>
            <UsersTable />
          </Col>
          <Col span={colSpan}>
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
