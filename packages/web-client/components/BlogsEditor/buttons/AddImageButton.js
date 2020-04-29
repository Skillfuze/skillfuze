/* eslint-disable */
import React, { Component } from 'react';
import { Input, Button } from '@skillfuze/ui-components';

import styles from './AddImageButton.module.css';
import ImageIcon from '../../../assets/icons/camera.svg';
import VideoIcon from '../../../assets/icons/film.svg';

export default class ImageAdd extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      open: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  onPopoverClick = () => {
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    this.preventNextClose = false;
  };

  addImage = () => {
    const { editorState, onChange } = this.props;
    if (this.props ==='image') {
      onChange(this.props.modifier(editorState, this.state.url));
    } else {
      onChange(this.props.modifier(editorState, { src: this.state.url }));
    }
    this.setState({ url: '' });
  };

  changeUrl = value => {
    this.setState({ url: value });
  };

  render() {
    const popoverClassName = this.state.open ? styles.addImagePopover : styles.addImageClosedPopover;
    const Icon = this.props.type === 'image' ? ImageIcon : VideoIcon;
    const label = this.props.type === 'image' ? 'Paste image url...' : 'Paste video url...';

    return (
      <div className="ml-2">
        <Button onClick={this.openPopover} variant="outlined" color="black" type="button">
          <Icon style={{ height: 20, width: 20 }} />
        </Button>
        <div className={popoverClassName} onClick={this.onPopoverClick}>
          <Input
            type="text"
            placeholder={label}
            onChange={this.changeUrl}
            value={this.state.url}
            className="mr-1"
          />
          <Button variant="outlined"  color="black" onClick={this.addImage}>
            Add
          </Button>
        </div>
      </div>
    );
  }
}
