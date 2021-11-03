import { Service as eggService } from 'egg';
import { print } from '../util';

// 重写 egg-service, Service 增加 print 对象
export class Service extends eggService {
  public print = print;
}

