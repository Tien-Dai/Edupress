

import * as React from "react";

const BarsIcon = ({size, ...props}) => (
  <svg height={size} width={size} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    <path fill="currentColor" d="M96 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"></path>
  </svg>
);

export default BarsIcon;
