import React, {useEffect, useState} from 'react';
import SearchIcon from '../../assets/icon-search-dark_2023-03-09/icon-search-dark.png';
import { GET_CONTENT_TYPES } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import ContentTypeListItem from '../ContentTypeListItem';
// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Navigator() {
  const [contentTypes, setContentTypes] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    makeRequest(GET_CONTENT_TYPES,{}).then((data)=>{
      console.log(data);
      setContentTypes(data);
    }).catch((err)=>{
      console.log(err);
    });
  },[]);
  return (
    <div className='w-1/5 bg-[#272727] h-screen'>
      <p className='p-6 w-full text-left bg-[#5905ce] text-3xl font-extrabold text-white'>CMS+</p>
      <div className='p-5'>
        <div className='flex w-full justify-between p-4' >
          <p className='text-gray-500'>COLLECION TYPES</p>
          <img src={SearchIcon} alt=""/>
        </div>
        <div>
          {contentTypes?.map((contentType,index)=>{
            return (
              <ContentTypeListItem key={index} contentType={contentType} openTab={()=>navigate(`/content-types/${contentType.contentTypeId}`)}/>
            );
          })}
        </div>
      </div>
      <div>
        <p className='w-full bg-black p-2 text-white hover:cursor-pointer' onClick={()=>navigate('/content-types')}>CONTENT TYPE BUILDER</p>
      </div>
    </div>
  );
}

// Navigator.propTypes = {
//   setOpenedTab: PropTypes.func.isRequired,
// };

export default Navigator;