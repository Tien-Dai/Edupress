

import * as React from "react";

const ArrowRightIcon = ({ size, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="right-arrow"
    height={size}
    width={size}
    {...props}
    className="icon flat-color"
    data-name="Flat Color"
    viewBox="0 0 24 24"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        id="primary"
        fill="currentColor"
        d="m21.71 11.29-3-3a1 1 0 0 0-1.42 1.42l1.3 1.29H3a1 1 0 0 0 0 2h15.59l-1.3 1.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42"
      ></path>
    </g>
  </svg>
);

export default ArrowRightIcon;
