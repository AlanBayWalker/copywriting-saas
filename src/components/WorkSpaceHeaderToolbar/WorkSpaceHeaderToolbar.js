import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Snackbar,
  Button,
  Tooltip,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import uuid from 'uuid/v4';
import {
  VerticalDivider,
  Content,
  FormatButton,
  DeleteIcon,
  SaveIcon,
  FormatBoldIcon,
  FormatItalicIcon,
  FormatStrikethroughIcon,
  FormatUnderlinedIcon,
  FormatAlignCenterIcon,
  FormatAlignJustifyIcon,
  FormatAlignLeftIcon,
  FormatAlignRightIcon,
  FormatColorTextIcon,
} from './styles';
import ColorPicker from '../ColorPicker/Colorpicker';

class ImageMapItems extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
  };

  state = {
    warning: false,
    warningMessage: '',
    colorPickerMenu: null,
  };

  componentDidMount() {
    const { canvasRef } = this.props;
    this.waitForCanvasRender(canvasRef);
  }

  componentWillUnmount() {
    const { canvasRef } = this.props;
    this.detachEventListener(canvasRef);
  }

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

  attachEventListener = canvas => {
    canvas.canvas.wrapperEl.addEventListener(
      'dragenter',
      this.events.onDragEnter,
      false
    );
    canvas.canvas.wrapperEl.addEventListener(
      'dragover',
      this.events.onDragOver,
      false
    );
    canvas.canvas.wrapperEl.addEventListener(
      'dragleave',
      this.events.onDragLeave,
      false
    );
    canvas.canvas.wrapperEl.addEventListener('drop', this.events.onDrop, false);
  };

  detachEventListener = canvas => {
    canvas.canvas.wrapperEl.removeEventListener(
      'dragenter',
      this.events.onDragEnter
    );
    canvas.canvas.wrapperEl.removeEventListener(
      'dragover',
      this.events.onDragOver
    );
    canvas.canvas.wrapperEl.removeEventListener(
      'dragleave',
      this.events.onDragLeave
    );
    canvas.canvas.wrapperEl.removeEventListener('drop', this.events.onDrop);
  };

  /* eslint-disable react/sort-comp, react/prop-types */
  handlers = {
    onAddItem: (item, centered) => {
      const { canvasRef } = this.props;
      if (canvasRef.workarea.layout === 'responsive') {
        if (!canvasRef.workarea.isElement) {
          this.materialUI.warningOpenHandler(
            'Please your select background image'
          );
          return;
        }
      }
      if (canvasRef.interactionMode === 'polygon') {
        this.materialUI.warningOpenHandler('Already drawing');
        return;
      }
      const id = uuid();
      const option = Object.assign({}, item.option, { id });
      if (item.option.type === 'svg' && item.type === 'default') {
        this.handlers.onSVGModalVisible(item.option);
        return;
      }
      canvasRef.handlers.add(option, centered);
    },
  };

  events = {
    onDragStart: (e, item) => {
      this.item = item;
      const { target } = e;
      target.classList.add('dragging');
    },
    onDragOver: e => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'copy';
      return false;
    },
    onDragEnter: e => {
      const { target } = e;
      target.classList.add('over');
    },
    onDragLeave: e => {
      const { target } = e;
      target.classList.remove('over');
    },
    onDrop: e => {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      const { layerX, layerY } = e;
      const dt = e.dataTransfer;
      if (dt.types.length && dt.types[0] === 'Files') {
        const { files } = dt;
        Array.from(files).forEach(file => {
          file.uid = uuid();
          const { type } = file;
          if (
            type === 'image/png' ||
            type === 'image/jpeg' ||
            type === 'image/jpg'
          ) {
            const item = {
              option: {
                type: 'image',
                file,
                left: layerX,
                top: layerY,
              },
            };
            this.handlers.onAddItem(item, false);
          } else {
            this.materialUI.warningOpenHandler('Not supported file type');
          }
        });
        return false;
      }
      const option = Object.assign({}, this.item.option, {
        left: layerX,
        top: layerY,
      });
      const newItem = Object.assign({}, this.item, { option });
      this.handlers.onAddItem(newItem, false);
      return false;
    },
    onDragEnd: e => {
      this.item = null;
      e.target.classList.remove('dragging');
    },
  };

  materialUI = {
    warningOpenHandler: warningMessage => {
      this.setState({ warning: true, warningMessage });
    },
    warningCloseHandler: () => {
      this.setState({ warning: false });
    },
    colorPickerMenuOpenHandler: ({ currentTarget }) => {
      this.setState(() => ({ colorPickerMenu: currentTarget }));
    },
    colorPickerMenuCloseHandler: () => {
      this.setState(() => ({ colorPickerMenu: null }));
    },
  };

  textHandlers = {
    fontSizeHandler: ({ target: { value } }) => {
      const { onChange, selectedItem } = this.props;
      const change = { fontSize: value };
      onChange(selectedItem, change, this.getTextValue());
    },
    fontWeightHandler: () => {
      const { onChange, selectedItem } = this.props;
      const change = { fontWeight: selectedItem.fontWeight !== 'bold' };
      onChange(selectedItem, change, this.getTextValue());
    },
    fontStyleHandler: () => {
      const { onChange, selectedItem } = this.props;
      const change = { fontStyle: selectedItem.fontStyle !== 'italic' };
      onChange(selectedItem, change, this.getTextValue());
    },
    lineThroughHandler: () => {
      const { onChange, selectedItem } = this.props;
      const change = { linethrough: !selectedItem.linethrough };
      onChange(selectedItem, change, this.getTextValue());
    },
    underlineHandler: () => {
      const { onChange, selectedItem } = this.props;
      const change = { underline: !selectedItem.underline };
      onChange(selectedItem, change, this.getTextValue());
    },
    textAlignHandler: direction => () => {
      const { onChange, selectedItem } = this.props;
      const change = {
        textAlign: {},
      };
      change.textAlign[direction] = true;
      console.log(selectedItem, change, this.getTextValue(), 'handler');
      onChange(selectedItem, change, this.getTextValue());
    },
    opacityHandler: ({ target: { value } }) => {
      const { onChange, selectedItem } = this.props;
      const change = { opacity: value };
      onChange(selectedItem, change, this.getTextValue());
    },
    fontColorHandler: ({ hex }) => {
      const { onChange, selectedItem } = this.props;
      const change = { fill: hex, stroke: hex };
      onChange(selectedItem, change, this.getTextValue());
    },
  };

  checkTextValue = value => {
    const { selectedItem } = this.props;
    return selectedItem ? selectedItem[value] : null;
  };

  getTextValue = () => ({
    charSpacing: this.checkTextValue('charSpacing'),
    fontFamily: this.checkTextValue('fontFamily'),
    fontSize: this.checkTextValue('fontSize'),
    fontStyle: this.checkTextValue('fontStyle'),
    fontWeight: this.checkTextValue('fontWeight'),
    lineHeight: this.checkTextValue('lineHeight'),
    linethrough: this.checkTextValue('linethrough'),
    textAlign: this.checkTextValue('textAlign'),
    underline: this.checkTextValue('underline'),
    fill: this.checkTextValue('fill'),
    opacity: this.checkTextValue('opacity'),
    stroke: this.checkTextValue('stroke'),
    strokeWidth: this.checkTextValue('strokeWidth'),
  });

  render() {
    const { onAddItem } = this.handlers;
    const { onDragStart, onDragEnd } = this.events;
    const { warning, warningMessage } = this.state;
    const { onSaveImage, onDeleteText, selectedItem } = this.props;

    const item = {
      name: 'Text',
      description: '',
      type: 'text',
      icon: {
        prefix: 'fas',
        name: 'font',
      },
      option: {
        type: 'textbox',
        text: '',
        width: 60,
        height: 30,
        fontSize: 32,
        name: 'New text',
      },
    };

    const generalValues = {
      height: this.checkTextValue('height'),
      left: this.checkTextValue('left'),
      lock: this.checkTextValue('lock'),
      name: this.checkTextValue('name'),
      top: this.checkTextValue('top'),
      visible: this.checkTextValue('visible'),
      width: this.checkTextValue('width'),
    };
    const textValues = {
      charSpacing: this.checkTextValue('charSpacing'),
      fontFamily: this.checkTextValue('fontFamily'),
      fontSize: this.checkTextValue('fontSize'),
      fontStyle: this.checkTextValue('fontStyle'),
      fontWeight: this.checkTextValue('fontWeight'),
      lineHeight: this.checkTextValue('lineHeight'),
      linethrough: this.checkTextValue('linethrough'),
      textAlign: this.checkTextValue('textAlign'),
      underline: this.checkTextValue('underline'),
    };
    const styleValues = {
      fill: this.checkTextValue('fill'),
      opacity: this.checkTextValue('opacity'),
      stroke: this.checkTextValue('stroke'),
      strokeWidth: this.checkTextValue('strokeWidth'),
    };

    const centered = true;

    const fontFormatItems = {
      bold: {
        title: 'bold',
        onClick: this.textHandlers.fontWeightHandler,
        Icon: FormatBoldIcon,
        active: {
          property: 'fontWeight',
          value: 'bold',
        },
      },
      italic: {
        title: 'italic',
        onClick: this.textHandlers.fontStyleHandler,
        Icon: FormatItalicIcon,
        active: {
          property: 'fontStyle',
          value: 'italic',
        },
      },
      linethrough: {
        title: 'Linethrough',
        onClick: this.textHandlers.lineThroughHandler,
        Icon: FormatStrikethroughIcon,
        active: {
          property: 'linethrough',
          value: true,
        },
      },
      underline: {
        title: 'Underline',
        onClick: this.textHandlers.underlineHandler,
        Icon: FormatUnderlinedIcon,
        active: {
          property: 'underline',
          value: true,
        },
      },
    };

    const alignFontItems = {
      alignCenter: {
        title: 'Align Center',
        onClick: this.textHandlers.textAlignHandler('center'),
        Icon: FormatAlignCenterIcon,
        active: {
          property: 'textAlign',
          value: 'center',
        },
      },
      alignJustify: {
        title: 'Align Justify',
        onClick: this.textHandlers.textAlignHandler('justify'),
        Icon: FormatAlignJustifyIcon,
        active: {
          property: 'textAlign',
          value: 'justify',
        },
      },
      alignLeft: {
        title: 'Align Left',
        onClick: this.textHandlers.textAlignHandler('left'),
        Icon: FormatAlignLeftIcon,
        active: {
          property: 'textAlign',
          value: 'left',
        },
      },
      alignRight: {
        title: 'Align Right',
        onClick: this.textHandlers.textAlignHandler('right'),
        Icon: FormatAlignRightIcon,
        active: {
          property: 'textAlign',
          value: 'right',
        },
      },
    };

    const renderItems = items => {
      const res = [];

      _.map(items, ({ title, onClick, Icon, active }) => {
        res.push(
          <Tooltip title={title} key={title}>
            <FormatButton
              onClick={onClick}
              active={
                this.getTextValue()[active.property] === active.value
                  ? true
                  : undefined
              }
            >
              <Icon className="font-format-icon" />
            </FormatButton>
          </Tooltip>
        );
      });
      return res;
    };

    return (
      <Content>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={warning}
          autoHideDuration={3000}
          onClose={this.materialUI.warningCloseHandler}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={warningMessage}
        />
        <span
          draggable
          onClick={e => onAddItem(item, centered)}
          onDragStart={e => onDragStart(e, item)}
          onDragEnd={e => onDragEnd(e, item)}
        >
          {item.name}
        </span>
        {renderItems(fontFormatItems)}
        <ToggleButtonGroup
          value={selectedItem && selectedItem.textAlign}
          exclusive
          onChange={this.textHandlers.textAlignHandler}
        >
          <ToggleButton value="left">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right">
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify">
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <VerticalDivider />

        {renderItems(alignFontItems)}

        <VerticalDivider />

        <Tooltip title="Font Size">
          <Select
            value={textValues.fontSize ? textValues.fontSize : 0}
            onChange={this.textHandlers.fontSizeHandler}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
            style={{ margin: '0 10px' }}
          >
            {_.times(60, i => (
              <MenuItem value={i} key={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>

        <Tooltip title="Opacity">
          <TextField
            id="standard-number"
            value={selectedItem ? selectedItem.opacity : 1}
            onChange={this.textHandlers.opacityHandler}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 1, step: '0.1' } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Tooltip>
        <Tooltip title="Color">
          <ColorPicker
            button={<FormatColorTextIcon />}
            onChangeComplete={this.textHandlers.fontColorHandler}
            color={selectedItem && selectedItem.fill}
          />
        </Tooltip>

        <VerticalDivider />

        <Tooltip title="Save">
          <Button onClick={onSaveImage}>
            <SaveIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            disabled={
              this.canvasRef ? this.canvasRef.interactionMode === 'crop' : false
            }
            onClick={onDeleteText}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </Content>
    );
  }
}

export default ImageMapItems;
