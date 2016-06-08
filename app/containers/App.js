import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Header from '../components/Header';
// import MainSection from '../components/MainSection';
import * as ImageActions from '../actions/images';
import style from './App.css';

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
          {
            images.map((img) =>
              <div key={img.id}>
                <img src={img.src} width={80} />
              </div>
            )
          }

        </div>
        <div className={style.pinPanel}>
          Pin editor panel
        </div>
      </div>
    );
  }
}
