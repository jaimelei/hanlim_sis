import React from 'react';

const ActionModal = ({ isOpen, onClose, type }) => {
  const renderContent = () => {
    switch (type) {
      case 'add':   
        return <p>Add Student Form Goes Here</p>;
      case 'edit':
        return <p>Edit Student Form Goes Here</p>;
      case 'delete':
        return <p>Delete Student Confirmation</p>;
      case 'search':
        return <p>Search Student Form</p>;
      default:
        return <p>Unknown Action</p>;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl p-8 w-[400px] transform transition-transform duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{type.toUpperCase()} STUDENT</h2>
          <button onClick={onClose} className="text-black font-bold text-lg">X</button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ActionModal;
