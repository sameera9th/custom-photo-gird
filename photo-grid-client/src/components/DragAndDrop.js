import React from "react";
import DragAndDropSection from "./DragAndDropSection";
import "./drag.css";
import { selectImages, reOrder } from "../redux/actions/image";
import { DROP_SECTIONS } from "../utils/constants";

class DragAndDrop extends React.PureComponent {
  initialState = {
    dragSource: null,
    dragTarget: null,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onDrop = this.onDrop.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragExit = this.onDragExit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.isDragSource = this.isDragSource.bind(this);
    this.isValidDragTarget = this.isValidDragTarget.bind(this);
    this.isDragTarget = this.isDragTarget.bind(this);
    this.moveElement = this.moveElement.bind(this);
    this.reOrderImages = this.reOrderImages.bind(this);
  }

  onDrop(e) {
    if (this.state.dragTarget && this.isValidDragTarget(this.state.dragTarget)) {
      e.preventDefault();
      const item = e.dataTransfer.getData("text/plain");
      this.moveElement(JSON.parse(item));
    }
  }

  moveElement(item) {
    const { dragTarget, dragSource } = this.state;
    
    this.props.dispatch(
      selectImages({
        dragTarget,
        dragSource,
        item,
        currentSelected: this.props.selectedImages,
      })
    );

    this.setState({
      dragSource: null,
      dragTarget: null,
    });
  }

  onDragStart(source) {
    this.setState({ dragSource: source });
  }

  onDragEnter(e, id) {
    if (this.isValidDragTarget(id)) {
      this.setState({ dragTarget: id });
    }
  }

  onDragOver(e, id) {
    if (this.isDragTarget(id)) {
      e.preventDefault(); // activate drop zone
    }
  }

  onDragLeave(e, id) {
    if (id === this.state.dragTarget) {
      this.setState({ dragTarget: null });
    }
  }

  onDragExit() {}

  onDragEnd() {
    this.setState({ dragSource: null, dragTarget: null });
  }

  isValidDragTarget(id) {
    return id !== this.state.dragSource;
  }

  isDragTarget(id) {
    return id === this.state.dragTarget && this.state.dragTarget !== null;
  }

  isDragSource(id) {
    return id === this.state.dragSource;
  }

  reOrderImages(data) {
    this.props.dispatch(reOrder(data));
  }

  render() {
    const { fetchingDefaultImages, selectedImages } = this.props;

    return (
      <React.Fragment>
        <DragAndDropSection
          elements={this.props.allImages}
          fetchingDefaultImages={fetchingDefaultImages}
          id={DROP_SECTIONS.DEFAULT.ID}
          label={DROP_SECTIONS.DEFAULT.TITLE}
          onDrop={this.onDrop}
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDragExit={this.onDragExit}
          onDragEnd={this.onDragEnd}
          isDragTarget={this.isDragTarget}
          isDragSource={this.isDragSource}
        />
        <DragAndDropSection
          elements={selectedImages}
          id={DROP_SECTIONS.SELECTED.ID}
          label={DROP_SECTIONS.SELECTED.TITLE}
          onDrop={this.onDrop}
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDragExit={this.onDragExit}
          onDragEnd={this.onDragEnd}
          isDragTarget={this.isDragTarget}
          isDragSource={this.isDragSource}
          reOrderImages={this.reOrderImages}
        />
      </React.Fragment>
    );
  }
}

export default DragAndDrop;
