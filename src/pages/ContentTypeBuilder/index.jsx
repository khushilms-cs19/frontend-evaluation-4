import React, { useState} from 'react';
import SearchIcon from '../../assets/icon-search-dark_2023-03-09/icon-search-dark.png';
import { SmallModal } from '../../components';
import ContentTypeEntries from '../../components/ContentTypeEntries';
import Navigator from '../../components/Navigator';
import {  POST_CONTENT_TYPE } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';

function ContentTypeBuilder() {
  const [openModal, setOpenModal] = useState(false);
  const [contentTypes, setContentTypes] = useState([]);
  const [contentTypeError, setContentTypeError] = useState('');
  const [selectedContentType, setSelectedContentType] = useState(0);
  const createContentTypeHandler = (contentTypeName)=>{
    makeRequest(POST_CONTENT_TYPE,{
      data:{
        userId: '1c7a8885-0ea1-4e2e-b087-5d346fbf2d81',
        contentTypeName: contentTypeName,
      }
    }).then((data)=>{
      console.log(data);
      setOpenModal(false);
      setContentTypes((prev)=>{
        return [...prev, data];
      });
    }).catch((err)=>{
      console.log(err);
      setContentTypeError(err.response.data.message);
    });
  };
  // const createColumnHandler = (column, contentTypeId)=>{
  //   makeRequest(POST_COLUMN,{
  //     data:{
  //       name: column,
  //       contentTypeId: contentTypeId,
  //     }
  //   }).then((data)=>{
  //     console.log(data);
  //     setOpenColumnModal(false);
  //   }).catch((err)=>{
  //     console.log(err);
  //     setColumnError(err.response.data.message);
  //   });
  // };

  return (
    <div className='flex w-full'>
      {
        openModal &&
          <SmallModal exitModal={()=>setOpenModal(false)} createHandler={createContentTypeHandler} title={'Create a new content type'}
            error={contentTypeError}
          />
      }
      
      <Navigator setContentTypes={setContentTypes}/>
      <div className='w-4/5 flex flex-col bg-[#eaedfe]'>
        <p className='w-full text-left text-2xl font-bold p-6 bg-white'>Content Types</p>
        <div className='flex w-full h-full'>
          <div className='w-1/4 bg-gray-300 p-10 h-full'>
            <div className='flex justify-between py-4'>
              <p className='text-gray-500'>{contentTypes.length} Types</p>
              <img src={SearchIcon}></img>
            </div>
            <div className='flex flex-col gap-4'>
              <button className='bg-[#eaedfe] border-2 rounded-xl border-dotted p-4 w-full border-[#5905ce] text-[#5905ce] font-bold' onClick={()=>setOpenModal(true)}>+ New Type</button>
              {
                contentTypes?.map((contentType,index)=>{
                  return (
                    <button key={index} className={`bg-[#5905ce] border-2 rounded-xl border-[#5905ce] w-full p-4  ${selectedContentType===index?'text-white bg-[#5905ce]':'bg-white'}`} onClick={()=>setSelectedContentType(index)}>{contentType.contentTypeName}</button>
                  );
                })
              }
            </div>
          </div>
          {
            contentTypes.length>0 &&
              <ContentTypeEntries contentType={contentTypes[selectedContentType]} />
          }
        </div>
      </div>
    </div>
  );
}

export default ContentTypeBuilder;
