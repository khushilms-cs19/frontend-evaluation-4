import React, {useEffect, useState} from 'react';
import Navigator from '../../components/Navigator';
// import ContentTypeBuilder from '../ContentTypeBuilder';
// import { ContentTypeProvider, ContentTypeContext } from '../../contexts/ContentTypeContext';
import makeRequest from '../../utils/makeRequest';
import { GET_COLLECTIONS } from '../../constants/apiEndPoints';
import { useParams } from 'react-router-dom';
import SideModal from '../../components/SideModal';
import CollectionItem from '../../components/CollectionItem';


function ContentTypes() {
  const {id} = useParams();
  console.log(id);
  const [collectionData, setCollectionData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCollection, setCurrentCollection] = useState(null);
  useEffect(()=>{
    makeRequest(GET_COLLECTIONS(id),{}).then((data)=>{
      console.log(data);
      setCollectionData(data);
    }).catch((err)=>{
      console.log(err);
    });
  },[id, isModalOpen]);

  return ( collectionData ?
    <div className='flex relative'>
      {
        isModalOpen &&
      <SideModal contentType={collectionData.contentType} allColumns={collectionData.allColumns} setIsModalOpen={setIsModalOpen} currentCollection={currentCollection}/>
      }
      <Navigator/>
      <div className='w-4/5 flex flex-col bg-[#eaedfe]'>
        <p className='w-full text-left text-2xl font-bold p-6 bg-white '>{collectionData.contentType.contentTypeName}</p>
        <div className='p-10'>
          <div className='flex justify-between mb-4'>
            <p className='text-2xl'>{collectionData?.data?.length} Entries Found</p>
            <button onClick={()=>setIsModalOpen(true)} className='text-xl text-[#643dff]' >Add a new entry</button>
          </div>
          
            
          <div className="w-full">
            <table className='w-full text-left'>
              <thead>
                <tr>
                  {
                    collectionData.allColumns.slice(0,4).map((item,index)=>{
                      return (
                        <th className='text-gray-400 font-medium p-4' key={index}>{item.name}</th>
                      );
                    })
                  }
                  {
                    collectionData.allColumns.length>0 ?
                      <th className='text-gray-400 font-medium p-4'>
                    Actions
                      </th>:
                      <th className='text-gray-400 font-medium p-4'>
                    No columns found
                      </th>
                  }
                </tr>
              </thead>
              { 
                collectionData.data.length>0 &&
                  <tbody>
                    {
                      collectionData.data.map((item,index)=>{
                        return (
                          <CollectionItem collectionData={collectionData} item={item} key={index} setCollectionData={setCollectionData} openEditModal={(item)=>{
                            setCurrentCollection(item);
                            setIsModalOpen(true);
                          }}/>
                        );
                      })
                    }
                  </tbody>
              }
            </table>
            {
              (collectionData.allColumns.length === 0 || collectionData.data.length===0) &&
            <p className='text-xs text-center text-gray-400 bg-white p-2 rounded-md'>No entries for this content type</p>
            }
          </div>
        </div>
      </div>
    </div>:
    <div>Loading...</div>
  );
}
  
export default ContentTypes;
