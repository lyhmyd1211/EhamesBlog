import React, { Component } from 'react';
import Markdown from '../../dumbComponent/markdownEditor';
import {Row,Col} from 'antd';
export default class Write extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span="6">
            <div />
          </Col>
          <Col span="10">
            <Markdown />
          </Col>
        </Row>
      </div>
      
    );
  }
}