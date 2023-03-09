import React from 'react';
import PropTypes from 'prop-types';

function ContentTypeListItem({contentType, openTab}) {
  return (
    <div className='flex items-center gap-4 p-4 w-full hover:bg-black hover:cursor-pointer' onClick={openTab}>
      <div className='p-1 bg-gray-500 rounded-full'></div>
      <p className='text-sm text-gray-500'>{contentType.contentTypeName}</p>  
    </div>
  );
}

ContentTypeListItem.propTypes = {
  contentType: PropTypes.object.isRequired,
  openTab: PropTypes.func.isRequired,
};

export default ContentTypeListItem;