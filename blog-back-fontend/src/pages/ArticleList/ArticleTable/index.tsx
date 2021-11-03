import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { notification, Table, Tag, Popconfirm } from 'antd';
import day from 'dayjs';
import { getArticleList, delArticle } from '@/services/ant-design-pro/article';
import type { ColumnsType } from 'antd/lib/table';

const data: API.Article[] = [
  {
    id: '01',
    key: '01',
    title: '测试文章',
    creatTime: '1633936450000',
    type: 'nicedeveloper',
  },
];

const ArticleTable = () => {
  const [colData, setColData] = useState<API.Article[]>(data);
  const fetchData = async () => {
    const res = await getArticleList();
    if (res && res.data) {
      setColData(
        res.data.map((item) => {
          item.key = item.id;
          return item;
        }),
      );
    }
  };

  const del = async (id: string) => {
    if (id) {
      const res = await delArticle({ id });
      notification[res.code === 0 ? 'success' : 'error']({
        description: res.msg,
        message: '删除提示',
      });
      fetchData();
    }
  };

  const columns: ColumnsType<API.Article> = [
    {
      title: '文章名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time: string) => <span>{day(time).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '文章类型',
      key: 'type',
      dataIndex: 'type',
      render: (tags: string) => {
        const color = 'green';
        return (
          <span>
            {
              <Tag color={color} key={tags}>
                {tags.toUpperCase()}
              </Tag>
            }
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: API.Article) => (
        <span>
          <a style={{ marginRight: 16 }}>Invite {record.title}</a>
          <Popconfirm
            title="确定删除么"
            onConfirm={() => {
              del(record.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className="article-list-main">
        <Table columns={columns} dataSource={colData} />
      </div>
    </div>
  );
};

export default ArticleTable;
