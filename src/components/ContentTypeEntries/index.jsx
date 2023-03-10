import React, { useEffect, useState } from 'react';
import { GET_ALL_COLUMNS } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import FieldItem from '../FieldItem';
import PropTypes from 'prop-types';
import { POST_COLUMN } from '../../constants/apiEndPoints';
import SmallModal from '../SmallModal';

function ContentTypeEntries({contentType}) {
  const [columns, setColumns] = useState([]);
  const [openColumnModal, setOpenColumnModal] = useState(false);
  const [columnError, setColumnError] = useState(null);
  const createColumnHandler = (column, contentTypeId )=>{
    makeRequest(POST_COLUMN,{
      data:{
        name: column,
        contentTypeId: contentTypeId,
      }
    }).then((data)=>{
      console.log(data);
      setOpenColumnModal(false);
    }).catch((err)=>{
      console.log(err);
      setColumnError(err.response.data.message);
    });
  };
  useEffect(() => {
    setColumnError(null);
    makeRequest(GET_ALL_COLUMNS(contentType.contentTypeId), {}).then((data) => {
      console.log(data);
      setColumns(data);
    }).catch((err) => {
      console.log(err);
    });
  }, [contentType.contentTypeId]);

  return (
    <div className='w-3/4 flex flex-col p-10 gap-2'>
      {
        openColumnModal &&
          <SmallModal exitModal={()=>setOpenColumnModal(false)} createHandler={createColumnHandler} title={'Creat a new column in content type'} contentTypeId={contentType.contentTypeId} error={columnError}/>
      }
      <p className='text-3xl font-bold text-left'>{contentType.contentTypeName}</p>
      <p className='text-3xl text-left mb-4 text-gray-600'>{columns?.length} Field(s)</p>
      <div>
        <button className='bg-white text-[#5905ce] border-2 border-dotted p-5 w-full border-[#5905ce] rounded-lg text-lg mb-4' onClick={()=>setOpenColumnModal(true)}>Add Another field</button>
        <div className='flex flex-col gap-4'>
          {
            columns && columns.map((column, index) => {
              return (
                <FieldItem column={column} key={index} />
              );
            })
          }
        </div>
      </div>
    </div>  );
}

ContentTypeEntries.propTypes = {
  contentType: PropTypes.object,
};

export default ContentTypeEntries;