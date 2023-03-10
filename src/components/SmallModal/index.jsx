import React, {useRef} from 'react';
import PropTypes from 'prop-types';
// import makeRequest from '../../utils/makeRequest';
// import { POST_CONTENT_TYPE } from '../../constants/apiEndPoints';

function SmallModal({createHandler, title, exitModal, contentTypeId, error}) {
  console.log(contentTypeId);
  const contentTypeRef = useRef(null);
  // const handleCreateContentType = async () => {
  //   console.log(contentTypeRef.current.value);
  //   makeRequest(POST_CONTENT_TYPE,{
  //     data:{
  //       userId: '1c7a8885-0ea1-4e2e-b087-5d346fbf2d81',
  //       contentTypeName: contentTypeRef.current.value,
  //     }
  //   }).then((data)=>{
  //     console.log(data);
  //     exitModal();
  //     setContentTypes((prev)=>{
  //       return [...prev, data];
  //     });
  //   }).catch((err)=>{
  //     console.log(err);
  //   });
  // };
  return (
    <div className='absolute w-screen h-screen flex justify-center items-center bg-black/50 top-0 left-0'>
      
      <div className='w-2/6 bg-white rounded-xl shadow-lg p-10 flex flex-col gap-10'>
        <p className='text-left font-bold text-lg'>{title}</p>
        <div>
          <p className='text-left mb-2'>Enter a value</p>
          <input className='px-2 py-2 rounded-md text-left w-full border-[#643dff] border' placeholder='Value' ref={contentTypeRef}></input>
        </div>
        <div className='w-full flex justify-end gap-4'>
          <button className='p-2 rounded-sm text-[#643dff]' onClick={exitModal}>Cancel</button>
          <button className='bg-gradient-to-r from-[#946afe] to-[#643dff] py-2 px-10 rounded-lg text-white hover:bg-slate-400' onClick={()=>createHandler(contentTypeRef.current.value,contentTypeId||null)}>Create</button>
        </div>
        <p className='text-red-400'>{error}</p>
      </div>
    </div>
  );
}

SmallModal.propTypes = {
  exitModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createHandler: PropTypes.func.isRequired,
  contentTypeId: PropTypes.func,
  error: PropTypes.string,
};

export default SmallModal;