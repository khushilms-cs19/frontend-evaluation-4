import React, {useEffect, useState} from 'react';
import Navigator from '../../components/Navigator';
import TrashIcon from '../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png';
import EditIcon from '../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png';
// import ContentTypeBuilder from '../ContentTypeBuilder';
// import { ContentTypeProvider, ContentTypeContext } from '../../contexts/ContentTypeContext';
import makeRequest from '../../utils/makeRequest';
import { GET_COLLECTIONS } from '../../constants/apiEndPoints';
import { useParams } from 'react-router-dom';

const checkColumnUsed = (column, data)=>{
  const isUsed = data.some((item)=>{
    return item.name === column;
  });
  console.log(isUsed);
  return isUsed;
};

function ContentTypes() {
  const {id} = useParams();
  console.log(id);
  const [collectionData, setCollectionDatas] = useState(null);

  useEffect(()=>{
    makeRequest(GET_COLLECTIONS(id),{}).then((data)=>{
      console.log(data);
      setCollectionDatas(data);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);

  return ( collectionData ?
    <div className='flex relative'>
      <Navigator/>
      <div className='w-4/5 flex flex-col bg-[#eaedfe]'>
        <p className='w-full text-left text-2xl font-bold p-6 bg-white '>Content Types</p>
        <div className='p-10'>
          <div className='flex justify-between mb-4'>
            <p className='text-2xl'>13 Entries Found</p>
            <button>Add a new entry</button>
          </div>
          {
            collectionData &&
          
          <div className="w-full">
            <table className='w-full text-left'>
              <thead>
                <tr>
                  {
                    collectionData.allColumns.map((item,index)=>{
                      return (
                        <th className='text-gray-400 font-medium p-4' key={index}>{item.name}</th>
                      );
                    })
                  }
                  <th className='text-gray-400 font-medium p-4'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  collectionData.data.map((item,index)=>{
                    return (
                      <tr className='bg-white' key={index}>
                        {
                          collectionData.allColumns.map((column,idx)=>{
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
                            <img src={TrashIcon}></img>
                            <img src={EditIcon}></img>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
                {/* <tr className='bg-white'>
                  <td className='p-4'>Entry 1</td>
                  <td className='p-4'>Entry Type 1</td>
                  <td className='p-4'>Entry ID 1</td>
                  <td className='p-4'>
                    <div className='flex gap-4 items-center'>
                      <img src={TrashIcon}></img>
                      <img src={EditIcon}></img>
                    </div>
                  </td>
                </tr>
                <tr className='bg-white'>
                  <td className='p-4'>Entry 1</td>
                  <td className='p-4'>Entry Type 1</td>
                  <td className='p-4'>Entry ID 1</td>
                  <td className='p-4'>
                    <div className='flex gap-4 items-center'>
                      <img src={TrashIcon}></img>
                      <img src={EditIcon}></img>
                    </div>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          }
        </div>
      </div>
    </div>:
    <div>Loading...</div>
  );
}
  
export default ContentTypes;
