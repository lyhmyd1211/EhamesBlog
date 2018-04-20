import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { scrollPercentAction } from '../redux-root/action/scroll';
import { getScrollPercent, getScrollTop, ScrollToAnimate } from '../util';
import './menu.less';
@connect(
  state => ({
    current: state.scrollPercent.current,
    loginState: state.loginState.loginData.retCode,
  }),
  dispatch => ({
    getCurrentPercent: (n) => dispatch(scrollPercentAction(n)),
  })
)
class Menu extends Component {
  constructor(props) {
    super(props);
    // window.onscroll = this.scrollPercent;
  }
  scrollPercent(type) {
    const { getCurrentPercent, current} = this.props;
    getCurrentPercent({ percent: getScrollPercent(), current: getScrollTop() });
    ScrollToAnimate(document.body.offsetHeight, 12, current);
    // window.scrollTo(0,document.body.offsetHeight);
  }
  render() {
    return (
      <nav>
        <ul>
          <NavLink
            to="/home"
            activeClassName="selected"
            className= "menu-item"
            onClick={() => { this.scrollPercent(); }}
          >
              首页
          </NavLink>
          <NavLink
            to="/categories"
            activeClassName="selected"
            className="menu-item"
            onClick={() => { this.scrollPercent(); }}
          >
              分类
          </NavLink>
          <NavLink
            to="/aboutMe"
            activeClassName="selected"
            className="menu-item"
            onClick={() => { this.scrollPercent(); }}
          >关于我
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default Menu;