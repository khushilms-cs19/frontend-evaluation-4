import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest';
import { POST_COLLECTION } from '../../constants/apiEndPoints';

function SideModal({contentType, allColumns, setIsModalOpen}) {
  console.log(contentType);
  const inputsRef = useRef([]);
  const [error, setError] = useState(null);
  const addNewCollection = ()=>{
    const newCollection = [];
    inputsRef.current.forEach((input)=>{
      if(input.value!==''){
        newCollection.push({
          columnId: input.dataset.columnId,
          value: input.value,
        });
      }
    });
    makeRequest(POST_COLLECTION(contentType.contentTypeId),{
      data: {
        data: newCollection,
      }
    }).then((data)=>{
      console.log(data);
      setIsModalOpen(false);
      // setCollectionData((prev)=>({...prev,data: [...prev.data, data] }));
      // window.location.reload();
    }).catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
    });
    console.log(newCollection);
  };

  useEffect(()=>{
    inputsRef.current = inputsRef.current.slice(0,allColumns.length);
  },[allColumns]);
  
  return (
    <div className='absolute w-screen h-screen flex justify-end items-center bg-black/50'>
      <div className='w-1/3 h-screen p-20 bg-white'>
        <p className='w-full text-xl text-left mb-10'>New Company_profile</p>
        <div className='flex flex-col gap-5 py-4 max-h-[900px] overflow-auto'>
          {
            allColumns.length>0 ?
              allColumns.map((item,index)=>{
                return (
                  <div className='flex flex-col gap-2' key={index}>
                    <label className='text-gray-400 font-medium text-left'>{item.name}</label>
                    <input className='border-2 border-gray-300 p-2 rounded-md' data-column-id={item.columnId} ref={(element)=>{inputsRef.current[index] = element;}}></input>
                  </div>
                );
              }): <p className='text-gray-400'>No columns found</p>
          }
        </div>
        <div>
          <p className='text-red-400'>{error}</p>
          <button className='bg-blue-400 hover:bg-gray-400 p-2' onClick={()=>setIsModalOpen(false)}>cancel</button>
          <button className='bg-blue-400 hover:bg-gray-400 p-2' onClick={addNewCollection}>add</button>
        </div>
      </div>
    </div>
  );
}

SideModal.propTypes = {
  contentType: PropTypes.object.isRequired,
  allColumns: PropTypes.array.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default SideModal;