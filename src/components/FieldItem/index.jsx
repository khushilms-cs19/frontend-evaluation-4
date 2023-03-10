import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrashIcon from '../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png';
import EditIcon from '../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png';
import makeRequest from '../../utils/makeRequest';
import { DELETE_COLUMN, PUT_COLUMN } from '../../constants/apiEndPoints';
import SmallModal from '../SmallModal';

function FieldItem({column, setColumns}) {
  const [deleteColumnError, setDeleteColumnError] = useState(null);
  const [editColumnError , setEditColumnError] = useState(null);
  const [openEditColumnModal, setOpenEditColumnModal] = useState(false);
  const deleteColumn = ()=>{
    makeRequest(DELETE_COLUMN(column.columnId),{}).then((data)=>{
      console.log(data);
      setColumns((prev)=>{
        return prev.filter((item)=>{
          return item.columnId !== column.columnId;
        });
      });
    }).catch((err)=>{
      setDeleteColumnError(err.response.data.message);
      console.log(err);
    });
  };
  const editColumnHandler = (columnName)=>{
    makeRequest(PUT_COLUMN(column.columnId),{
      data:{
        name: columnName,
      }
    }).then((data)=>{
      console.log(data);
      setOpenEditColumnModal(false);
      setColumns((prev)=>{
        const editColumns = prev.map((item)=>{
          if(item.columnId === column.columnId){
            return data.column;
          }
          return item;
        });
        return editColumns;
      });
    }).catch((err)=>{
      console.log(err);
      setEditColumnError(err.response.data.message);
    });
  };
  useEffect(()=>{
    setDeleteColumnError(null);
  }, []);
  return (
    <div className='flex flex-col gap-2'>
      {
        openEditColumnModal && (
          <SmallModal exitModal={()=>setOpenEditColumnModal(false)} createHandler={editColumnHandler} title={'Edit column name'} error={editColumnError}/>)
      }
      <div className='flex justify-between p-5 rounded-lg bg-white w-full items-center'>
        <p className='w-full text-left pl-10 font-semibold'>{column.name}</p>
        <p className='w-full text-left pl-10 text-gray-400'>Text</p>
        <p className='w-full flex justify-end gap-4 pr-10'>
          <button onClick={()=>setOpenEditColumnModal(true)}>
            <img src={EditIcon}></img>
          </button>
          <button onClick={deleteColumn}>
            <img src={TrashIcon}></img>
          </button>
        </p>
      </div>
      {deleteColumnError && <p className='text-red-500'>{deleteColumnError}</p>}
    </div>
  );
}

FieldItem.propTypes = {
  column: PropTypes.object,
  setColumns: PropTypes.func,
};

export default FieldItem;