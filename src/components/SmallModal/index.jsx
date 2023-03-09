import React from 'react';
import PropTypes from 'prop-types';

function SmallModal({exitModal}) {
  return (
    <div className='absolute w-screen h-screen flex justify-center items-center bg-black/50 top-0 left-0'>
      
      <div className='w-2/6 bg-white rounded-xl shadow-lg p-10 flex flex-col gap-10'>
        <p className='text-left font-bold text-lg'>Create a new content type</p>
        <div>
          <p className='text-left mb-2'>Name of the content type</p>
          <input className='px-2 py-2 rounded-md text-left bg-gray-200 w-full' placeholder='Content type name'></input>
        </div>
        <div className='w-full flex justify-end gap-4'>
          <button className='bg-blue-400 p-4 rounded-sm hover:bg-slate-400' onClick={exitModal}>Cancel</button>
          <button className='bg-blue-400 p-4 rounded-sm hover:bg-slate-400' onClick={exitModal}>Create</button>
        </div>
      </div>
    </div>
  );
}

SmallModal.propTypes = {
  exitModal: PropTypes.func.isRequired,
};

export default SmallModal;