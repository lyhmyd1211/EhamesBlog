import React, { Component } from 'react'; 
import {Card} from 'antd';
import './articleCard.less';
import { formatMoment} from '../util';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;
export default class ArticleCard extends Component{
  render(){
    const { content}=this.props;
    let htmlContent = { __html:content.htmlContent};
    return (
      <div className="article-card">
        <Card
          className="card-main"
          hoverable
        >
          <div className="card-time">
            <div className="card-time-month">
              {formatMoment(content.editTime, 'month')}
            </div>
            <div className="card-time-date">
              {formatMoment(content.editTime, 'date')||''}
            </div>
            <div className="card-time-year">
              {formatMoment(content.editTime, 'year')}
            </div>
          </div>
          <div className="card-label">
            test
          </div>
          <div className="card-content">
            <Meta
              title={content.title}
            />
            <div className="meta-info">
              <span>发布日期: {moment(content.releaseTime).format('YYYY-MM-DD HH:mm:ss')}</span>&nbsp;&nbsp;
              <span>最后修改: {moment(content.editTime).format('YYYY-MM-DD HH:mm:ss')}</span>&nbsp;&nbsp;
              <span>类别: {content.type}</span>&nbsp;&nbsp;
              <span>阅读次数: {content.beReadTimes}</span>
            </div>
            <div className="meta-info-statistics">
              <span>字数统计: {content.wordNum}</span>&nbsp;
              <span>阅读时长 ≈ {content.readSpendTime}min</span>
            </div>
            <div className="article-content" dangerouslySetInnerHTML={htmlContent} />
          </div>
          <div className="article-read-more" onClick={this.test}>
            <NavLink to={`/detail/${this.props.content.id}`} 
            >阅读全文</NavLink> 
          </div>
        </Card>
      </div>
    );
  }
}
