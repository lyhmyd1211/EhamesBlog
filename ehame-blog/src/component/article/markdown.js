import React, { Component } from 'react';
import { Input, Message } from 'antd';
import MarkdownEditor from '../../dumbComponent/markdownEditor';
import { connect } from 'react-redux';
import { post } from '../../fetchData';
import './writer.less';
@connect(
  state => ({
    content: state.getArticleContent.content,
  }),
)
export default class MarkDown extends Component {
  constructor(props) {
    super(props);
    this.state={
      content: this.props.content,
      title:'',
    };
  }
  
  componentWillReceiveProps(next) {
    if (next.content !== this.state.content) {
      const { title } = this.state;
      let content = next.content;
      let body = {
        title,
        content,
      };
      post('/article/write', body, data => {
        if (data.retCode === 1) {
          Message.success(data.retMsg);
          window.location.hash = '#/home';
        } else {
          Message.error(data.error);
        }
      });
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