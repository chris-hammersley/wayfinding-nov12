import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay">
      <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
      <span aria-hidden="true">&times;</span>
      </button>
      <h1>
      Prompt 1
      </h1>
      <p>This modal can contain video, images, text and audio that show the audience the process.</p>
      <div><iframe width="560" height="315" src="https://www.youtube.com/embed/HWvOUw0Vtog?si=43kXZ-2iV8D-yUx6"></iframe></div>
      </div>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
        <h1>
          Prompt 1
        </h1>
        <p>This modal can contain video, images, text and audio that show the audience the process.</p>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;