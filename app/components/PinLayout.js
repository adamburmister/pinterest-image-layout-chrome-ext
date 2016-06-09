import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as ImageActions from '../actions/images';
import ReactCanvas, { Surface, Group, Gradient, Image, Text, FontFace } from 'react-canvas';
import style from './PinLayout.css';

const DEFAULT_PIN_IMG_HEIGHT = 300
const PIN_WIDTH = 236

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
      <section className={style.pin}>
        <div className={style.canvas}>
          <Surface top={0} left={0} width={PIN_WIDTH} height={DEFAULT_PIN_IMG_HEIGHT}>
            <Gradient
              style={this.getGradientStyle()}
              colorStops={this.getGradientColors()}
            />
          </Surface>
        </div>
        <div className={style.pinMetaWrapper}>
          <p className={style.pinDescription}>
            Black wooden cladding - Huize Monnikenheide - 51N4E - photo by Dorothee Dubois
          </p>
        </div>
      </section>
    );
  }


  getGradientStyle() {
    return {
      top: 0,
      left: 0,
      width: PIN_WIDTH,
      height: DEFAULT_PIN_IMG_HEIGHT
    };
  }

  getGradientColors() {
    return [
      { color: 'transparent', position: 0 },
      { color: '#000', position: 1 }
    ];
  }

}

export default PinLayout;
