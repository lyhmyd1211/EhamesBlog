import React, { Component } from 'react';
import { Input, Icon} from 'antd';
import {connect} from 'react-redux';
import { fetchArticleType, fetchArticleTitleList } from '../redux-root/action/artical';
import './header.less';
// @connect(
//   state =>({
//     articleType: state.getArticleType.articleType.root.list,
//     articleTitle: state.getArticleTitle.articleTitle.root.list,
//   }),
//   dispatch =>({
//     getArticle: (model) => dispatch(fetchArticleTitleList(model)),
//     getType: () => dispatch(fetchArticleType()),
//   })
// )
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      defaultType:'',
      defaultTitle:'',
    };
  }
  
  // componentDidMount(){
  //   this.getData();
  // }
  // getData = async  ()=>{
  //   try {
  //     await this.props.getType();
  //     await this.setState({ defaultType: this.props.articleType[0]?this.props.articleType[0].id:''});
  //     await this.props.getArticle({ state: 1, id: this.props.articleType[0]?this.props.articleType[0].id:''});
  //     await this.setState({ defaultTitle: this.props.articleTitle[0]?this.props.articleTitle[0].id:''});
  //   } catch (error) {
  //     console.error('err',error);
  //   }
  // }

  render(){
    const { defaultTitle, defaultType}=this.state;
    return (
      <header className="base-header">
        <a className="header-home" href="#/home">Ehame</a>
        <div className="header-container">
          <div className="header-search">
            <Input className="header-search-input"/>
            <a className="header-search-icon"><Icon type="search" /></a>
          </div>
        </div>
        {/* <a className="header-write-article" href={'#/write/' + defaultType+'/detail/' + defaultTitle}>
          写文章
        </a> */}
        <a className="header-write-article" href="#/write/">
          写文章
        </a>
      </header>
    );
  }
}
export default  Header;
