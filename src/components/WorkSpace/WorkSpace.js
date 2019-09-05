import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Button, Grid } from '@material-ui/core';
import BrandStory from '../BrandStory/BrandStory';
import BrainStorm from '../BrainStorm/BrainStorm';
import { WorkspaceSideMenu, TabContainer, OptionsBar } from './styles';

class WorkSpace extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object,
    onChange: PropTypes.func,
  };

  componentDidMount() {
    // this.mapHandler();
    // this.urlHandler();
  }

  state = {
    tab: 0,
  };

  tabHandler = (e, tab) => {
    this.setState({ tab });
  };

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
  };

  urlHandler = () => {
    const { selectedItem, onChange } = this.props;
    const change = {
      src:
        'https://res.cloudinary.com/dzv9elyyj/image/upload/v1567637834/Copywriting%20Projects/T-print_ibgr5d.png',
    };
    const allData = {
      workarea: {
        imageLoadType: 'src',
        src: '',
        url: '',
      },
    };
    onChange(selectedItem, change, allData);
  };

  render() {
    const {
      onChange,
      selectedItem,
      canvasRef,
      projectId,
      saveProjectHandler,
      isSaving,
      project,
    } = this.props;
    const { tab } = this.state;

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
    };

    const textHandler = () => {
      const change = {
        opacity: 0.2,
      };
      onChange(selectedItem, change, styleValues);
    };

    return (
      <WorkspaceSideMenu>
        <Tabs
          variant="fullWidth"
          name="Switch"
          value={tab}
          onChange={this.tabHandler}
          aria-label="simple tabs example"
        >
          <Tab
            label="Brand Story"
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
          />
          <Tab
            label="WorkSpace"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
        </Tabs>
        <TabContainer>
          {tab ? (
            <BrainStorm projectId={projectId} />
          ) : (
            <BrandStory brandStory={project.brandStory} title={project.title} />
          )}
        </TabContainer>
        <OptionsBar container justify="space-between">
          <Grid item xs={3}>
            {false && (
              <Button color="primary" variant="outlined" size="large">
                Like
              </Button>
            )}
          </Grid>
          <Grid item xs={3}>
            {false && (
              <Button color="primary" variant="outlined" size="large">
                Swipe
              </Button>
            )}
          </Grid>
          <Grid item xs={5} justify="flex-end">
            <Button
              color="primary"
              variant="outlined"
              size="large"
              onClick={saveProjectHandler}
              disabled={isSaving}
            >
              Save Project
            </Button>
          </Grid>
        </OptionsBar>
      </WorkspaceSideMenu>
    );
  }
}

export default WorkSpace;
