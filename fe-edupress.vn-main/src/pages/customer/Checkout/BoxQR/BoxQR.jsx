
import React from 'react';
import { QRCode } from 'antd';
const BoxQR = ({currentCheckout}) => (
  <QRCode
    errorLevel="H"
    value={`https://edupress-vn.vercel.app/scan?token=${currentCheckout?.token}`}
    icon="/images/logo.png"
  />
);
export default BoxQR;