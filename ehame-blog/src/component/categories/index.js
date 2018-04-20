import React, { Component } from 'react';
import Categories from './categories';
import { Route} from 'react-router-dom';
import TimeLine from './timeLine';
import './categories.less';

export default class CategoriesIndex extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="categories-main">
        {children}
        <div className="recent-main">recent</div>
      </div>
    );
  }
}