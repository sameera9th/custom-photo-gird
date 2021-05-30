import React, { useContext } from "react";
import { Form } from "../form";
import { useSelector } from "react-redux";
import { DragAndDropClickContext } from "../../context/DragAndDropClickContext";
import ModalBody from '../common/ModalBody';

export const Modal = ({
  submit,
}) => {
  const { fetching, error } = useSelector((state) => state.user);

  const [isClickOnMovie, setIsClickOnMovie, user] = useContext(
    DragAndDropClickContext
  );

  return(
    <ModalBody isShow={isClickOnMovie && !user.email} closeModal={() => setIsClickOnMovie(!isClickOnMovie)}>
      <Form submit={submit} fetching={fetching} error={error} />
    </ModalBody>
  )
};

export default Modal;
