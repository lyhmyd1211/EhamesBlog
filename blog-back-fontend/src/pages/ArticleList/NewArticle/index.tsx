import { Card, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
// import styles from './style.less';

const NewArticle: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };

  return (
    <PageContainer>
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="horizontal"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
            placeholder="给目标起个名字"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default NewArticle;
