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
    this.state={
      //content:'',
      content: this.props.detail.content,
      title:this.props.detail.title,
    };
  }
  
  componentDidMount(){
    this.getData();
  }
  getData=()=>{
    this.setState({
      content: this.props.detail.content,
      title: this.props.detail.title,
    });
    
  }

  componentWillReceiveProps(next) {
    if (next.model.submit) {
      const { title } = this.state;
      let content = next.model.content;
      let body = {
        id: next.currentArticle,
        title,
        content,
        type: next.currentType,
        state:1,
      };
      post('/article/update', body, data => {
        if (data.retCode === 1) {
          Message.success(data.retMsg);
          this.props.setArticleContent({ content: '', submit: false });
          window.location.hash = '/home';
        } else {
          Message.error(data.error);
        }
      });
    }
    if (next.detail.title !==  this.state.detail) {
      this.setState({title:next.detail.title});
    }
  }
  render(){
    const {title} = this.state;
    return (
      <div>
        <Input onChange={(e) => this.setState({ title: e.target.value })} value={title} />
        <MarkdownEditor />
      </div>
      
    );
  }
}