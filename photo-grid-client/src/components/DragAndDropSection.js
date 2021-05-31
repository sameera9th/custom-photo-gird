import React, { useContext } from "react";
import ImageContentLoader from "./ContentLoader";
import { DragAndDropClickContext } from "../context/DragAndDropClickContext";
import { DragAndDropItemContext } from "../context/DragAndDropItemContext";
import { DROP_SECTIONS, ERROR_MESSAGES } from "../utils/constants";
import { getImageURL } from "../utils/commonFunctions";

let sourceElement = null;

const DragAndDropSection = (props) => {


  const [dragDropData, setDragDropData] = useContext(
    DragAndDropItemContext
  );

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
    e.target.style.opacity = 0.5;
    sourceElement = e.target;
    e.dataTransfer.effectAllowed = "move";

    props.onDragStart(props.id);
  };

  const onDragEnd = (e) => {
    props.onDragEnd();
  };

  const onDrop = (e) => {
    props.onDrop(e);
  };

  const onDragOverItem = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDragEnterItem = (e) => {
    
    if (e.target.id) {
      setDragDropData({ dragTraget: e.target.id, section: props.id });
    }
    e.target.classList.add("over");
  };

  const onDragLeaveItem = (e) => {
    e.target.classList.remove("over");
  };

  const onDragEndItem = (e) => {
    e.target.style.opacity = 1;
  };

  const onDropItem = (e) => {
    if (sourceElement !== e.target && props.isDragSource(props.id)) {
      if (props.id === DROP_SECTIONS.SELECTED.ID) {
        props.reOrderImages({
          sourceElement: sourceElement.id,
          targetElement: e.target.id,
        });
      } else {
        props.generateError(ERROR_MESSAGES.ORDER_DEFAULT_PHOTOS);
      }
    }
    setDragDropData({dragTraget: null, section: null});
    e.target.classList.remove("over");
  };

  return (
    <div
      className={props.isDragTarget(props.id) ? "drag-enter" : "area "}
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
      {props.fetchingDefaultImages && <ImageContentLoader />}
      {props.elements.map((item, i) => (
        <DragAndDropElement
          key={item.id}
          item={item}
          index={i}
          onDragOverItem={onDragOverItem}
          onDragEnterItem={onDragEnterItem}
          onDragLeaveItem={onDragLeaveItem}
          onDragEndItem={onDragEndItem}
          onDropItem={onDropItem}
          section={props.id}
          dragDropData={dragDropData}
        />
      ))}
    </div>
  );
};

const DragAndDropElement = React.memo(
  ({
    item,
    index,
    onDragOverItem,
    onDragEnterItem,
    onDragLeaveItem,
    onDragEndItem,
    onDropItem,
    section,
    dragDropData
  }) => {
    const onDragStart = (e, item) => {
      e.dataTransfer.setData("text/plain", JSON.stringify({ ...item, index }));
      e.dropEffect = "move";
      setIsClickOnMovie(!isClickOnMovie);
    };

    const [isClickOnMovie, setIsClickOnMovie] = useContext(
      DragAndDropClickContext
    );

    return (
      <div
        className="box"
        draggable="true"
        onDragStart={(e) => onDragStart(e, item)}
        onDragOver={onDragOverItem}
        onDragEnter={onDragEnterItem}
        onDragLeave={onDragLeaveItem}
        onDrop={onDropItem}
        onDragEnd={onDragEndItem}
        id={index}
      >
        <div className="boxInner" id={index}>
          <img
            draggable="true"
            alt={item.id}
            src={getImageURL(item.id)}
            id={index}
            className={section === dragDropData.section && dragDropData.dragTraget === index.toString() ? "drag-over" : dragDropData.section ? "drag-over-other" : ""}
          />
        </div>
      </div>
    );
  }
);

export default DragAndDropSection;
