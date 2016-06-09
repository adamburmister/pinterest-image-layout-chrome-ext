/*
 * Encorperated from:
 * https://github.com/zackargyle/react-image-layout
 * Under MIT License
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageActions from '../actions/images';
import ToggleableImage from './ToggleableImage';

/*
 * The classic "masonry" style Pinterest grid
 * @prop {number} columns - the number of columns in the grid
 * @prop {number} columnWidth - the fixed width of the columns
 * @prop {number} gutter  - the number of columns in the grid
 * @prop {Array}  images   - the list of images to render
 */
@connect(
 state => ({
   images: state.images
 }),
 dispatch => ({
   actions: bindActionCreators(ImageActions, dispatch)
 })
)
class ImageLayout extends Component {

  constructor(props) {
    super(props);
    this.columnHeights = Array.from({ length: props.columns }, () => 0);
  }

    /*
     * Reset column heights to zero on update
     */
  componentWillUpdate(props) {
    this.columnHeights = Array.from({ length: props.columns }, () => 0);
  }

    /*
     * Get the shortest column in the list of columns heights
     */
  getShortestColumn() {
    const minValue = Math.min(...this.columnHeights);
    return this.columnHeights.indexOf(minValue);
  }

    /*
     * Determine the top and left positions of the grid image. Update the
     * cached column height.
     * @param {Object} image - the grid image
     * @param {Object} image.height - the grid image's image height
     * @param {Object} image.width - the grid image's image width
     */
  getItemStyle(image) {
    const { columnWidth, gutter } = this.props;
    const shortestColumnIndex = this.getShortestColumn();
    const left = (columnWidth + gutter) * shortestColumnIndex;
    const top = this.columnHeights[shortestColumnIndex];
    const normalizedHeight = (columnWidth / image.width) * image.height;
    this.columnHeights[shortestColumnIndex] += normalizedHeight + gutter;
    return {
      left: `${left}px`,
      top: `${top}px`,
      position: 'absolute'
    };
  }

  render() {
    const { images } = this.props;
    return (
      <div className="ImageLayout" style={{ position: 'relative' }}>
        {images.map(image => (
          <div style={this.getItemStyle(image)}>
            <ToggleableImage
              key={image.id}
              image={image}
              onClick={() => this.props.actions.toggleImageSelection(image.id)}
            />
          </div>
        ))}
      </div>
    );
  }
}

ImageLayout.propTypes = {
    // The number of columns in the grid
  columns: PropTypes.number,
    // The fixed width of the columns in the grid
  columnWidth: PropTypes.number,
    // The size of the gutter between images
  gutter: PropTypes.number,
    // The list of images to render
  images: PropTypes.array.isRequired,
  actions: PropTypes.object
};

ImageLayout.defaultProps = {
  columns: 4,
  columnWidth: 100,
  gutter: 0,
  images: [],
};

export default ImageLayout;
