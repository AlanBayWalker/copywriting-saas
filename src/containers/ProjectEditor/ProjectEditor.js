import React, { Component } from 'react';
import { ResizeSensor } from 'css-element-queries';
import debounce from 'lodash/debounce';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Canvas from '../../components/Canvas/Canvas';
import WorkSpaceFooterToolbar from '../../components/WorkSpaceFooterToolbar/WorkSpaceFooterToolbar';
import WorkSpaceHeaderToolbar from '../../components/WorkSpaceHeaderToolbar/WorkSpaceHeaderToolbar';
import WorkSpacePreview from '../../components/WorkSpacePreview/WorkSpacePreview';
import WorkSpace from '../../components/WorkSpace/WorkSpace';
import { withContext } from '../../utility/context';

const propertiesToInclude = [
  'id',
  'name',
  'lock',
  'file',
  'src',
  'link',
  'tooltip',
  'animation',
  'layout',
  'workareaWidth',
  'workareaHeight',
  'videoLoadType',
  'autoplay',
  'shadow',
  'muted',
  'loop',
  'code',
  'icon',
  'userProperty',
  'trigger',
  'configuration',
  'superType',
  'points',
  'svg',
  'loadType',
];

const defaultOptions = {
  fill: 'rgba(0, 0, 0, 1)',
  stroke: 'rgba(255, 255, 255, 0)',
  strokeUniform: true,
  resource: {},
  link: {
    enabled: false,
    type: 'resource',
    state: 'new',
    dashboard: {},
  },
  tooltip: {
    enabled: true,
    type: 'resource',
    template: '<div>{{message.name}}</div>',
  },
  animation: {
    type: 'none',
    loop: true,
    autoplay: true,
    delay: 100,
    duration: 1000,
  },
  userProperty: {},
  trigger: {
    enabled: false,
    type: 'alarm',
    script: 'return message.value > 0;',
    effect: 'style',
  },
};

class ProjectEditor extends Component {
  state = {
    selectedItem: null,
    zoomRatio: 1,
    canvasRect: {
      width: 300,
      height: 150,
    },
    preview: false,
    loading: false,
    progress: 0,
    animations: [],
    styles: [],
    dataSources: [],
    editing: false,
    descriptors: {},
    uploadDialog: false,
    projectId: '',
    project: {},
    editPermission: false,
    isSaving: false,
  };

  /* eslint-disable react/sort-comp */
  async componentDidMount() {
    this.resizeSensor = new ResizeSensor(this.container, () => {
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
      selectedItem: null,
    });

    if (this.props.location.pathname.split('/').length > 2) {
      const {
        context: { user },
        location: {
          state: { type },
        },
        match: {
          params: { id },
        },
        contextHandler,
      } = this.props;

      if (type === 'templateId') {
        console.log(user, 'user');
        const completedProjects = user.projects.filter(
          ({ templateId }) => templateId === id
        );
        if (completedProjects.length === 0) {
          // call createProject api
          const project = await axios.post('/project', { templateId: id });
          console.log(project, 'Created new project');
          if (project.status >= 200 && project.status <= 299) {
            const newUser = {
              ...user,
              projects: [...user.projects, project.data],
            };
            this.canvasRef.handlers.importJSON(
              JSON.stringify(project.data.source.objects)
            );
            contextHandler({ user: newUser });
            this.setState({
              projectId: project.data.projectId,
              project: project.data,
              editPermission: true,
            });
          }
        } else if (completedProjects.length > 0) {
          // continue this project
          console.log(completedProjects[0], 'Continued previous project');
          this.canvasRef.handlers.importJSON(
            JSON.stringify(completedProjects[0].source.objects)
          );
          this.setState({
            projectId: completedProjects[0].projectId,
            project: completedProjects[0],
            editPermission: true,
          });
        }
      } else if (type === 'projectId') {
        // Continue project with projectId
        const [item] = user.projects.filter(
          ({ projectId }) => projectId === id
        );
        if (item) {
          console.log(item, 'Fetched own project');
          this.canvasRef.handlers.importJSON(
            JSON.stringify(item.source.objects)
          );
          this.setState({
            projectId: item.projectId,
            project: item,
            editPermission: true,
          });
        } else {
          const project = await axios.get(`/project/${id}`);
          console.log(project, "Fetched other user's project");
          if (project.status >= 200 && project.status <= 299) {
            this.canvasRef.handlers.importJSON(
              JSON.stringify(project.data.source.objects)
            );
            this.setState({
              projectId: project.data.projectId,
              project: project.data,
            });
          }
        }
      }
    }
    console.log('End project Fetch');
  }

  /* eslint-enable react/sort-comp */

  canvasHandlers = {
    onAdd: target => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      if (target.type === 'activeSelection') {
        this.canvasHandlers.onSelect(null);
        return;
      }
      this.canvasRef.handlers.select(target);
    },
    onSelect: target => {
      if (
        target &&
        target.id &&
        target.id !== 'workarea' &&
        target.type !== 'activeSelection'
      ) {
        if (
          this.state.selectedItem &&
          target.id === this.state.selectedItem.id
        ) {
          return;
        }
        this.canvasRef.handlers.getObjects().forEach(obj => {
          if (obj) {
            this.canvasRef.animationHandlers.initAnimation(obj, true);
          }
        });
        this.setState({
          selectedItem: target,
        });
        return;
      }
      this.canvasRef.handlers.getObjects().forEach(obj => {
        if (obj) {
          this.canvasRef.animationHandlers.initAnimation(obj, true);
        }
      });
      this.setState({
        selectedItem: null,
      });
    },
    onRemove: target => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.canvasHandlers.onSelect(null);
    },
    onModified: debounce(target => {
      const { editing, projectId } = this.state;
      const {
        context: { user },
        contextHandler,
      } = this.props;

      if (!editing) {
        this.changeEditing(true);
      }
      if (
        target &&
        target.id &&
        target.id !== 'workarea' &&
        target.type !== 'activeSelection'
      ) {
        this.canvasRef.transactionHandlers.save(target, 'modified');
        this.setState({
          selectedItem: target,
        });

        console.log('modified');
        const [project] = user.projects.filter(
          item => item.projectId === projectId
        );
        if (project) {
          const newUser = { ...user };
          const newProject = { ...project };
          const objects = this.canvasRef.handlers
            .exportJSON()
            .objects.filter(obj => {
              if (!obj.id) {
                return false;
              }
              return true;
            });
          newProject.source.objects = objects;
          const projectIndex = newUser.projects.findIndex(
            item => item === project
          );
          newUser.projects.splice(projectIndex, 1, newProject);
          contextHandler({ user: newUser });
        }
        return;
      }
      this.setState({
        selectedItem: null,
      });
    }, 300),
    onZoom: zoom => {
      this.setState({
        zoomRatio: zoom,
      });
    },
    onChange: (selectedItem, changedValues, allValues) => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      const changedKey = Object.keys(changedValues)[0];
      const changedValue = changedValues[changedKey];
      if (allValues.workarea) {
        this.canvasHandlers.onChangeWokarea(
          changedKey,
          changedValue,
          allValues.workarea
        );
        return;
      }
      if (changedKey === 'width' || changedKey === 'height') {
        this.canvasRef.handlers.scaleToResize(
          allValues.width,
          allValues.height
        );
        this.canvasRef.transactionHandlers.save(selectedItem, 'modified');
        return;
      }
      if (changedKey === 'lock') {
        this.canvasRef.handlers.setObject({
          lockMovementX: changedValue,
          lockMovementY: changedValue,
          hasControls: !changedValue,
          hoverCursor: changedValue ? 'pointer' : 'move',
          editable: !changedValue,
          lock: changedValue,
        });
        return;
      }
      if (
        changedKey === 'file' ||
        changedKey === 'src' ||
        changedKey === 'code'
      ) {
        if (selectedItem.type === 'image') {
          this.canvasRef.handlers.setImageById(selectedItem.id, changedValue);
        } else if (this.canvasRef.handlers.isElementType(selectedItem.type)) {
          this.canvasRef.elementHandlers.setById(selectedItem.id, changedValue);
        }
        return;
      }
      if (changedKey === 'link') {
        const link = Object.assign({}, defaultOptions.link, allValues.link);
        this.canvasRef.handlers.set(changedKey, link);
        return;
      }
      if (changedKey === 'tooltip') {
        const tooltip = Object.assign(
          {},
          defaultOptions.tooltip,
          allValues.tooltip
        );
        this.canvasRef.handlers.set(changedKey, tooltip);
        return;
      }
      if (changedKey === 'animation') {
        const animation = Object.assign(
          {},
          defaultOptions.animation,
          allValues.animation
        );
        this.canvasRef.handlers.set(changedKey, animation);
        return;
      }
      if (changedKey === 'icon') {
        const { unicode, styles } = changedValue[Object.keys(changedValue)[0]];
        const uni = parseInt(unicode, 16);
        if (styles[0] === 'brands') {
          this.canvasRef.handlers.set('fontFamily', 'Font Awesome 5 Brands');
        } else if (styles[0] === 'regular') {
          this.canvasRef.handlers.set('fontFamily', 'Font Awesome 5 Regular');
        } else {
          this.canvasRef.handlers.set('fontFamily', 'Font Awesome 5 Free');
        }
        this.canvasRef.handlers.set('text', String.fromCodePoint(uni));
        this.canvasRef.handlers.set('icon', changedValue);
        return;
      }
      if (changedKey === 'shadow') {
        if (allValues.shadow.enabled) {
          this.canvasRef.handlers.setShadow(changedKey, allValues.shadow);
        } else {
          this.canvasRef.handlers.setShadow(changedKey, null);
        }
        return;
      }
      if (changedKey === 'fontWeight') {
        this.canvasRef.handlers.set(
          changedKey,
          changedValue ? 'bold' : 'normal'
        );
        return;
      }
      if (changedKey === 'fontStyle') {
        this.canvasRef.handlers.set(
          changedKey,
          changedValue ? 'italic' : 'normal'
        );
        return;
      }
      if (changedKey === 'textAlign') {
        this.canvasRef.handlers.set(changedKey, changedValue);
        return;
      }
      if (changedKey === 'trigger') {
        const trigger = Object.assign(
          {},
          defaultOptions.trigger,
          allValues.trigger
        );
        this.canvasRef.handlers.set(changedKey, trigger);
        return;
      }
      this.canvasRef.handlers.set(changedKey, changedValue);
    },
    onChangeWokarea: (changedKey, changedValue, allValues) => {
      if (changedKey === 'layout') {
        this.canvasRef.workareaHandlers.setLayout(changedValue);
        return;
      }
      if (changedKey === 'file' || changedKey === 'src') {
        this.canvasRef.workareaHandlers.setImage(changedValue);
        return;
      }
      if (changedKey === 'width' || changedKey === 'height') {
        this.canvasRef.handlers.originScaleToResize(
          this.canvasRef.workarea,
          allValues.width,
          allValues.height
        );
        this.canvasRef.canvas.centerObject(this.canvasRef.workarea);
        return;
      }
      this.canvasRef.workarea.set(changedKey, changedValue);
      this.canvasRef.canvas.requestRenderAll();
    },
    onTooltip: (ref, target) => {
      console.log(target, 'target');
      const value = Math.random() * 10 + 1;
      const { animations, styles } = this.state;
      // const { code } = target.trigger;
      // const compile = SandBox.compile(code);
      // const result = compile(value, animations, styles, target.userProperty);
      // console.log(result);
      return <div>{target.name}</div>;
    },
    onLink: (canvas, target) => {
      const { link } = target;
      if (link.state === 'current') {
        document.location.href = link.url;
        return;
      }
      window.open(link.url);
    },
    onContext: (ref, event, target) => null,
  };

  handlers = {
    onChangePreview: checked => {
      this.setState(
        {
          preview: typeof checked === 'object' ? false : checked,
        },
        () => {
          if (this.state.preview) {
            const data = this.canvasRef.handlers
              .exportJSON()
              .objects.filter(obj => {
                if (!obj.id) {
                  return false;
                }
                return true;
              });
            this.preview.canvasRef.handlers.importJSON(data);
            return;
          }
          this.preview.canvasRef.handlers.clear();
        }
      );
    },
    onProgress: progress => {
      this.setState({
        progress,
      });
    },
    onImport: files => {
      if (files) {
        this.showLoading(true);
        setTimeout(() => {
          const reader = new FileReader();
          reader.onprogress = e => {
            if (e.lengthComputable) {
              const progress = parseInt((e.loaded / e.total) * 100, 10);
              this.handlers.onProgress(progress);
            }
          };
          reader.onload = e => {
            const { objects, animations, styles, dataSources } = JSON.parse(
              e.target.result
            );
            this.setState({
              animations,
              styles,
              dataSources,
            });
            if (objects) {
              this.canvasRef.handlers.clear(true);
              const data = objects.filter(obj => {
                if (!obj.id) {
                  return false;
                }
                return true;
              });
              this.canvasRef.handlers.importJSON(JSON.stringify(data));
            }
          };
          reader.onloadend = () => {
            this.showLoading(false);
          };
          reader.onerror = () => {
            this.showLoading(false);
          };
          reader.readAsText(files[0]);
        }, 500);
      }
    },
    onUpload: () => {
      const inputEl = document.createElement('input');
      inputEl.accept = '.json';
      inputEl.type = 'file';
      inputEl.hidden = true;
      inputEl.onchange = e => {
        this.handlers.onImport(e.target.files);
      };
      document.body.appendChild(inputEl); // required for firefox
      inputEl.click();
      inputEl.remove();
    },
    onDownload: () => {
      this.showLoading(true);
      const objects = this.canvasRef.handlers
        .exportJSON()
        .objects.filter(obj => {
          if (!obj.id) {
            return false;
          }
          return true;
        });
      const { animations, styles, dataSources } = this.state;
      const exportDatas = {
        objects,
        animations,
        styles,
        dataSources,
      };
      const anchorEl = document.createElement('a');
      anchorEl.href = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(exportDatas, null, '\t')
      )}`;
      anchorEl.download = `${this.canvasRef.workarea.name || 'sample'}.json`;
      document.body.appendChild(anchorEl); // required for firefox
      anchorEl.click();
      anchorEl.remove();
      this.showLoading(false);
    },
    onChangeAnimations: animations => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.setState({
        animations,
      });
    },
    onChangeStyles: styles => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.setState({
        styles,
      });
    },
    onChangeDataSources: dataSources => {
      if (!this.state.editing) {
        this.changeEditing(true);
      }
      this.setState({
        dataSources,
      });
    },
    onSaveImage: () => {
      this.canvasRef.handlers.saveCanvasImage();
    },
    onDeleteText: () => {
      this.canvasRef.handlers.remove();
    },
  };

  transformList = () =>
    Object.values(this.state.descriptors).reduce(
      (prev, curr) => prev.concat(curr),
      []
    );

  showLoading = loading => {
    this.setState({
      loading,
    });
  };

  changeEditing = editing => {
    this.setState({
      editing,
    });
  };

  saveProjectHandler = async () => {
    const {
      context: {
        user: { projects },
      },
    } = this.props;
    const { projectId } = this.state;
    const [item] = projects.filter(project => project.projectId === projectId);

    if (item) {
      this.setState({ isSaving: true });
      const savedProject = await axios.post(`/project/${item.projectId}`, {
        project: item,
      });

      if (savedProject.status >= 200 && savedProject.status <= 299) {
        this.setState({ isSaving: false });
      }
    }
  };

  render() {
    const {
      preview,
      selectedItem,
      canvasRect,
      zoomRatio,
      loading,
      progress,
      animations,
      styles,
      dataSources,
      editing,
      descriptors,
      uploadDialog,
      projectId,
      project,
      isSaving,
    } = this.state;
    const {
      onAdd,
      onRemove,
      onSelect,
      onModified,
      onChange,
      onZoom,
      onTooltip,
      onLink,
      onContext,
    } = this.canvasHandlers;
    const {
      onChangePreview,
      onDownload,
      onUpload,
      onChangeAnimations,
      onChangeStyles,
      onChangeDataSources,
      onSaveImage,
      onDeleteText,
    } = this.handlers;
    return (
      <Grid container>
        <Grid item md={9} style={{ height: '95.5vh' }}>
          <button onClick={onDownload}>Download</button>
          <WorkSpaceHeaderToolbar
            ref={c => {
              this.itemsRef = c;
            }}
            canvasRef={this.canvasRef}
            descriptors={descriptors}
            onSaveImage={onSaveImage}
            onDeleteText={onDeleteText}
            onChange={onChange}
            selectedItem={selectedItem}
            path={this.props.location.pathname}
          />
          <div
            ref={c => {
              this.container = c;
            }}
            style={{ height: '100%', position: 'relative', width: '100%' }}
          >
            <Canvas
              ref={c => {
                this.canvasRef = c;
              }}
              canvasOption={{
                width: canvasRect.width,
                height: canvasRect.height,
                backgroundColor: '#f3f3f3',
                selection: true,
              }}
              minZoom={30}
              defaultOptions={defaultOptions}
              propertiesToInclude={propertiesToInclude}
              onModified={onModified}
              onAdd={onAdd}
              onRemove={onRemove}
              onSelect={onSelect}
              onZoom={onZoom}
              onTooltip={onTooltip}
              onLink={onLink}
              onContext={onContext}
            />
            <WorkSpaceFooterToolbar
              canvasRef={this.canvasRef}
              preview={preview}
              onChangePreview={onChangePreview}
              zoomRatio={zoomRatio}
            />
            <WorkSpacePreview
              ref={c => {
                this.preview = c;
              }}
              preview={preview}
              onChangePreview={onChangePreview}
              onTooltip={onTooltip}
              onLink={onLink}
            />
          </div>
        </Grid>
        <Grid item md={3}>
          <WorkSpace
            canvasRef={this.canvasRef}
            onChange={onChange}
            selectedItem={selectedItem}
            projectId={projectId}
            saveProjectHandler={this.saveProjectHandler}
            isSaving={isSaving}
            project={project}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withContext(ProjectEditor);
