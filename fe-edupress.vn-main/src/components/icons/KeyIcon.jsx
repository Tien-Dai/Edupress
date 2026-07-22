

import * as React from "react";

const KeyIcon = ({ size, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} {...props} viewBox="0 0 16 16">
    <path
      id="SVGRepo_iconCarrier"
      fill="currentColor"
      fillRule="evenodd"
      d="M16 5.5a5.5 5.5 0 0 1-5.5 5.5H7v2H5v2l-1 1H0v-4l5.164-5.164A5.5 5.5 0 1 1 16 5.5M13 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default KeyIcon;
