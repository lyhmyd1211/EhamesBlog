import React, { Component } from 'react';
import { Input, Icon} from 'antd';
import './header.less';
class Header extends Component {
  render(){
    return (
      <header className="base-header">
        <a className="header-home" href="#/home">Ehame</a>
        <div className="header-container">
          <div className="header-search">
            <Input className="header-search-input"/>
            <a className="header-search-icon"><Icon type="search" /></a>
          </div>
        </div>
        <a className="header-write-article">
          写文章
        </a>
      </header>
    );
  }
}
export default  Header;
