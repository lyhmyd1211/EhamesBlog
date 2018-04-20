import React, { Component } from 'react';
import { Card, Affix } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchArticleById, detailState } from '../../redux-root/action/artical';
import './detail.less';
import { getCataLog } from '../../util.js';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;
@connect(
  state => ({
    content: state.getArticleById,
    current: state.scrollPercent.current,
  }),
  dispatch => ({
    getArticleDetail: (n) => dispatch(fetchArticleById(n)),
    setDetailHeaderState:(n)=>dispatch(detailState(n)),
  })
)
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state={
      cataLog:[],
    };
    window.scrollTo(0,0);
  }
  
  componentDidMount() {
    let id = this.props.match.params.articleId;
    this.getDetail(id);
    this.props.setDetailHeaderState(true);
  }
  getDetail = async (id) => {
    await this.props.getArticleDetail(id);
    await this.setState({ cataLog: getCataLog(this.refs.content)});
  }
  scrollToSelect=(node)=>{
    window.scrollTo(0, node && node.offsetTop+document.body.offsetHeight-20);
  }
  cataLogScroll(index){
    let id = 'catalog-default'+index;
    let cur = document.getElementById(id);
    let win = document.getElementById('detail-card-catalog');
    if (cur) {
      win.scrollTo(0, cur.offsetTop-68);
    }
  }
  isActive = (index,node,nextNode)=>{
    const {current} = this.props;
    if (node && nextNode) {
      let precent = node.offsetTop + document.body.offsetHeight-20;
      let next = nextNode.offsetTop + document.body.offsetHeight-20;
      if (index === 0 && current <= precent) {
        return true;
      }else
      if (precent<=current&&next>current) {
        this.cataLogScroll(index);
        return true;
      }
    }
    return false;

  }
  componentWillUnmount(){
    this.props.setDetailHeaderState(false);
  }
  render() {
    const { content } = this.props;
    return (
      <div className="detail-main">
        <div className="detail-article">
          <Card
            bordered={false}
            className="detail-card-main">
            <div className="detail-content" id="detail-content">
              <Meta title={<h1 className="article-title">{content.title}</h1>} />
              <div className="meta-info">
                <span>发布日期: {moment(content.releaseTime).format('YYYY-MM-DD hh:mm:ss')}</span>
                <span>最后修改: {moment(content.editTime).format('YYYY-MM-DD hh:mm:ss')}</span>
                <span>类别: {content.type}</span>
                <span>阅读次数: {content.beReadTimes}</span>
              </div>
              <div className="meta-info">
                <span>字数统计: {content.wordNum}</span>
                <span>阅读时长 ≈ {content.readSpendTime}min</span>
              </div>
              <div className="article-content" ref="content" dangerouslySetInnerHTML={{__html:content.htmlContent}} />
            </div>
          </Card>
        </div>
        <Affix className="detail-catalog-affix" offsetTop={77}>
          <div className="hide-scroll"/>
          <Card className="detail-card-catalog" id="detail-card-catalog">
            <div style={{ fontSize: '16px', fontWeight: 700 }}>目录</div>
            <span style={{ fontWeight: 700 }}>{content.title}</span>
            {this.state.cataLog.map((item, index) =>
              <li key={index}>
                <NavLink
                  isActive={this.isActive.bind(this, index, item.node, item.nextNode)}
                  className={'catalog-default ' + item.type}
                  id={'catalog-default' + index}
                  activeClassName={'active'}
                  to={`${this.props.match.url}/header${index}`}
                  onClick={this.scrollToSelect.bind(this, item.node)}
                >
                  {item.text}
                </NavLink>
              </li>
            )}
          </Card>
        </Affix>
      </div>
    );
  }
}
