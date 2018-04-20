import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { fetchArticleType, fetchArticleTitleList } from '../../redux-root/action/artical';
@connect(
  state => ({
    articleType: state.getArticleType.articleType.root.list,
    articleTitle: state.getArticleTitle.articleTitle.root.list,
  }),
  dispatch => ({
    getTypeData: () => dispatch(fetchArticleType()),
    getListData: (model) => dispatch(fetchArticleTitleList(model)),
  })
)
export default class Categories extends Component {
  componentDidMount() {
    this.props.getTypeData();
  }
  getData = async () => {
    await this.props.getTypeData();
    await this.props.getListData();
  }
  render() {
    const { articleType } = this.props;
    const Type = () => {
      if (articleType) {
        return articleType.map((item, index) =>
          <div key={index}>
            <NavLink
              key={index}
              to={{
                pathname: `/categories/timeLine/${item.typeId}`,
                state: item,
              }}
              activeClassName="active"
              className="article-type-classify"
            >
              <Icon type="right-square-o" />
              {item.type}({item.content.length})
            </NavLink>
          </div>
        );
      }
      return <div>暂无分类</div>;
    };
    return (
      <div className="categories-first">
        <span>分类</span>
        <Type />
      </div>
    );
  }
}