import React, { useContext } from "react";
import { Form } from "../form";
import { useSelector, useDispatch } from "react-redux";
import { DragAndDropClickContext } from "../../context/DragAndDropClickContext";

export const Modal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  submit,
}) => {
  const { fetching, error } = useSelector((state) => state.user);

  const [isClickOnMovie, setIsClickOnMovie, user] = useContext(
    DragAndDropClickContext
  );
  
  if (isClickOnMovie && !user.email) {
    return (
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        onClick={onClickOutside}
        onKeyDown={onKeyDown}
      >
        <div className="modal-area" ref={modalRef}>
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={() => setIsClickOnMovie(!isClickOnMovie)}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">
            <Form submit={submit} fetching={fetching} error={error} />
          </div>
        </div>
      </aside>
    );
  } else {
    return null;
  }
};

export default Modal;
