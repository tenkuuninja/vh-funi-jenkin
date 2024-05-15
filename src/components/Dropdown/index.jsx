import React from "react";

function Dropdown({ overlay, children, placement = "bottom-left" }) {
  let place = placement.split("-");
  return (
    <div className={`dropdown__trigger relative`}>
      {children}
      <div
        className={`dropdown__content absolute z-40 ${
          place[0] === "top" ? "bottom-full" : "top-full"
        } ${place[1] === "left" ? "left-0" : "right-0"}`}
      >
        {overlay}
      </div>
    </div>
  );
}

export default Dropdown;
