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
    currentType: state.getCurrentTypeId,
    currentArticle: state.getCurrentArticleId,
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
    // const locationTo=()=>{
    //   window.location.hash = `#/write/${this.props.match.params.id}/detail/${this.props.articleTitle[0].id}`;
    // };
    try {
      await this.props.getArticleTitle({ state: 0, id: this.props.match.params.id});
      if (this.props.articleTitle[0]) {
        console.log('jinru',);
        
        await this.props.getArticleDetail(this.props.articleTitle[0].id);
        //await locationTo();
      }
      
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
    const { articleTitle, currentType} = this.props;
    console.log('listArticle', this.props.currentArticle);
    console.log('listType', this.props.currentType);
    const List = ()=>{
      if (articleTitle) {
        return articleTitle.map((item,index)=>(
          <NavLink 
            key={index}
            to={'/write/' + currentType+'/detail/'+item.id}
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