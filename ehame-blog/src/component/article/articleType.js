import React, { Component } from 'react';
import {Input, Message } from 'antd';

import { connect } from 'react-redux';
import { fetchArticleType, fetchArticleList } from '../../redux-root/action/artical';
import { NavLink } from 'react-router-dom';
import { post } from '../../fetchData';
import './writer.less';
@connect(
  state => ({
    articleType: state.getArticleType.articleType,
    articleTitle: state.getArticleTitle.articleTitle.root.list,
  }),
  dispatch => ({ 
    getTypeData: () => dispatch(fetchArticleType()),
    getListData: (model) => dispatch(fetchArticleList(model)), 
  })
)
export default class ArticleType extends Component {
  constructor(props) {
    super(props);
    this.state={
      content: this.props.content,
      operation: false,
      newType: '',
    };
  }
  componentDidMount() {
    this.getArticleType();
  }

  getArticleType() {
    this.props.getTypeData();
  }
  getArticleList(model){
    const{articleTitle} = this.props;
    this.props.getListData(model);
    if (articleTitle[0].id) {
      console.log('modelid',model.id);
      console.log('articleTitle', articleTitle[0].id);
      window.location.hash = `/write/ + ${model.id}+/detail/+${articleTitle[0].id}`;
      //window.location.hash = '/write/detail';
    }
    
  }

  addArticleType(body) {
    if (this.state.newType === '') {
      Message.error('类型名称不能为空!');
      return;
    } else {
      post('/article/addType', { type: body }, data => {
        if (data.retCode === 1) {
          this.setState({ operation: false });
          this.getArticleType();
        } else {
          Message.error(data.error);
        }
      });
    }
  }
  

  render(){
    const { operation, newType } = this.state;
    const { articleType } = this.props;
    const Type = () => {
      if (articleType.root) {
        return articleType.root.list.map((item, index) =>
          <NavLink 
            key={index} 
            to={'/write/' + item.id}
            activeClassName="active"
            className="article-type-classify"
            onClick={() => this.getArticleList({state:0,id:item.id})}
          >{item.type}</NavLink>
        );
      } else {
        return <div />;
      }
    };
    return (
      <div>
        <div className="btn-back-to-home">
          <a href="#/home">
            回首页
          </a>
        </div>
        <div className="btn-new-type" onClick={() => this.setState({ operation: true })}>
          <i className="fa fa-plus"/>
          <span>新建分类</span>
        </div>
        <div className={operation ? 'new-type-operation-active' : 'new-type-operation'}>
          <Input className="input-new-type" value={newType} onChange={(e) => this.setState({ newType: e.target.value })} />
          <div className="btn-type-cencel" onClick={() => this.setState({ operation: false })}>取消</div>
          <div className="btn-type-ok" onClick={this.addArticleType.bind(this, newType)}>提交</div>
        </div>
        <nav className="type-list">
          <Type/>
        </nav>
      </div>
    );
  }
  
}