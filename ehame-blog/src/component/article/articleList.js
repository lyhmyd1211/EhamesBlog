import React, { Component } from 'react';
import { Col } from 'antd';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import Markdown from './markdown';
import './writer.less';
@connect(
  state => ({
    articleTitle: state.getArticleTitle.articleTitle.root.list,
  }),
)
export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[],
      match:this.props.match,
    };
  }
 
  render(){
    const { match} = this.state;
    const { articleTitle} = this.props;
    const List = ()=>{
      if (articleTitle) {
        return articleTitle.map((item,index)=>(
          <NavLink 
            key={index}
            to={'/write/' + match.params.id+'/detail/'+item.id}
            activeClassName="active"
            className="article-detail-classify"
          >{item.title}</NavLink>
        ));
      }else{
        return <div/>;
      }
    };
    return (
      <div>
        <Col span="4" className="markdown-middle-list">
          <div className="new-article">
            <i className="iconfont icon-plus"/>
            <span>新建文章</span>
          </div>
          <nav>
            <List/>
          </nav>
        </Col>
        <Col span="16">
          <Route key="write" exact path="/write/:id/detail/:id" component={Markdown}/>
        </Col>
      </div>
    );
  }
}