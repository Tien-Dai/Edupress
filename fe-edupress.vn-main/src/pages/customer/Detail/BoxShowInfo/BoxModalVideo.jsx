

import React, { useState } from 'react';
import { Flex, Modal } from 'antd';
import PlayIcon from '../../../../components/icons/PlayIcon';

const BoxModalVideo = ({videoLink}) => {
  const [open, setOpen] = useState(false);
  return (
    <Flex vertical gap="middle" align="flex-start">
        {/* Responsive */}
              <button
                onClick={(e) => {
                    e.currentTarget.blur(); // 👈 bỏ focus
                    setOpen(true);
                }}
                type="button"
                className="
                bg-white w-[48px] h-[48px]
                rounded-full flex items-center justify-center
                border-2 border-white text-[#FF782D]
                hover:bg-[#FF782D] hover:text-white
                transition-all duration-300 hover:scale-110
                "
            >
                <PlayIcon size={22} />
            </button>
            <Modal
                centered
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                destroyOnHidden
                width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '40%',
                }}
            >
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-center text-[14px] md:text-[16px] lg:text-[18px] text-[#000000] font-bold'>Xem trước khóa học</h1>
                        <iframe className="w-full h-[315px] rounded-md"
                            src={`${videoLink}&autoplay=1&mute=1`}
                            title="YouTube video"
                            allow="autoplay; encrypted-media"
                            tabIndex="-1"
                            
                        >
                        </iframe>
                </div>
            </Modal>
    </Flex>
  );
};
export default BoxModalVideo;