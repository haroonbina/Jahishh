import React from 'react';

const DeleteConfirm = ({handleDeleteRoom, closeModal}) =>{
    return (
        <div>
            <div className="delete-modal-buffer" onClick={closeModal}></div>
            <div className="delete-confirmation-modal">
                <div className="delete-confirmation-modal-header">
                    Confirm Delete
                </div>
                <div className="delete-confirmation-modal-body">
                    Are you sure you want to delete the room?
                </div>
                <div className="delete-confirmation-modal-footer">
                    <button className="btn btn-primary" onClick={closeModal}>No</button>
                    <button className="btn btn-danger" onClick={handleDeleteRoom}>Yes</button>
                </div>
                
            </div>        
        </div>
    )
}

export default DeleteConfirm;