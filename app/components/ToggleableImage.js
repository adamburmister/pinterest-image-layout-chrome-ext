import React, { PropTypes } from 'react';
import style from './ToggleableImage.css';
import classNames from 'classnames';

const ToggleableImage = ({ image, onClick }) => (
  <div className={classNames(style.ToggleableImage, { [style.checked]: image.isSelected })}>
    <div className={style.checkbox} />
    <img
      width={236}
      src={image.url}
      alt={image.url}
      onClick={onClick}
    />
  </div>
);

ToggleableImage.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ToggleableImage;
