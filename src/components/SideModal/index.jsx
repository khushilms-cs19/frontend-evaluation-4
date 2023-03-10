import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest';
import { POST_COLLECTION, PUT_COLLECTION } from '../../constants/apiEndPoints';

const getCurrentCollectionColValue = (currentCollection, columnId) => {
  return currentCollection.data.find((data)=>data.columnId===columnId)?.value || '';
};

function SideModal({contentType, allColumns, setIsModalOpen, currentCollection}) {
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
  const editCollectionHandler = ()=>{
    const newCollection = [];
    inputsRef.current.forEach((input)=>{
      if(input.value!==''){
        newCollection.push({
          columnId: input.dataset.columnId,
          value: input.value,
        });
      }
    });
    makeRequest(PUT_COLLECTION(currentCollection.collectionId),{
      data: {
        contentTypeId: contentType.contentTypeId,
        data: newCollection,
      }
    }).then((data)=>{
      console.log(data);
      setIsModalOpen(false);
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
        <p className='w-full text-3xl text-left mb-10 font-bold'>{currentCollection?'Edit': 'New'} {contentType.contentTypeName}</p>
        <div className='flex flex-col gap-5 py-4 max-h-[42rem] overflow-auto'>
          {
            allColumns.length>0 ?
              allColumns.map((item,index)=>{
                return (
                  <div className='flex flex-col gap-2' key={index}>
                    <label className='text-gray-400 font-medium text-left'>{item.name}</label>
                    <input className='border border-[#643dff] p-2 rounded-md' data-column-id={item.columnId} ref={(element)=>{inputsRef.current[index] = element;}}
                      defaultValue={currentCollection?getCurrentCollectionColValue(currentCollection,item.columnId):''}
                    ></input>
                  </div>
                );
              }): <p className='text-gray-400'>No columns found</p>
          }
        </div>
        <div>
          <p className='text-red-400'>{error}</p>
          <div className='w-full flex gap-4 justify-end'> 
            <button className='hover:bg-gray-300 rounded-lg p-2 px-6' onClick={()=>setIsModalOpen(false)}>Cancel</button>
            <button className='bg-gradient-to-r from-[#946afe] to-[#643dff] py-2 px-10 rounded-lg text-white' onClick={()=>{
              if(currentCollection){
                editCollectionHandler();
              }else{
                addNewCollection();
              }
            }}>{currentCollection?'Edit':'Add'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

SideModal.propTypes = {
  contentType: PropTypes.object.isRequired,
  allColumns: PropTypes.array.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  currentCollection: PropTypes.object,

};

export default SideModal;