import React from "react";
import ModalBody from "../common/ModalBody";

export const PopAlert = ({ error, acknowledge }) => {
  return (
    <ModalBody isShow={error} closeModal={acknowledge}>
      <h3 className="text-danger text-center">Woops!</h3>
      <div className="alert" role="alert">
        <p className="text-danger text-center">{error}</p>
      </div>
      <button className="form-control btn btn-dark" onClick={acknowledge}>
        OK
      </button>
    </ModalBody>
  );
};

export default PopAlert;
