import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { scrollPercentAction, isScrollUpAction } from '../redux-root/action/scroll';
import { getScrollPercent, getScrollTop, ScrollToAnimate } from '../util';
import './backToUp.less';
@connect(
  state => ({ 
    percent: state.scrollPercent.percent,
    current:state.scrollPercent.current,
    ScrollUp: state.scrollUp.isScrollUp,
  }),
  dispatch => ({ 
    getCurrentPercent: (n) => dispatch(scrollPercentAction(n)),
    isScrollUp: (n) => dispatch(isScrollUpAction(n)), 
  })
)
class backToUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    window.onscroll = this.scrollPercent;
  }
  scrollToTop = () => {
    ScrollToAnimate(this.props.marginTop, this.props.step,this.props.current);
  }
  scrollPercent = () => {
    let percent = this.props.percent;
    this.props.getCurrentPercent({ percent: getScrollPercent(), current: getScrollTop()});
    if (percent > this.props.percent) {
      this.props.isScrollUp(true);
    } else if (percent < this.props.percent){
      this.props.isScrollUp(false);
    }
    // this.setState({ current: getScrollTop()});
  }
  componentDidMount() {

  }
  render() {
    const { visiblePercent, percent } = this.props;
    let visible = percent > visiblePercent;
    return (
      <div onClick={() => this.scrollToTop()} className=
        {visible ? 'scroll-up-show' : 'scroll-up'}>
        <Icon type="up-square" className="to-top-icon"/>
        {/* "scroll-up-show"> */}
        <div className="to-up-percent">{percent + '%'}</div>
      </div>
    );
  }
}
export default backToUp;