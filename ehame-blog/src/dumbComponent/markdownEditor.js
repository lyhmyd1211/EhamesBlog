import React, { Component } from 'react';
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';
// import { guid } from '../util';
export default class Markdown extends Component {
  componentDidMount(){
    this.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,
      autofocus: true,
      autosave: {
        enabled: true,
        delay: 100000,
        uniqueId: 'markdown1',
      },
      renderingConfig: {
        codeSyntaxHighlighting: true,
      },
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
  }
  handleChange(value) {
    this.setState({ text: value });
  }
  componentWillUnmount(){
    this.smde.toTextArea();
    this.smde = null;
  }
  render() {
    return (
      <textarea id="editor" />
    );
  }
}