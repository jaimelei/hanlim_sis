import React, { useState } from 'react';
import ActionModal from '../components/action-modal';
import '../index.css';

const Homepage = () => {
  const [modalType, setModalType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
    
  return (
    <div className="flex flex-col h-screen bg-[#ddd7c5]">

      {/* Top row for the header */}
      <div className="homepage-header">
        <h1 className="font-kalayaan text-5xl header-title">Hanlim University</h1>
        <h2 className='font-luckybones text-5xl mt-3'>Student Information System</h2>
      </div>

      {/* Bottom row for the content */}
      <div className="w-full h-full flex flex-row justify-center">

        {/* Left panel for main functions */}
        <div className='w-[75%] flex flex-col items-center'>

          {/* Buttons group */}
          <div className='flex flex-row justify-center items-center font-luckybones text-2xl'>
            {['add', 'edit', 'delete', 'search'].map((type) => (
              <button
                key={type}
                onClick={() => openModal(type)}
                className='transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-[#B5A983] w-[250px] h-[50px] m-10 rounded-lg border-2 border-black capitalize'
              >
                {type} Student
              </button>
            ))}
          </div>

          <ActionModal isOpen={isModalOpen} onClose={closeModal} type={modalType} />

          {/* Table for displaying student data */}
          <div className='flex flex-col justify-center items-center bg-[#c7b784] w-[80%] h-[80%] rounded-3xl'>
            placeholder
          </div>
        </div>

        {/* Right panel for statistics */}  
        <div className='bg-[#B5A983] w-[25%] h-full border-l-4 border-l-black flex flex-col justify-center items-center'>
          placeholder
        </div>
      </div>
    </div>
  );
};

export default Homepage;