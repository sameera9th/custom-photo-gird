import React, { useContext } from "react";
import ImageContentLoader from './ContentLoader';
import { DragAndDropClickContext } from '../context/DragAndDropClickContext';

const DragAndDropSection = React.memo((props) => {
  const onDragOver = (e) => {
    props.onDragOver(e, props.id);
  };

  const onDragEnter = (e) => {
    props.onDragEnter(e, props.id);
  };

  const onDragLeave = (e) => {
    if (e.target.id === props.id) {
      props.onDragLeave(e, props.id);
    }
  };

  // const onDragExit = (e) => {};

  const onDragStart = (e) => {
    props.onDragStart(props.id);
  };

  const onDragEnd = (e) => {
    props.onDragEnd();
  };

  const onDrop = (e) => {
    props.onDrop(e);
  };
  
  return (
    <div
      className={props.isDragTarget(props.id) ?  "drag-enter" : "area "}
      id={props.id}
      key={props.id}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={(e) => onDragLeave(e)}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="area__label">{props.label}</div>
      {props.fetchingDefaultImages && <ImageContentLoader/>}
      {props.elements.map((item) => (
        <DragAndDropElement key={item.id} item={item} />
      ))}
    </div>
  );
});

const DragAndDropElement = React.memo(({ item }) => {
  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    e.dropEffect = "move";
    setIsClickOnMovie(!isClickOnMovie)
  };

  const [isClickOnMovie, setIsClickOnMovie] = useContext(DragAndDropClickContext);

  return (
    <div
      className="box"
      draggable="true"
      onDragStart={(e) => onDragStart(e, item)}
    >
      <div className="boxInner">
        <img alt="butterfly" src={'http://localhost:3001/'+item.id+'.jpeg'} />
      </div>
    </div>
  );
});

export default DragAndDropSection;
