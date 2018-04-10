import React, { Component } from 'react';
import { Input, Message, Icon } from 'antd';

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
    };
  }
  componentDidMount() {
    this.getData();
  }
  setCurrentId(type = '', article = '') {
    this.props.setCurrentType(type);
    this.props.setCurrentArticle(article);
  }
  getData = async () => {
    try {
      const transformTo = (model) => {
        window.location.hash = `/write/${this.props.articleType[0].id}/detail/${this.props.articleTitle[0].id}`;
      };
      const locationFinal = (model) => {
        window.location.hash = `/write/${this.props.articleType[0].id}`;
      };
      await this.props.getTypeData();
      await this.props.getListData({ state: 0, id: this.props.articleType[0] ? this.props.articleType[0].id : '' });
      if (this.props.articleType[0] && this.props.articleTitle[0]) {
        await this.setCurrentId(this.props.articleType[0].id, this.props.articleTitle[0].id);
        await transformTo();
      } else if (this.props.articleType[0]) {
        await this.setCurrentId(this.props.articleType[0].id, '');
        await locationFinal();
      }
     
    } catch (error) {
      console.error('err', error);
    }
  }
  getArticleList = async (model) => {
    const transformTo = (model) => {
      window.location.hash = `/write/${model.id}/detail/${this.props.articleTitle[0].id}`;
    };
    try {
      await this.props.getListData(model);
      if (this.props.articleTitle[0]) {
        
        await this.props.getArticleDetail(this.props.articleTitle[0].id);
        await transformTo(model);
        await this.setCurrentId(model.id, this.props.articleTitle[0].id);
      }else{
        await this.setCurrentId(model.id, '');
      }
    } catch (error) {
      console.log(error);
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
          this.getData();
        } else {
          Message.error(data.error);
        }
      });
    }
  }


  render() {
    const { operation, newType } = this.state;
    const { articleType } = this.props;
    const Type = () => {
      if (articleType) {
        return articleType.map((item, index) =>
          <NavLink
            key={index}
            to={'/write/' + item.id}
            activeClassName="active"
            className="article-type-classify"
            onClick={() => this.getArticleList({ state: 0, id: item.id })}
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
          <Icon type="plus-circle-o" />
          <span>新建分类</span>
        </div>
        <div className={operation ? 'new-type-operation-active' : 'new-type-operation'}>
          <Input className="input-new-type" value={newType} onChange={(e) => this.setState({ newType: e.target.value })} />
          <div className="btn-type-cencel" onClick={() => this.setState({ operation: false })}>取消</div>
          <div className="btn-type-ok" onClick={this.addArticleType.bind(this, newType)}>提交</div>
        </div>
        <nav className="type-list">
          <Type />
        </nav>
      </div>
    );
  }

}