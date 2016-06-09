/*
 * Encorperated from:
 * https://github.com/zackargyle/react-image-layout
 * Under MIT License
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageActions from '../actions/images';

/*
 * The classic "masonry" style Pinterest grid
 * @prop {number} columns - the number of columns in the grid
 * @prop {number} columnWidth - the fixed width of the columns
 * @prop {number} gutter  - the number of columns in the grid
 * @prop {Array}  items   - the list of items to render
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
    this.renderItem = this.renderItem.bind(this);
  }

    /*
     * Get the shortest column in the list of columns heights
     */
  getShortestColumn() {
    const minValue = Math.min(...this.columnHeights);
    return this.columnHeights.indexOf(minValue);
  }

    /*
     * Determine the top and left positions of the grid item. Update the
     * cached column height.
     * @param {Object} item - the grid item
     * @param {Object} item.height - the grid item's image height
     * @param {Object} item.width - the grid item's image width
     */
  getItemStyle(item) {
    const { columnWidth, gutter } = this.props;
    const shortestColumnIndex = this.getShortestColumn();
    const left = (columnWidth + gutter) * shortestColumnIndex;
    const top = this.columnHeights[shortestColumnIndex];
    const normalizedHeight = (columnWidth / item.width) * item.height;
    this.columnHeights[shortestColumnIndex] += normalizedHeight + gutter;
    return {
      left: `${left}px`,
      top: `${top}px`,
      position: 'absolute'
    };
  }

    /*
     * Render helper for an individual grid item
     * @param {Object} item - the grid item to render
     * @param {Object} item.url - the image src url
     */
  renderItem(item, index) {
    return (
      <img
        className="ImageLayout__item"
        src={item.url}
        width={this.props.columnWidth}
        style={this.getItemStyle(item)}
        alt={item.isSelected.toString()}
        onClick={() => {
          this.props.actions.toggleImageSelection(item.id);
        }}
        key={index}
      />
    );
  }

  render() {
    const { items } = this.props;
    return (
      <div className="ImageLayout" style={{ position: 'relative' }}>
        {items.map(this.renderItem)}
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
  items: PropTypes.arrayOf(
        PropTypes.shape({
          height: PropTypes.number.isRequired,
          url: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired
        })
    ).isRequired,
  actions: PropTypes.object
};

ImageLayout.defaultProps = {
  columns: 4,
  columnWidth: 100,
  gutter: 0
};

export default ImageLayout;
