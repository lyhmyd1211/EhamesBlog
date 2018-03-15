import React, { Component } from 'react';
import { Button } from 'antd';
class HasLogin extends Component {
  
  componentDidMount = () => {
  };

  render() {
    const { loginData} = this.props;
    return (
      <div>
        <div><label>登录IP:</label><span>{loginData.ip}</span></div> 
        <div><label>登录地点:</label><span>{loginData.location.country}.{loginData.location.province}.{loginData.location.city}</span></div>
        <div><label>登录时间:</label><span>ss</span></div>
        <Button>退出登录</Button>
      </div>
    );
  }
}
export default HasLogin;