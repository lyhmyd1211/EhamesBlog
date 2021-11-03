// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/rule': (req: Request, res: Response) => {
    res
      .status(200)
      .send({
        key: 75,
        disabled: false,
        href: 'https://umijs.org/',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        name: '龚明',
        owner: 'Rodriguez',
        desc: '华并正铁切被外前油石问方部形级她日。',
        callNo: 76,
        status: 68,
        updatedAt: 'II)*',
        createdAt: '^qr',
        progress: 89,
      });
  },
};
