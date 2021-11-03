// @ts-ignore
import { Request, Response } from 'express';

export default {
  'PUT /api/rule': (req: Request, res: Response) => {
    res
      .status(200)
      .send({
        key: 71,
        disabled: true,
        href: 'https://umijs.org/',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        name: '汤娜',
        owner: 'Johnson',
        desc: '究儿电影口团当级容不记现收任两华。',
        callNo: 75,
        status: 90,
        updatedAt: 'N1Bw',
        createdAt: '4^&VzA6',
        progress: 77,
      });
  },
};
