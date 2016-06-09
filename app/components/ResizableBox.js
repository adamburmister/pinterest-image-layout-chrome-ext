import React, { PropTypes } from 'react';
import { Resizable } from 'react-resizable';
import style from './ResizableBox.css';

type State = {width: number, height: number, aspectRatio: number};
type Size = {width: number, height: number};
type ResizeData = {element: Element, size: Size};

export default class ResizableBox extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
  };

  static defaultProps = {
    handleSize: [20, 20]
  };

  state: State = {
    width: this.props.width,
    height: this.props.height,
  };

  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
  }

  onResize(event, { element, size }) {
    let { width, height } = size;

    this.setState(size, () => {
      this.props.onResize && this.props.onResize(event, { element, size });
    });
  }

  // onResize: (event: Event, data: ResizeData) => void;

  render(): React.Element {
    // Basic wrapper around a Resizable instance.
    // If you use Resizable directly, you are responsible for updating the child component
    // with a new width and height.
    let { handleSize, onResizeStart, onResizeStop, draggableOpts,
         minConstraints, maxConstraints, lockAspectRatio, width, height, ...props } = this.props;
    return (
      <Resizable
        handleSize={handleSize}
        width={this.state.width}
        height={this.state.height}
        onResizeStart={onResizeStart}
        onResize={this.onResize}
        onResizeStop={onResizeStop}
        draggableOpts={draggableOpts}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        lockAspectRatio={lockAspectRatio}
        className={style.resizable}
      >
        <div style={{
          width: this.state.width + 'px',
          height: this.state.height + 'px'
        }} {...props} />
      </Resizable>
    );
  }
}
