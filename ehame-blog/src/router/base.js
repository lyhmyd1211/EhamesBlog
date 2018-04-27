import React, { Component } from 'react';
import { Affix, Card, Form, Tooltip } from 'antd';
import './base.less';
import Menu from './menu';
import Header from './header';
import BackToUp from '../customerComponent/backToup';
import { connect } from 'react-redux';
import { fetchLoginState } from '../redux-root/action/login';
import LoginCard from '../component/login/login_modal/loginForm';
import HasLogin from '../component/login/login_modal/hasLogin';
import cardImg from '../assets/picture/background1.jpg';
// import { bindActionCreators } from 'redux';
const { Meta } = Card;
@connect(
  state => ({
    loginData: state.loginState.loginData,
    isScrollUp: state.scrollUp.isScrollUp,
  }),
  dispatch => ({
    isLogin: () => dispatch(fetchLoginState()),
  })
)
@Form.create()
class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: false,
      firstIn: true,
    };
  }
  componentDidMount() {
    this.props.isLogin();
  }
  render() {
    const { trigger, firstIn } = this.state;
    const { children, loginData } = this.props;

    return (
      <div className="base-main">
        <div className="header-image-main" />
        <Affix className="header-affix">
          <Header />
        </Affix>
        <div id="flex-container">
          <div className="flex-item-left">
            {/* <header className="header-head-portrait"> */}
            <Tooltip title={loginData.retCode ? '已登录' : '未登录'}>
              {/* <div className="be-cliked-div" onClick={() =>
                  this.setState({ trigger: !trigger, firstIn: false })}>翻转
                </div> */}
            </Tooltip>
            <Card
              hoverable
              style={{ width: '16vw', height: 300, margin: '0 12px' }}
              className={
                firstIn ? 'owner-meta-first' : trigger ? 'owner-meta-hide' : 'owner-meta-show'
              }
            >
              <img className="card-img" src={cardImg} alt="head-portrait" />
              <Meta title="无辣不欢" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              style={{ width: '16vw', height: 300, margin: '0 12px' }}
              className={
                firstIn ? 'owner-login-first' : trigger ? 'owner-login-show' : 'owner-login-hide'
              }
            >
              {loginData.retCode ? (
                <HasLogin loginData={loginData} />
              ) : (
                <LoginCard isLogin={this.props.isLogin} />
              )}
            </Card>
            {/* </header> */}
            <Affix offsetTop={60}>
              <Menu {...this.props} />
            </Affix>
          </div>
          <div className="flex-item">
            <div style={{ minHeight: '100vh' }}>{children}</div>
            <footer style={{ textAlign: 'center' }}>Ehame's blog ©2018 Created by Ehame Lu</footer>
          </div>
        </div>
        <BackToUp marginTop={document.body.offsetHeight} step={24} visiblePercent={20} />
      </div>
    );
  }
}
export default Base;
