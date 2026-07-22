

import React from 'react';
import {  Result, Spin } from 'antd';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '../../../components/icons/ArrowRightIcon';
const BoxResult = ({isStatus}) => (
<div>
    {
        isStatus === "loading" ? (
            <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" fullscreen tip="Đang xử lý thanh toán..." />
            </div>
        ) : (
            <Result
            status={
                isStatus === "success" || isStatus === "already_paid"
                ? "success"
                : "error"
            }
            title={
                isStatus === "success"
                ? "Thanh toán thành công!"
                : isStatus === "already_paid"
                ? "Đơn hàng đã được thanh toán trước đó"
                : "Thanh toán không thành công"
            }
            subTitle={
                isStatus === "success"
                ? "Cảm ơn bạn đã mua khóa học."
                : isStatus === "already_paid"
                ? "Bạn không cần thanh toán lại đơn hàng này."
                : "Vui lòng thử lại hoặc tạo đơn hàng mới."
            }
            className="shadow-lg rounded-2xl bg-white"
            extra={[
                <div
                    key="checkout-history"
                    className="flex justify-center flex-col items-center"
                >
                </div>
            ]}
            />
        )
    }

  </div>

);
export default BoxResult;