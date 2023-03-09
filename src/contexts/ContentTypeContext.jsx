import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ContentTypeContext = createContext();

export const ContentTypeProvider = ({ children }) => {
  const [allContentTypes, setAllContentTypes] = useState([]);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ContentTypeContext.Provider value={{ allContentTypes, setAllContentTypes }}>
      {children}
    </ContentTypeContext.Provider>
  );
};

ContentTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
