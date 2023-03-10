import React from 'react';
import PropTypes from 'prop-types';
import TrashIcon from '../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png';
import EditIcon from '../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png';

function FieldItem({column}) {
  return (
    <div className='flex justify-between p-5 rounded-lg bg-white w-full items-center'>
      <p className='w-full text-left pl-10 font-semibold'>{column.name}</p>
      <p className='w-full text-left pl-10 text-gray-400'>Text</p>
      <p className='w-full flex justify-end gap-4 pr-10'>
        <button>
          <img src={EditIcon}></img>
        </button>
        <button>
          <img src={TrashIcon}></img>
        </button>
      </p>
    </div>
  );
}

FieldItem.propTypes = {
  column: PropTypes.object,
};

export default FieldItem;