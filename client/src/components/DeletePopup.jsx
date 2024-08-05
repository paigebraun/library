import React from "react";
import ReactDOM from "react-dom";
import { FaCheck, FaX } from "react-icons/fa6";

function DeletePopup({ onConfirm, onCancel }) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h1 className="font-bold text-lg">Delete Book</h1>
                <p className="mb-4 text-lg">
                    Are you sure you want to delete this book?
                </p>
                <div className="flex justify-center gap-6 mt-4">
                    <button
                        data-testid="confirm-button"
                        className="flex items-center justify-center px-2 py-2 bg-green-400 text-green-800 rounded-full shadow-md hover:scale-110"
                        onClick={onConfirm}>
                        <FaCheck size={20} />
                    </button>
                    <button
                        data-testid="cancel-button"
                        className="flex items-center justify-center px-2 py-2 bg-red-400 text-red-800 rounded-full shadow-md hover:scale-110"
                        onClick={onCancel}>
                        <FaX size={20} />
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default DeletePopup;
