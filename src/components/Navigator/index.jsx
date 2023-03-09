import React from 'react';
import SearchIcon from '../../assets/icon-search-dark_2023-03-09/icon-search-dark.png';

function Navigator() {
  return (
    <div className='flex'>
      <div className='w-1/5 bg-[#272727] h-screen'>
        <p className='p-6 w-full text-left bg-[#5905ce] text-3xl font-extrabold text-white'>CMS+</p>
        <div className='flex w-full justify-between p-4'>
          <p>COLLECION TYPES</p>
          <img src={SearchIcon} alt=""/>
        </div>
      </div>
      <div className='w-4/5'>
        <p>nice</p>
      </div>
    </div>
  );
}

export default Navigator;