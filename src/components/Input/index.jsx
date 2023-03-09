import React from 'react';
import PropTypes from 'prop-types';

function Input({value, setValue, name, ...rest}) {
  return (
    <div className='flex flex-col gap-4 py-5 w-full'>
      <div className=' flex flex-col justify-center gap-3'>
        <label className='text-left w-full text-gray-500'>{name}</label>
        <input type='text' placeholder={name} value={value} onChange={(e)=>setValue(e.target.value)} className='py-2 px-2 rounded-md' {...rest} />
      </div>
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;