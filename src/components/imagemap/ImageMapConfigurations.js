import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectedProject from '../SelectedProject/SelectedProject';
import WorkspaceBrowser from '../WorkspaceBrowser/WorkspaceBrowser';
import { WorkspaceSideMenu } from './styles';

class ImageMapConfigurations extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object,
    onChange: PropTypes.func,
  };

  // componentDidMount() {
  //   this.mapHandler();
  //   this.urlHandler();
  // }

  checkMapValue = value => {
    const { canvasRef } = this.props;
    return canvasRef ? canvasRef[value] : null;
  };

  checkTextValue = value => {
    const { selectedItem } = this.props;
    return selectedItem ? selectedItem[value] : null;
  };

  mapHandler = () => {
    const { selectedItem, onChange } = this.props;
    const map = {
      workarea: {
        name: this.checkMapValue('name'),
        layout: this.checkMapValue('layout'),
        width: this.checkMapValue('width'),
        height: this.checkMapValue('height'),
      },
    };
    const change = {
      layout: 'responsive',
    };
    const allData = { workarea: { ...map.workarea, width: 900 } };
    onChange(selectedItem, change, allData);
    console.log(selectedItem, change, allData, 'Makeshift');
  };

  urlHandler = () => {
    const { selectedItem, onChange } = this.props;
    const change = {
      src:
        'https://res.cloudinary.com/dzv9elyyj/image/upload/v1565814499/Copywriting%20Projects/AdWriter_zorl4d.jpg',
    };
    const allData = {
      workarea: {
        imageLoadType: 'src',
        src: '',
        url: '',
      },
    };
    onChange(selectedItem, change, allData);
    console.log(selectedItem, change, allData, 'Makeshift');
  };

  render() {
    const { onChange, selectedItem, canvasRef, path } = this.props;

    const map = {
      workarea: {
        name: this.checkMapValue('name'),
        layout: this.checkMapValue('layout'),
        width: this.checkMapValue('width'),
        height: this.checkMapValue('height'),
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

    const fileHandler = ({ currentTarget: { files } }) => {
      const change = {
        file: files[0],
      };
      const allData = {
        workarea: {
          imageLoadType: 'file',
          file: null,
        },
      };
      onChange(selectedItem, change, allData);
      console.log(selectedItem, change, allData, 'Makeshift', files[0]);
    };

    const textHandler = () => {
      const change = {
        opacity: 0.2,
      };
      onChange(selectedItem, change, styleValues);
    };

    const pathHandler = (originalProject, cloneProject) =>
      path.split('/')[2] === 'browse' ? cloneProject : originalProject;

    return (
      <WorkspaceSideMenu>
        {pathHandler(<SelectedProject />, <WorkspaceBrowser path={path} />)}
      </WorkspaceSideMenu>
    );
  }
}

export default ImageMapConfigurations;
