import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Switch, Tooltip } from '@material-ui/core';
import NearMeIcon from '@material-ui/icons/NearMe';
import PanToolIcon from '@material-ui/icons/PanTool';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { FooterToolbarContainer } from './styles';

class ImageMapFooterToolbar extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    preview: PropTypes.bool,
    onChangePreview: PropTypes.func,
    zoomRatio: PropTypes.number,
  };

  state = {
    interactionMode: 'selection',
    preview: false,
  };

  componentDidMount() {
    const { canvasRef } = this.props;
    this.waitForCanvasRender(canvasRef);
  }

  componentWillUnmount() {
    const { canvasRef } = this.props;
    this.detachEventListener(canvasRef);
  }

  previewInputHandler = () => {
    this.setState(({ preview }) => ({
      preview: !preview,
    }));
  };

  waitForCanvasRender = canvas => {
    setTimeout(() => {
      if (canvas) {
        this.attachEventListener(canvas);
        return;
      }
      const { canvasRef } = this.props;
      this.waitForCanvasRender(canvasRef);
    }, 5);
  };

  attachEventListener = canvasRef => {
    canvasRef.canvas.wrapperEl.addEventListener(
      'keydown',
      this.events.keydown,
      false
    );
  };

  detachEventListener = canvasRef => {
    canvasRef.canvas.wrapperEl.removeEventListener(
      'keydown',
      this.events.keydown
    );
  };

  /* eslint-disable react/sort-comp, react/prop-types */
  handlers = {
    selection: () => {
      this.props.canvasRef.modeHandlers.selection(obj => ({
        selectable: obj.superType !== 'port',
        evented: true,
      }));
      this.setState({ interactionMode: 'selection' });
    },
    grab: () => {
      this.props.canvasRef.modeHandlers.grab();
      this.setState({ interactionMode: 'grab' });
    },
  };

  events = {
    keydown: e => {
      if (this.props.canvasRef.canvas.wrapperEl !== document.activeElement) {
        return false;
      }
      if (e.keyCode === 81) {
        this.handlers.selection();
      } else if (e.keyCode === 87) {
        this.handlers.grab();
      }
    },
  };

  render() {
    const { canvasRef, preview, zoomRatio, onChangePreview } = this.props;
    const { interactionMode } = this.state;
    const { selection, grab } = this.handlers;
    if (!canvasRef) {
      return null;
    }
    const zoomValue = parseInt((zoomRatio * 100).toFixed(2), 10);
    return (
      <FooterToolbarContainer>
        <Tooltip title="Selection Mode">
          <Button onClick={selection}>
            <NearMeIcon style={{ transform: 'scaleX(-1)' }} />
          </Button>
        </Tooltip>
        <Tooltip title="Grab Mode">
          <Button onClick={grab}>
            <PanToolIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Zoom Out">
          <Button onClick={canvasRef.zoomHandlers.zoomOut}>
            <ZoomOutIcon />
          </Button>
        </Tooltip>
        <Button
          onClick={canvasRef.zoomHandlers.zoomOneToOne}
        >{`${zoomValue}%`}</Button>
        <Tooltip title="Scale to Fit">
          <Button onClick={canvasRef.zoomHandlers.zoomToFit}>1:1</Button>
        </Tooltip>
        <Tooltip title="Zoom In">
          <Button onClick={canvasRef.zoomHandlers.zoomIn}>
            <ZoomInIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Preview">
          <Button onClick={() => onChangePreview(!preview)}>
            <ZoomOutMapIcon />
          </Button>
        </Tooltip>
      </FooterToolbarContainer>
    );
  }
}

export default ImageMapFooterToolbar;
