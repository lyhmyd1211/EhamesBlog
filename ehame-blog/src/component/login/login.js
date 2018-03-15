import React, { Component } from 'react';
import { Button } from 'antd';
// import { bindActionCreators } from 'redux';
import './login.less';

export default class Login extends Component {
  componentDidMount = () => {
  };
  render() {
    return (
      <div className="login-main">
      
        <Button className="btn-common btn-login" onClick={()=>window.location.hash = '/home'}>进入新世界</Button> 
      </div>
    );
  }
}

