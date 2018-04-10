import React, { Component } from 'react';
import { Card } from 'antd';
import moment from 'moment';
import {get} from '../../fetchData';
const { Meta } = Card;

export default class Detail extends Component{
  constructor(props) {
    super(props);
    this.state={
      content:'',
    };
  }
  
  componentDidMount(){
    let id = this.props.match.params.articleId;
    get(`/article/getbyId/${id}`,data=>{
      if (data.retCode) {
        this.setState({
          content:data.root.list[0],    
        });
      }
    });
  }

  render(){
    console.log('asdjiasjd', this.props);
    const {content}=this.state;
    return(
      <Card
        className="card-main"
        hoverable
      >
        <div className="card-content">
          <Meta
            title={content.title}
          />
          <div className="meta-info">
            <span>发布日期: {moment(content.releaseTime).format('YYYY-MM-DD hh:mm:ss')}</span>&nbsp;&nbsp;
            <span>最后修改: {moment(content.editTime).format('YYYY-MM-DD hh:mm:ss')}</span>&nbsp;&nbsp;
            <span>类别: {content.type}</span>&nbsp;&nbsp;
            <span>阅读次数: {content.beReadTimes}</span>
          </div>
          <div className="meta-info">
            <span>字数统计: {content.wordNum}</span>&nbsp;
            <span>阅读时长 ≈ {content.readSpendTime}min</span>
          </div>
          <div className="article-content">{content.content}</div>
        </div>
      </Card>
    );
  }
}
