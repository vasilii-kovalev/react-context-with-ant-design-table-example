import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Form from 'antd/es/form';
import Layout from 'antd/es/layout';
import notification from 'antd/es/notification';
import Row, { RowProps } from 'antd/es/row';
import Space from 'antd/es/space';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { AssociationsTable, Association } from 'components/AssociationsTable';

type Associations = Association[] | null;

interface AssociationsProps {
  associations: Associations;
}

interface AssociationsFormValues {
  associations: Association[];
}

const AssociationsBlock: React.FC<AssociationsProps> = ({ associations }) => {
  if (!associations) {
    return null;
  }

  return (
    <code style={{ whiteSpace: 'pre-wrap', padding: 8 }}>
      {JSON.stringify(associations, null, 2)}
    </code>
  );
};

const layoutStyle: React.CSSProperties = { padding: 8 };
const rowGutter: RowProps['gutter'] = [16, 16];

const AssociationsPage: React.FC = () => {
  const [form] = Form.useForm<AssociationsFormValues>();
  const [associations, setAssociations] = React.useState<Associations>(null);

  const handleSubmit = React.useCallback(() => {
    const { associations } = form.getFieldsValue();

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
  }, [form]);

  return (
    <Layout style={layoutStyle}>
      <Layout.Content>
        <Row gutter={rowGutter}>
          <Col span={24}>
            <AssociationsTable form={form} />
          </Col>
        </Row>
        <Row gutter={rowGutter}>
          <Col>
            <Space>
              <Button onClick={handleSubmit}>Submit</Button>
              <Link to="/">Back to Main page</Link>
            </Space>
          </Col>
        </Row>
        <Row gutter={rowGutter}>
          <AssociationsBlock associations={associations} />
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export { AssociationsPage };

export type { Associations, AssociationsProps, AssociationsFormValues };

export default AssociationsPage;
