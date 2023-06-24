import React from "react";
import "./OverlayFormLayout.css";

export default function OverlayFormLayout(props) {

  return (
    <div ref={props.overlayWrapperRef} className="overlayWrapper" onClick={(e) => {
      e.target.className==="overlayWrapper" ? e.target.style.display ="none": e.target.style.display ="flex"}}>
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
