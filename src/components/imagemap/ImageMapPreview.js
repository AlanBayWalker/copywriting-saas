import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { ResizeSensor } from 'css-element-queries';
import CloseIcon from '@material-ui/icons/Close';
import Canvas from '../canvas/Canvas';

class ImageMapPreview extends Component {
  static propTypes = {
    preview: PropTypes.bool,
    onChangePreview: PropTypes.func,
    onTooltip: PropTypes.func,
    onAction: PropTypes.func,
  };

  state = {
    canvasRect: {
      width: 0,
      height: 0,
    },
  };

  componentDidMount() {
    this.resizeSensor = new ResizeSensor(this.container, e => {
      const { canvasRect: currentCanvasRect } = this.state;
      const canvasRect = Object.assign({}, currentCanvasRect, {
        width: this.container.clientWidth,
        height: this.container.clientHeight,
      });
      this.setState({
        canvasRect,
      });
    });
    this.setState({
      canvasRect: {
        width: this.container.clientWidth,
        height: this.container.clientHeight,
      },
    });
  }

  render() {
    const { canvasRect } = this.state;
    const { onChangePreview, onTooltip, onLink, preview } = this.props;
    return (
      <div
        style={
          preview
            ? {
                top: 0,
                left: 0,
                position: 'absolute',
                transition: 'transform 0.3s linear',
                transformOrigin: 'bottom right',
                width: '100%',
                height: '100%',
                transform: 'scale(1)',
                background: '#fff',
              }
            : {
                display: 'none',
              }
        }
      >
        <div
          ref={c => {
            this.container = c;
          }}
          style={{
            height: '100vh',
          }}
        >
          <Canvas
            ref={c => {
              this.canvasRef = c;
            }}
            editable={false}
            canvasOption={{
              width: canvasRect.width,
              height: canvasRect.height,
              backgroundColor: '#f3f3f3',
              selection: false,
            }}
            onTooltip={onTooltip}
            onLink={onLink}
          />
        </div>
        <Button
          onClick={onChangePreview}
          style={{ position: 'absolute', right: 0, top: 0 }}
        >
          <CloseIcon />
        </Button>
      </div>
    );
  }
}

export default ImageMapPreview;
