import React, { Component } from 'react';
import { Col, Message, Icon } from 'antd';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { fetchArticleTitleList, fetchArticleById } from '../../redux-root/action/artical';
import Markdown from './markdown';
import { post } from '../../fetchData';
import './writer.less';
@connect(
  state => ({
    articleTitle: state.getArticleTitle.articleTitle.root.list,
  }),
  dispatch => ({ 
    getArticleTitle: (n) => dispatch(fetchArticleTitleList(n)),
    getArticleDetail: (n) => dispatch(fetchArticleById(n)),
  })
)
export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[],
      articleTitle:this.props.articleTitle,
    };
  }
  componentDidMount(){
    this.getArticleTitle();
  }
  getArticleTitle= async()=>{
    const locationTo=()=>{
      if (this.props.articleTitle[0]) {
        window.location.hash = `#/write/${this.props.match.params.id}/detail/${this.props.articleTitle[0].id}`;
      }
    };
    try {
      await this.props.getArticleTitle({state:0,id:this.props.match.params.id});
      await this.props.getArticleDetail(this.props.articleTitle[0].id);
      await locationTo();
    } catch (error) {
      console.log(error);
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
            onClick={()=>this.props.getArticleDetail(item.id)}
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
            <Icon type="plus-square" />
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