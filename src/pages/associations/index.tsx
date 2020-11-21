import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import Layout from 'antd/es/layout';
import notification from 'antd/es/notification';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AssociationsTable, Association } from 'components/AssociationsTable';

const AssociationsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [associations, setAssociations] = React.useState<Association[] | null>(
    null
  );

  const handleSubmit = () => {
    const associations: Association[] = form.getFieldsValue().associations;

    const areAllColorsAssociated = associations
      .map(({ color }) => color)
      .every(Boolean);

    if (!areAllColorsAssociated) {
      return notification.open({
        message: 'Please, associate all the user-color pairs',
        placement: 'bottomLeft',
      });
    }

    setAssociations(associations);
  };

  return (
    <Layout style={{ padding: 8 }}>
      <Layout.Content>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AssociationsTable form={form} />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Space>
              <Button onClick={handleSubmit}>Submit</Button>
              <Link to="/">Back to Main page</Link>
            </Space>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {!associations ? null : (
            <code style={{ whiteSpace: 'pre-wrap', padding: 8 }}>
              {JSON.stringify(associations, null, 2)}
            </code>
          )}
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export { AssociationsPage };

export default AssociationsPage;
