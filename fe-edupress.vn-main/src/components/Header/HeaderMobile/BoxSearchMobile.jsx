

import React, { useState } from 'react';
import { Drawer } from 'antd';
import ShowCourseSearch from '../BoxSearch/ShowCourseSearch';
import SearchIcon from '../../../components/icons/SearchIcon';
const BoxSearchMoblie = ({
  loading, 
  keyword,
  setKeyword,
  results
}) => {
  
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

   const handleClose = () =>{
        setOpen(false);
        setKeyword('');
    }
  return (
    <>
      <button
        type='button'
        onClick={showDrawer} 
        className="px-3 py-4 cursor-pointer hover:text-[#FF782D]">
        <SearchIcon size={24} />
      </button>
      <Drawer
        placement={'top'}
        closable={false}
        // onClose={onClose}
        open={open}
        key={'top'}
        style={{ height: '100vh' }}
      >
      <ShowCourseSearch 
        keyword={keyword} 
        setKeyword={setKeyword} 
        results={results} 
        loading={loading} 
        onclose={handleClose} 
      />
    </Drawer>
    </>
  );
};
export default BoxSearchMoblie;