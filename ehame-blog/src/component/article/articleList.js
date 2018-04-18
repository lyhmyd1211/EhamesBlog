import React, { Component } from 'react';
import { Col, Message, Icon, Menu, Modal, Input } from 'antd';
import { connect } from 'react-redux';
import { fetchArticleTitleList, fetchArticleById } from '../../redux-root/action/artical';
import { NavLink, Route } from 'react-router-dom';
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
      setting:false,
      detail: { type: '', id: '' },
    };
  }
  componentDidMount(){
    this.getArticleTitle();
  }
  getArticleTitle= async()=>{
    try {
      const locationToDetail = () => {
        window.location.hash = `/write/${this.props.currentType}/detail/${this.props.articleTitle[0].id}`;
      };
      await this.props.getArticleTitle({ state: 0, id: this.props.match.params.id});
      if (this.props.articleTitle[0]) {
        await locationToDetail();
        await this.props.getArticleDetail(this.props.articleTitle[0].id);
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
  modalSubmit=()=>{
    const { modalType, detail } = this.state;
    if (modalType === 'delete') {
      post('article/delete', { id: detail.id }, data => {
        if (data.retCode === 1) {
          Message.success(data.retMsg);
          this.setState({ modalType: false });
          this.getArticleTitle();
        } else {
          Message.error(data.massage || data.retMsg);
        }
      });
    }
  }
  render(){
    const { articleTitle, currentType} = this.props;
    const { setting, current, modalType, newKey, detail } = this.state;
    const List = ()=>{
      if (articleTitle) {
        return articleTitle.map((item,index)=>(
          <NavLink 
            key={index}
            to={'/write/' + currentType+'/detail/'+item.id}
            activeClassName="active"
            className="article-detail-classify"
            onClick={(e) => e.target.className === 'article-detail-classify' ? this.props.getArticleDetail(item.id):e.preventDefault()}>{item.title}
            <div style={{ float: 'right' }}>
              <Icon type="setting" onClick={() => this.setState({ setting: !setting, current: item.id })} />
              <div
                className="type-setting"
                style={{ display: setting && current === item.id ? 'block' : 'none' }}>
                <Menu className="type-setting-menu"
                  onClick={_ => this.setState({ modalType: _.key, detail: item })}>
                  <Menu.Item key="delete"><Icon type="delete" />删除文章</Menu.Item>
                </Menu>
              </div>
            </div>
          </NavLink>
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
        <Modal
          title={modalType === 'edit' ? '请输入新的文章类型名' : null}
          key={modalType + newKey}
          closable={false}
          visible={modalType ? true : false}
          onOk={this.modalSubmit}
          onCancel={() => this.setState({ modalType: false })}>
          {
            modalType === 'edit' ?
              <Input value={detail.title} onChange={(e) => this.setState({ detail: { type: e.target.value, id: detail.id } })
              } />
              :
              <div>{'确认删除文章《' + detail.title + '》?'}</div>
          }
        </Modal>
      </div>
    );
  }
}