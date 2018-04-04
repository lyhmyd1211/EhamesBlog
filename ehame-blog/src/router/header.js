import React, { Component } from 'react';
import { Input, Icon} from 'antd';
import {connect} from 'react-redux';
import { fetchArticleType, fetchArticleList } from '../redux-root/action/artical';
import './header.less';
@connect(
  state =>({
    articleType: state.getArticleType.articleType.root.list,
    articleTitle: state.getArticleTitle.articleTitle.root.list,
  }),
  dispatch =>({
    getArticle: (model) => dispatch(fetchArticleList(model)),
    getType: () => dispatch(fetchArticleType()),
  })
)
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      defaultType:'1',
      defaultTitle:'1',
    };
  }
  
  componentDidMount(){
    const { articleType, articleTitle } = this.props;
    this.props.getType(()=>{
      this.setState({ defaultType: articleType[0].id });
      this.props.getArticle({ state: 1, id: articleType[0].id }, () => {
        this.setState({ defaultTitle: articleTitle[0].id });
      });
    });
    
  }
  render(){
    const { defaultTitle, defaultType}=this.state;
    console.log('defaultType', defaultType);
    console.log('articleTitle', this.props.articleTitle);
    return (
      <header className="base-header">
        <a className="header-home" href="#/home">Ehame</a>
        <div className="header-container">
          <div className="header-search">
            <Input className="header-search-input"/>
            <a className="header-search-icon"><Icon type="search" /></a>
          </div>
        </div>
        <a className="header-write-article" href={'#/write/' + defaultType+'/detail/' + defaultTitle}>
          写文章
        </a>
      </header>
    );
  }
}
export default  Header;
