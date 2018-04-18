import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';

import { connect } from 'react-redux';
import { ArticleContent } from '../redux-root/action/artical';

// import { guid } from '../util';
import './markdownEditor.less';

@connect(
  state => ({
    articleContent: state.getArticleById.mdContent,
  }),
  dispatch => ({
    setArticleContent: (n) => dispatch(ArticleContent(n)),
  })
)
export default class Markdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.articleContent,
    };
  }

  componentDidMount() {
    this.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,
      spellChecker: false,
      autofocus: true,
      autosave: {
        enabled: true,
        delay: 100000,
        uniqueId: 'markdown1',
      },
      renderingConfig: {
        codeSyntaxHighlighting: true,
      },
      toolbar: [
        {
          name: 'Blod',
          action: SimpleMDE.toggleBold,
          className: 'fa fa-bold',
          title: '加粗',
        },
        {
          name: 'italic',
          action: SimpleMDE.toggleItalic,
          className: 'fa fa-italic',
          title: '斜体',
        },
        {
          name: 'heading',
          action: SimpleMDE.toggleHeadingBigger,
          className: 'fa fa-header',
          title: '标题',
        },
        '|',
        {
          name: 'quote',
          action: SimpleMDE.toggleBlockquote,
          className: 'fa fa-quote-left',
          title: '引用',
        },
        {
          name: 'unordered-list',
          action: SimpleMDE.toggleUnorderedList,
          className: 'fa fa-list-ul',
          title: '无序列表',
        },
        {
          name: 'ordered-list',
          action: SimpleMDE.toggleOrderedList,
          className: 'fa fa-list-ol',
          title: '有序列表',
        },
        '|',
        {
          name: 'link',
          action: SimpleMDE.drawLink,
          className: 'fa fa-link',
          title: '链接',
        },
        {
          name: 'image',
          action: SimpleMDE.drawImage,
          className: 'fa fa-picture-o',
          title: '图片',
        },
        {
          name: 'table',
          action: SimpleMDE.drawTable,
          className: 'fa fa-table',
          title: '表格',
        },
        '|',

        {
          name: 'post-article',
          action: (editor) => {
            this.props.setArticleContent({ mdContent: editor.value(), htmlContent: editor.markdown(editor.value()), submit: true });
          },
          className: 'fa-custom-post',
          title: '发布文章',
        },
        {
          name: 'fullscreen',
          action: SimpleMDE.toggleFullScreen,
          className: 'fa fa-arrows-alt no-disable no-mobile fa-custom-right',
          title: '全屏',
        },
        {
          name: 'side-by-side',
          action: SimpleMDE.toggleSideBySide,
          className: 'fa fa-columns no-disable no-mobile fa-custom-right',
          title: '分屏',
        },
        {
          name: 'preview',
          action: SimpleMDE.togglePreview,
          className: 'fa fa-eye no-disable fa-custom-right',
          title: '预览',
        },
      ],
      previewRender: function (plainText) {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: function (code) {
            return highlight.highlightAuto(code).value;
          },
        });
      },
    });
    this.smde.value(this.state.content || ''); 
  }
  
  componentWillUnmount() {
    this.smde.toTextArea();
    this.smde = null;
  }
  render() {
    if (this.smde) {
      this.smde.value(this.props.articleContent || ''); 
    }
    return (
      <textarea id="editor" />
    );
  }
}