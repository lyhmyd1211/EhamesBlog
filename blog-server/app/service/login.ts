import { Service } from '../core/service';

export default class LoginService extends Service {
  async queryUser(username: string, password: string) {
    return await this.ctx.model.User.findAll({
      where: {
        username,
        password,
      },
    });
  }
}
