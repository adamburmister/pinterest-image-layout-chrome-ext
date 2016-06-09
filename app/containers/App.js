import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinLayout from '../components/PinLayout';
// import MainSection from '../components/MainSection';
import * as ImageActions from '../actions/images';
import style from './App.css';
import ImageLayout from '../components/ImageLayout';

@connect(
  state => ({
    images: state.images
  }),
  dispatch => ({
    actions: bindActionCreators(ImageActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { images } = this.props;

    return (
      <div className={style.container}>
        <div className={style.imagesPanel}>
          Images components
          <ImageLayout items={images} columnWidth={200} columns={3} gutter={8} />
        </div>
        <div className={style.pinPanel}>
          <PinLayout image={images} />
        </div>
      </div>
    );
  }
}
