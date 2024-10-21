import React from 'react';
import './Modal.css'; // Import CSS for styling

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null; // Do not render the modal if not open

  return (
    <div className="modal-container">
      <div className="modal-con">
        <h2>Xác nhận</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="button-confirm">Xác nhận</button>
          <button onClick={onClose} className="button-cancel">Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
