import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as ImageActions from '../actions/images';
import ReactCanvas, { Surface, Group, Gradient, Image, Text, FontFace } from 'react-canvas';
import style from './PinLayout.css';
import PinLayoutImagePanel from './PinLayoutImagePanel';

const DEFAULT_PIN_IMG_HEIGHT = 300
// TODO: Export to config file import
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

  render() {
    const selectedImages = this.props.images.filter((img) => img.isSelected);

    return (
      <section className={style.pin}>
        <div className={style.images}>
          {selectedImages.map(img =>
            <PinLayoutImagePanel image={img}  key={`${img.id}_resizable`} />
          )}
        </div>
        <div className={style.canvas} style={{display:'none'}}>
          <Surface top={0} left={0} width={PIN_WIDTH} height={DEFAULT_PIN_IMG_HEIGHT}>
            <Gradient
              style={this.getGradientStyle()}
              colorStops={this.getGradientColors()}
            />
          </Surface>
        </div>
        <div className={style.pinMetaWrapper}>
          <p className={style.pinDescription}>
            Blah blah blah {selectedImages.length}
          </p>
        </div>
      </section>
    );
  }
}

export default PinLayout;
