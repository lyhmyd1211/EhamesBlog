// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.status(200).send({
      name: '谭秀英',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      userid: 'AD5B6fCB-F4F6-A1dB-0766-8DEa798aEDAb',
      email: 'w.ngh@groffnv.gy',
      signature: '小满公红将水流院支全容型省。',
      title: '查志且说响具该解度支低被中。',
      group: '服务技术部',
      tags: [
        { key: 1, label: '健身达人' },
        { key: 2, label: '阳光少年' },
        { key: 3, label: '阳光少年' },
        { key: 4, label: '专注设计' },
        { key: 5, label: '傻白甜' },
      ],
      notifyCount: 81,
      unreadCount: 68,
      country: '巴西',
      access: '集新数子起少复美况在方长也争识易。',
      geographic: { province: { label: '台湾', key: 6 }, city: { label: '乐山市', key: 7 } },
      address: '云南省 怒江傈僳族自治州 其它区',
      phone: '11292754174',
    });
  },
};
