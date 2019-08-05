import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import BrandStory from '../BrandStory/BrandStory';
import BrainStorm from '../BrainStorm/BrainStorm';

const SelectedProject = () => {
  const [sectionState, setSectionState] = useState(0);
  const sectionHandler = (e, value) => setSectionState(value);

  return (
    <>
      <Tabs
        name="hi"
        centered
        value={sectionState}
        onChange={sectionHandler}
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
      {sectionState === 0 ? <BrandStory /> : <BrainStorm />}
    </>
  );
};

export default SelectedProject;
