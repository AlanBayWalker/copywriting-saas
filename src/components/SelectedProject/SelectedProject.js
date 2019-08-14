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
        name="Switch"
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
        <Tab
          label="Benefits"
          id="simple-tab-2"
          aria-controls="simple-tabpanel-2"
        />
      </Tabs>
      <div style={{ padding: '0 2rem' }}>
        {sectionState === 0 ? <BrandStory /> : <BrainStorm />}
      </div>
    </>
  );
};

export default SelectedProject;
