import React, { Component } from 'react';
import { Input, Icon} from 'antd';
import { connect } from 'react-redux';
import './header.less';
@connect(
  state => ({
    isScrollUp: state.scrollUp.isScrollUp,
    content: state.getArticleById,
    isDetail: state.setDetailState,
  }),
)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      defaultType:'',
      defaultTitle:'',
    };
  }
  
  render(){
    const { isScrollUp, content, isDetail} = this.props;
    console.log('props',this.props);
    
    return (
      <header className="base-header" key="up">
        <a className="header-home" href="#/home">Ehame</a>
        {isDetail?
          <div className="header-container">
            <div className={'up-title'+(isScrollUp ?' is-shown':'')}>
              <Input className="header-search-input"/>
              <a className="header-search-icon"><Icon type="search" /></a>
            </div>
            <div className={'down-title' + (isScrollUp ? ' is-hidden' : '')}>{content.title}</div>
          </div>:
          <div className="header-container">
            <div className="up-title is-shown">
              <Input className="header-search-input" />
              <a className="header-search-icon"><Icon type="search" /></a>
            </div>
          </div>
        }
        <a className="header-write-article" href="#/write/">
          写文章
        </a>
      </header>
    );
  }
}
export default  Header;
