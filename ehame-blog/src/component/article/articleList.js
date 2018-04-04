import React, { Component } from 'react';
import { Col, Message } from 'antd';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { fetchArticleList } from '../../redux-root/action/artical';
import Markdown from './markdown';
import { post } from '../../fetchData';
import './writer.less';
@connect(
  state => ({
    articleTitle: state.getArticleTitle.articleTitle.root.list,
  }),
  dispatch => ({ getArticleTitle: (n) => dispatch(fetchArticleList(n))})
)
export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[],
    //  match:this.props.match,
    };
  }
  componentDidMount(){
    this.getArticleTitle();
  }
  getArticleTitle(){
    // console.log('选中id', this.state.match.params.id);
    //console.log('propsId', this.props.match.params.id);
    const {match,articleTitle} = this.props;
    console.log('asdasdasd',articleTitle);
    
    this.props.getArticleTitle({state:0,id:match.params.id});
    if (articleTitle[0]) {
      window.location.hash = `#/write/ + ${match.params.id}+/detail/+${articleTitle[0].id}`;
    }
   
  }
  add=()=>{
    let body = {
      title: new Date().toLocaleDateString(),
      state:2,
      type: this.props.match.params.id,
    };        
    post('/article/write', body, data => {
      if (data.retCode === 1) {
        this.getArticleTitle();
      } else {
        Message.error(data.error);
      }
    });
  }
  render(){
    // const { match} = this.state;
    const { articleTitle, match} = this.props;
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
          <div className="new-article" onClick={this.add}>
            <i className="fa fa-plus"/>
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