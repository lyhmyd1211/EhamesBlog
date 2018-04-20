import React, { Component } from 'react';
import { Input, Message, Icon, Menu, Modal } from 'antd';

import { connect } from 'react-redux';
import { fetchArticleType, fetchArticleTitleList, fetchArticleById, setCurrentTypeId, setCurrentArticleId } from '../../redux-root/action/artical';
import { NavLink } from 'react-router-dom';
import { post } from '../../fetchData';
import './writer.less';
@connect(
  state => ({
    articleType: state.getArticleType.articleType.root.list,
    articleTitle: state.getArticleTitle.articleTitle.root.list,
  }),
  dispatch => ({
    setCurrentArticle: (n) => dispatch(setCurrentArticleId(n)),
    setCurrentType: (n) => dispatch(setCurrentTypeId(n)),
    getTypeData: () => dispatch(fetchArticleType()),
    getListData: (model) => dispatch(fetchArticleTitleList(model)),
    getArticleDetail: (n) => dispatch(fetchArticleById(n)),
  })
)
export default class ArticleType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      operation: false,
      newType: '',
      detail: { type: '', id: '' },
    };
  }
  componentDidMount() {
    this.getData({id:'1'});
  }
  setCurrentId(type = '', article = '') {
    this.props.setCurrentType(type);
    this.props.setCurrentArticle(article);
  }
  getData = async (model) => {
    try {
      const locationToDetail = () => {
        window.location.hash = `/write/${model.id}/detail/${this.props.articleTitle[0].id}`;
      };
      const locationToType = ()=>{
        window.location.hash = `/write/${model.id}`;
      };
      await this.props.getTypeData();
      model = model.id !== '1' ? this.props.articleType[0] : model;
      await this.props.getListData({ state: 0, id: model ? model.id : '' });
      if (this.props.articleTitle[0]) {
        await this.setCurrentId(model.id, this.props.articleTitle[0].id);
        await locationToDetail();
      } else  {
        await this.setCurrentId(model.id, '');
        await locationToType();
      }

    } catch (error) {
      console.error('err', error);
    }
  }
  getArticleList = async (model) => {
    const locationToDetail = (model) => {
      window.location.hash = `/write/${model.id}/detail/${this.props.articleTitle[0].id}`;
    };
    try {
      await this.props.getListData(model);
      if (this.props.articleTitle[0]) {

        await this.props.getArticleDetail(this.props.articleTitle[0].id);
        await locationToDetail(model);
        await this.setCurrentId(model.id, this.props.articleTitle[0].id);
      } else {
        await this.setCurrentId(model.id, '');
      }
    } catch (error) {
      console.log(error);
    }
  }

  addArticleType=async(body)=> {
    if (this.state.newType === '') {
      Message.error('类型名称不能为空!');
      return;
    } else {
      await post('/article/addType', { type: body }, data => {
        if (data.retCode === 1) {
          this.setState({ operation: false, newType: '' });
          this.getData(this.props.articleType[0]);
        } else {
          Message.error(data.error);
        }
      });
    }
  }
  modalSubmit = async () => {
    const { modalType, detail } = this.state;
    const {articleType} = this.props;
    if (modalType === 'edit') {
      await post('article/updateType', detail, data => {
        if (data.retCode === 1) {
          Message.success(data.retMsg);
          this.setState({ modalType: false });
          this.getData(articleType[0]);
        } else {
          Message.error(data.massage || data.retMsg);
        }
      });
    }
    else if (modalType === 'delete') {
      post('article/deleteType', { id: detail.id }, data => {
        if (data.retCode === 1) {
          Message.success(data.retMsg);
          this.setState({ modalType: false });
          this.getData(articleType[0]);
        } else {
          Message.error(data.massage || data.retMsg);
        }
      });
    }

  }
  render() {
    const { operation, newType, setting, current, modalType, newKey, detail } = this.state;
    const { articleType } = this.props;
    const Type = () => {
      if (articleType) {
        return articleType.filter(_ => _.id !== 1).map((item, index) =>
          <NavLink
            key={index}
            to={'/write/' + item.id}
            activeClassName="active"
            className="article-type-classify"
            onClick={(e) => e.target.className === 'article-type-classify' ? this.getArticleList({ state: 0, id: item.id }) : e.preventDefault()}>
            {item.type}
            <div style={{ float: 'right' }}>
              <Icon type="setting" onClick={() => this.setState({ setting: !setting, current: item.id })} />
              <div
                className="type-setting"
                style={{ display: setting && current === item.id ? 'block' : 'none' }}>
                <Menu className="type-setting-menu"
                  onClick={_ => this.setState({ modalType: _.key, detail: item })}>
                  <Menu.Item key="edit"><Icon type="edit" />修改类型名称</Menu.Item>
                  <Menu.Item key="delete"><Icon type="delete" />删除类型名称</Menu.Item>
                </Menu>
              </div>
            </div>
          </NavLink>
        );
      }
      return <div />;
    };
    return (
      <div>
        <div className="btn-back-to-home">
          <a href="#/home">
            回首页
          </a>
        </div>
        <div className="btn-new-type" onClick={() => this.setState({ operation: true })}>
          <Icon type="plus-circle-o" />
          <span>新建分类</span>
        </div>
        <div className={operation ? 'new-type-operation-active' : 'new-type-operation'}>
          <Input className="input-new-type" value={newType} onChange={(e) => this.setState({ newType: e.target.value })} />
          <div className="btn-type-cencel" onClick={() => this.setState({ operation: false, newType: '' })}>取消</div>
          <div className="btn-type-ok" onClick={this.addArticleType.bind(this, newType)}>提交</div>
        </div>
        <nav className="type-list">
          <NavLink
            key={'other'}
            to={'/write/1'}
            activeClassName="active"
            className="article-type-classify"
            onClick={(e) => e.target.className === 'article-type-classify' ? this.getArticleList({ state: 0, id: 1 }) : e.preventDefault()}>
            {'未分类'}
          </NavLink>
          <Type />
        </nav>
        <Modal
          title={modalType === 'edit' ? '请输入新的文章类型名' : null}
          key={modalType + newKey}
          closable={false}
          visible={modalType ? true : false}
          onOk={this.modalSubmit}
          onCancel={() => this.setState({ modalType: false })}>
          {
            modalType === 'edit' ?
              <Input value={detail.type} onChange={(e) => this.setState({ detail: { type: e.target.value, id: detail.id } })
              } />
              :
              <div>{'确认删除文章类型《' + detail.type + '》?'}</div>
          }
        </Modal>
      </div>
    );
  }

}