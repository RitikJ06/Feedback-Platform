import React from "react";
import "./OverlayFormLayout.css";
import { useRef } from "react";

export default function OverlayFormLayout(props) {
  const overlayWrapperRef = useRef();

  return (
    <div ref={overlayWrapperRef} className="overlayWrapper">
      <div className="overlayInnerWrapper">
        <div style={!props.isDesktop ? {width: "100%"} : {}} className="formWrapper">
          <h2 className="formHeading">{props.formHeading}</h2>
          {props.form}
        </div>
        {props.isDesktop && (
          <div className="overlayTextWrapper">
            <h1>Feedback</h1>
            <p>Add your product and rate other items.............</p>
          </div>
        )}
      </div>
    </div>
  );
}
