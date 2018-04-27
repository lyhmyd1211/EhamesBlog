import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Timeline, Icon, Card } from 'antd';
import { fetchArticleType } from '../../redux-root/action/artical';
import moment from 'moment';
@connect(
  state => ({
    article: state.getArticleType.articleType.root.list,
  }),
  dispatch => ({
    getTypeData: () => dispatch(fetchArticleType()),
  })
)
export default class TimeLine extends Component {
  componentDidMount() {
    this.getData();
  }
  componentWillMount() {
    console.log('abc');
  }
  getData() {
    this.props.getTypeData();
  }
  render() {
    const { article, match } = this.props;
    let timeline = article.filter(_ => _.typeId === parseInt(match.params.typeId))[0] || {
      content: [],
      type: '',
      typeId: '',
    };
    return (
      <div className="timeline-main">
        <Timeline>
          <Timeline.Item dot={<Icon type="file-text" style={{ fontSize: '16px' }} />}>
            {timeline.type}
          </Timeline.Item>
          {timeline.content.map((item, index) => {
            return (
              <Timeline.Item key={index}>
                <Card className="timeline-content" bodered={false} hoverable>
                  <Icon type="calendar" />
                  {moment(item.releaseTime).format('YYYY-MM-DD HH:MM:SS')}
                  <hr />
                  <span>{item.title}</span>
                </Card>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    );
  }
}
