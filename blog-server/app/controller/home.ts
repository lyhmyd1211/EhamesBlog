import { Controller } from 'egg';

export default class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = `
      <div>
        <h2>${ctx.path}</h2>
        <a href="/admin">admin</a>
      </div>
    `;
  }

  async admin() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      console.log('ctx.user', ctx.user);
      // show user info
      ctx.body = `
        <div>
          <h3>You login</h3>
          <a href="/logout">Logout</a>
        </div>
      `;

    } else {
      // redirect to origin url by ctx.session.returnTo
      ctx.session.returnTo = ctx.path;
      // await ctx.render('login.html');
      ctx.redirect('/login');
    }
  }

  async login() {
    await this.ctx.render('login.html');
  }

  async logout() {
    const ctx = this.ctx;
    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }

  async register() {
    await this.ctx.render('register.html');
  }

  async doRegister() {
    const ctx = this.ctx;
    const User = ctx.model.User;
    console.log('model is ', User);
    const requestBody = ctx.request.body;
    const user = new User(requestBody);
    user.provider = 'local';
    const result = await user.save();
    console.log('result is ', result);
    ctx.redirect('/');
  }

  async loginCallback() {
    const { ctx, app } = this;
    const token = app.jwt.sign({
      username: ctx.user[0].username,
    }, app.config.jwt.secret);
    ctx.body = {
      status: 'ok',
      code: 0,
      type: 'account',
      msg: '登录成功',
      token,
    };

  }
  async loginFailCallback() {
    const { ctx } = this;
    ctx.body = {
      status: 'error',
      code: -1,
      type: 'account',
      msg: '用户名或密码错误',

    };
  }

  async getCurrentUser() {
    const { ctx } = this;
    const { username } = ctx.decode;
    ctx.body = {
      status: 'ok',
      data: {
        name: username,
        avatar: '',
      },

    };
  }


}
