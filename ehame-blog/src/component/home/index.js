import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchArticle } from '../../redux-root/action/artical';
import ArticleCard from '../../dumbComponent/articleCard';
import './home.less';


@connect(
  state => ({
    articleSource: state.article.articleData.list,
  }),
  dispatch => ({
    getData: () => dispatch(fetchArticle()),
  })
)
export default class Home extends Component {
  componentDidMount = () => {
    this.props.getData();
    if (this.props.isDetail ) {
      this.props.changeReadState(0);
    }
  };
  render() {
    const { articleSource } = this.props;
    const ACard = () => {
      if (articleSource.length > 0) {
        return articleSource.map((item, index) =>
          (
            <ArticleCard key={index} content={item}/>
          )
        );
      } else {
        return <div />;
      }
    };
    return (
      <div className="home-main">
        <ACard />
      </div>
    );
  }
}

