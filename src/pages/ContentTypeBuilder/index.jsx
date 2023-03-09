import React, { useState} from 'react';
import SearchIcon from '../../assets/icon-search-dark_2023-03-09/icon-search-dark.png';
import { FieldItem, SmallModal } from '../../components';
import Navigator from '../../components/Navigator';
// import { ContentTypeProvider } from '../../contexts/ContentTypeContext';
// import { ContentTypeContext } from '../../contexts/ContentTypeContext';

function ContentTypeBuilder() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='flex w-full'>
      {
        openModal &&
          <SmallModal exitModal={()=>setOpenModal(false)}/>
      }
      <Navigator/>
      <div className='w-4/5 flex flex-col bg-[#eaedfe]'>
        <p className='w-full text-left text-2xl font-bold p-6 bg-white'>Content Types</p>
        <div className='flex w-full h-full'>
          <div className='w-1/4 bg-gray-300 p-10 h-full'>
            <div className='flex justify-between py-4'>
              <p className='text-gray-500'>7 Types</p>
              <img src={SearchIcon}></img>
            </div>
            <div className='flex flex-col gap-4'>
              <button className='bg-[#eaedfe] border-2 rounded-xl border-dotted p-4 w-full border-[#5905ce] text-[#5905ce] font-bold' onClick={()=>setOpenModal(true)}>+ New Type</button>
              <button className='bg-[#5905ce] border-2 rounded-xl border-[#5905ce] w-full p-4 text-white'>Company_Profile</button>
              <button className='bg-white border-2 rounded-xl  p-4 w-full font-bold border-white text-gray-400'>Type</button>
            </div>
          </div>
          <div className='w-3/4 flex flex-col p-10 gap-2'>
            <p className='text-3xl font-bold text-left'>Company_Profile</p>
            <p className='text-3xl text-left mb-4 text-gray-600'>13 Fields</p>
            <div>
              <button className='bg-white text-[#5905ce] border-2 border-dotted p-5 w-full border-[#5905ce] rounded-lg text-lg mb-4'>Add Another field</button>
              <div className='flex flex-col gap-4'>
                <FieldItem/>
                <FieldItem/>
                <FieldItem/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentTypeBuilder;
