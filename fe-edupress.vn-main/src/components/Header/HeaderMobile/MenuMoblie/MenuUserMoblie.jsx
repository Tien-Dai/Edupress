

import React, { useState } from 'react';
import { Avatar, Button, Drawer, Radio, Space } from 'antd';
import BarsIcon from '../../../icons/BarsIcon';
import CloseIcon from '../../../icons/CloseIcon';
import ChevronLeftIcon from '../../../icons/ChevronLeftIcon';
import ChevronRightIcon from '../../../icons/ChevronRightIcon';
import MenuMoblieItem from './MenuMoblieItem';


const UserMenuMoblie = ({
  user,
  logout, 
  getAvatarLetter
}) => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button 
        onClick={showDrawer}
        className="
          flex items-center justify-between border-b-[1px] border-[#c3c3c3] w-full transform group
          transition-all duration-300 ease-in-out hover:bg-[#e0e0e0d8] cursor-pointer px-[10px] py-[5px] 
        "
      >
        <div
            className="
                py-3 flex items-center justify-start gap-3
            "
        >
            <Avatar 
                className='avatar_header' 
                style={{width:'45px',height:'45px'}}
            >
                <span className="text-[#000000] font-semibold">{getAvatarLetter(user?.username)}</span>
            </Avatar>
            <div className="leading-[20px]">
                <p className="text-[#2c2c2c] font-bold p-0 m-0 text-start">{user?.username}</p>
                <p className="text-[#a4a4a4] text-[14px] font-regular p-0 m-0">{user?.email}</p>
            </div>
        </div>
        <ChevronRightIcon size={24} className="transform transition-all duration-300 ease-in-out group-hover:text-[#FF782D]" />
      </button>
      <Drawer
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={open}
        key="left"
        className='menu-moblie'
        size={300}
      >
        <button 
          onClick={onClose}
          className="
            flex items-center border-b-[1px] border-[#c3c3c3] w-full transform group gap-3
            transition-all duration-300 ease-in-out hover:bg-[#e0e0e0d8] cursor-pointer px-[10px] py-[10px] 
          "
        >
          <ChevronLeftIcon size={24} className="transform transition-all duration-300 ease-in-out group-hover:text-[#FF782D]" />
          <span className="text-[16px] font-semibold text-[#000000]">Menu</span>
        </button>

        <MenuMoblieItem onClose={onClose} logout={logout}/>
      </Drawer>
    </>
  );
};
export default UserMenuMoblie;