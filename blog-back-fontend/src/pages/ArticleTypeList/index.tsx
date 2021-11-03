import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { Spin, Button } from 'antd';
import styles from './index.less';
import TypeTable from './TypeTable';
export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {}, []);
  return (
    <PageContainer className={styles.main}>
      <Button className={styles['write-btn']}>新增文章类型</Button>
      <TypeTable />
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div>
    </PageContainer>
  );
};
