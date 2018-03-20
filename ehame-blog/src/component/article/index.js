import React, { Component } from 'react';
import Markdown from '../../dumbComponent/markdownEditor';
import { Row, Col, Input, Message } from 'antd';

import {connect} from 'react-redux';
import { fetchArticleType } from '../../redux-root/action/artical';

import { post } from '../../fetchData';
import './writer.less';

@connect(
  state => ({ 
    content: state.getArticleContent.content,
    articleType:state.getArticleType.articleType,
  }),
  dispatch => ({ getTypeData: () => dispatch(fetchArticleType())})
)
export default class Write extends Component {
  constructor(props) {
    super(props);
    this.state={
      content:this.props.content,
      operation:false,
      newType:'',
    };
  }
  
  componentDidMount(){
    this.getArticleType();
  }

  getArticleType(){
    this.props.getTypeData();
  }

  addArticleType(body){
    if (this.state.newType==='') {
      Message.error('类型名称不能为空!');
      return ;
    }else{
      console.log('commitBody', body);
      post('/article/addType', {type:body},data=>{
        if (data.retCode===1) {
          this.setState({operation:false});
          this.getArticleType();
        }else{
          Message.error(data.error);
        }
      });
    }
  }

  componentWillReceiveProps(next){
    if (next.content !== this.state.content) {
      const { title }=this.state;
      let content = next.content;
      let body = {
        title,
        content,
      };
      post('/article/write',body,data=>{
        if (data.retCode===1) {
          Message.success(data.retMsg);
          window.location.hash = '#/home';
        }else{
          Message.error(data.error);
        }
      });
    }
  }

  render() {
    const { title, operation, newType } = this.state;
    const { articleType} = this.props;
    console.log('articleType', articleType);
    
    const ArticleType = () => {
      if (articleType.root) {
        return articleType.root.list.map((item, index) => 
          <div key={index} className="article-type-classify">{item.type}</div>
        );  
      }else{
        return <div/>;
      }
    };
    return (
      <div className="markdown-main">
        <Row className="markdown-row">
          <Col span="4" className="markdown-left-list">
            <div className="btn-back-to-home">
              <a href="#/home">
                回首页
              </a>
            </div>
            <div className="btn-new-type" onClick={()=>this.setState({operation:true})}>
              <i className="fa fa-plus"/>
              <span>新建分类</span>
            </div>
            <div className={operation ?'new-type-operation-active':'new-type-operation'}>
              <Input className="input-new-type" value={newType} onChange={(e) => this.setState({ newType:e.target.value})}/>
              <div className="btn-type-cencel" onClick={() => this.setState({ operation: false })}>取消</div>
              <div className="btn-type-ok" onClick={this.addArticleType.bind(this, newType)}>提交</div>
            </div>
            <div className="type-list">
              <ArticleType />
            </div>
          </Col>
          <Col span="4" className="markdown-middle-list">
            <div>新建</div> 
            <div>新建</div>
            <div>新建</div>
            <div>新建</div>
            <div>新建</div><div>新建</div>
            <div>新建</div>
            <div>新建</div>
            <div>新建</div><div>新建</div><div>新建</div><div>新建</div><div>新建</div><div>新建</div><div>新建</div><div>新建</div><div>新建</div><div>新建</div>   
          </Col>
          <Col span="16">
            <Input onChange={(e) => this.setState({ title: e.target.value })} value={title}/>
            <Markdown />
          </Col>
        </Row>
      </div>
      
    );
  }
}