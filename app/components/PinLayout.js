import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as ImageActions from '../actions/images';

import style from './PinLayout.css';

@connect(
  state => ({
    images: state.images
  })
)
class PinLayout extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  };

  render() {
    const { images } = this.props;
    return (
      <section className={style.pinLayout}>
        PinLayout
      </section>
    );
  }
}

export default PinLayout;
