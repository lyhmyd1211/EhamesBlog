import React, { Component } from 'react';
// import Markdown from '../../dumbComponent/markdownEditor';
import { Row, Col } from 'antd';
import {connect} from 'react-redux';
import { Route } from 'react-router-dom';
// import { post } from '../../fetchData';
import './writer.less';
import ArticleType from './articleType';
import ArticleList from './articleList';

@connect(
  state => ({ 
    content: state.getArticleContent.content,
  }),
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
  }

  render() {
    return (
      <div className="markdown-main">
        <Row className="markdown-row">
          <Col span="4" className="markdown-left-list">
            <ArticleType {...this.props}/>
          </Col>
          <Route key="write" path="/write/:id" component={ArticleList} />
        </Row>
      </div>
      
    );
  }
}