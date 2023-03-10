import React, {useEffect, useState} from 'react';
import TrashIcon from '../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png';
import EditIcon from '../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png';
import checkColumnUsed from '../../utils/checkColumnUsed';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest';
import { DELETE_COLLECTION } from '../../constants/apiEndPoints';

function CollectionItem({item, collectionData, setCollectionData, openEditModal}) {
  const [deleteCollectionError, setDeleteCollectionError] = useState(null);
  // const [editCollectionError, setEditCollectionError] = useState(null);

  const deleteCollectionHandler = ()=>{
    makeRequest(DELETE_COLLECTION(item.collectionId),{}).then((data)=>{
      console.log(data);
      setCollectionData((prev)=>{
        const newCollectionData = prev.data.filter((collection)=>{
          return collection.collectionId !== item.collectionId;
        });
        return {
          ...prev,
          data: newCollectionData,
        };
      });
    }).catch((err)=>{
      setDeleteCollectionError(err.response.data.message);
      console.log(err);
    });
  }; 
  useEffect(()=>{
    setDeleteCollectionError(null);
  },[]);
  return (
    <>
      <tr className='bg-white'>
        {
          collectionData.allColumns.slice(0,4).map((column,idx)=>{
            if(checkColumnUsed(column.name, item.data)){
              return (
                <td className='p-4' key={idx}>{item.data.find((rowItem)=> rowItem.name === column.name).value}</td>
              );
            }else{
              return (
                <td className='p-4' key={idx}>-</td>
              );
            }
          })
        }
        <td className='p-4'>
          <div className='flex gap-4 items-center'>
            <button onClick={deleteCollectionHandler}>
              <img src={TrashIcon}></img>
            </button>
            <button onClick={()=>{openEditModal(item);}}>
              <img src={EditIcon}></img>
            </button>
          </div>
        </td>
      </tr>
      {
        deleteCollectionError && (
          <tr>
            <td colSpan={collectionData.allColumns.length+1} className="text-center text-red-400">{deleteCollectionError}</td>
          </tr>
        )
      }
    </>
  );
}

CollectionItem.propTypes={
  item: PropTypes.object,
  collectionData: PropTypes.object,
  setCollectionData: PropTypes.func,
  openEditModal: PropTypes.func,
};

export default CollectionItem;