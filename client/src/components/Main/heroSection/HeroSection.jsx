import React from "react";
import "./HeroSection.css";
import heroImage from "./../../../images/hero_image.png";

export default function HeroSection(props) {
  return (
    <div
      className={
        props.isDesktop
          ? "heroSectionWrapper"
          : "heroSectionWrapper heroSectionWrapperRes"
      }
    >
      <div
        className={
          props.isDesktop
            ? "heroImageWrapper"
            : "heroImageWrapper heroImageWrapperRes"
        }
      >
        <img
          className={props.isDesktop ? "heroImage" : "heroImage heroImageRes"}
          alt="hero section image"
          src={heroImage}
        />
      </div>

      <div
        className={props.isDesktop ? "heroTextWrapper" : "heroTextWrapperRes"}
      >
        <h1>Add your products and give your valuable feedback</h1>
        <p>
          Easily give your feedback in a matter of minutes. Access your audience
          on all platforms. Observe result manually in real time
        </p>
      </div>
    </div>
  );
}
