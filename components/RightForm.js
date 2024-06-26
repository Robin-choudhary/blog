import React, {useEffect, useState} from "react";
import "react-phone-number-input/style.css";
function RightForm() {

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.in5.nopaperforms.com/emwgts.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        className="rounded h-full"
        style={{ boxShadow: "0 0 40px rgba(82,85,90,.1)" }}
      >
        <div className="frm__bx__mn">
          <div className="frm__icon">&nbsp;</div>
          <div className="frm__bx__inr">
            <div
              className="npf_wgts"
              data-height="650px"
              data-w="0323e2b41ecefd2958b814f1a07fb5fd"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RightForm;
