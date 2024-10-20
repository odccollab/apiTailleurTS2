import React from 'react';

const SimplePopup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
        <p className="text-center mb-4">{message}</p>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SimplePopup;