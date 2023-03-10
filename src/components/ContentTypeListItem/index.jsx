import React from 'react';
import PropTypes from 'prop-types';

function ContentTypeListItem({contentType, openTab}) {
  const contentTypeInPath = window.location.pathname.replace('/content-types/', '');
  const active = contentTypeInPath === contentType.contentTypeId;
  return (
    <div className={`flex items-center gap-4 px-12 py-4 w-full hover:bg-black ${active&&'bg-black'} hover:cursor-pointer`} onClick={openTab}>
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