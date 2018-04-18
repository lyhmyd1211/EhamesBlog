import React, { Component } from 'react';
import { Input, Message } from 'antd';
import MarkdownEditor from '../../dumbComponent/markdownEditor';
import { connect } from 'react-redux';
import { post } from '../../fetchData';
import './writer.less';
import { ArticleContent } from '../../redux-root/action/artical';
@connect(
  state => ({
    detail: state.getArticleById,
    model: state.getArticleContent,
    currentType: state.getCurrentTypeId,
    currentArticle: state.getCurrentArticleId,
  }),
  dispatch => ({
    setArticleContent: (n) => dispatch(ArticleContent(n)),
  })
)
export default class MarkDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.detail.title,
    };
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({
      title: this.props.detail.title,
    });

  }

  componentWillReceiveProps(next) {
    if (next.model.submit) {
      const { title } = this.state;
      let mdContent = next.model.mdContent;
      let htmlContent = next.model.htmlContent;
      let body = {
        id: next.currentArticle,
        title,
        mdContent,
        htmlContent,
        type: next.currentType,
        state: 1,
      };
      post('/article/update', body, data => {
        if (data.retCode === 1) {
          Message.success(data.retMsg);
          this.props.setArticleContent({ mdContent: '', htmlContent: '', submit: false });
          window.location.hash = '/home';
        } else {
          Message.error(data.error);
        }
      });
    }
    if (next.detail.title !== this.state.detail) {
      this.setState({ title: next.detail.title });
    }
  }
  render() {
    const { title } = this.state;
    console.log('model', this.props.model);

    return (
      <div>
        <Input onChange={(e) => this.setState({ title: e.target.value })} value={title} />
        <MarkdownEditor />
      </div>

    );
  }
}