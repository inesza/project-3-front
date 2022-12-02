import React from "react";
import "../styles/Modal.css";

const ModalConfirmDelete = ({ isShowing, hide, handleDelete, modalTitle }) => {
  if (isShowing) {
    return (
      <div>
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <div className="modal">
              <div className="modal-header">
                <h3>{modalTitle}</h3>
              </div>
              <div className="modal-body">This action is irreversible</div>
              <div className="modal-buttons">
                <button
                  className="btn btn-grey-shadow-light-grey"
                  onClick={hide}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-orange-shadow-mint"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalConfirmDelete;
