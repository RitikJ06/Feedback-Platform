import React from "react";
import "./ProductBlock.css";
import commentIcon from "./../../../images/comment_icon.svg";
import commentCountIcon from "./../../../images/comment_count_icon.svg";
import sendIcon from "./../../../images/send_icon.svg";

import { useRef } from "react";

export default function ProductBlock(props) {
  const commentSectionRef = useRef();
  return (
    <div className="productCard">
      <div className="cardDetailSection">
        <div className="logoImageWrapper">
          <img
            className="productLogo"
            alt="product logo"
            src={props.product.logo}
          />
        </div>
        <div className="cardInnerWrapper">
          <div className="cardDetailsTopSection">
            <div className="cardDetailsTopLeftSection">
              <h2>
                <a href={props.product.link}>{props.product.name} </a>
              </h2>
              <p>{props.product.description}</p>
            </div>
            <div className="cardDetailsTopRightSection">
              <div className="upvoteCounter">
                <div>^</div>
                <div>{props.product.upvotes}</div>
              </div>
            </div>
          </div>
          <div className="cardDetailsBottomSection">
            <div className="cardDetailsBottomLeftSection">
              <div className="categoryWrapper">
                {props.product.category.map((item) => (
                  <span key={item} className="categoryItem">{item}</span>
                ))}
              </div>
              <div
                className="commentWrapper"
                onClick={() =>
                  {
                    console.log( typeof(commentSectionRef.current.style.display)  + "this isd ")
                    !commentSectionRef.current.style.display || commentSectionRef.current.style.display === "none"
                    ? (commentSectionRef.current.style.display = "flex")
                    : (commentSectionRef.current.style.display = "none")
                    
                  }
                }
              >
                <img src={commentIcon} alt="comment Icon" />
                {props.isDesktop && <span> &nbsp; Comment</span>}
              </div>
            </div>

            <div className="cardDetailsBottomRightSection">
              <div className="commentCounter">
                {props.product.comments.length} &nbsp;
                <img src={commentCountIcon} alt="comment count icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="commentSection" ref={commentSectionRef}>
        <div className="commentInputWrapper">
          <input
            placeholder="Add a comment..."
            className="commentInput"
            type="text"
          />
          <img src={sendIcon} alt="send icon" className="sendIcon" />
        </div>
        {props.product.comments.length > 0 && (
          <div className="commentsWrapper">
            <ul>
              {props.product.comments.map((comment, i) => {
                return <li key={i}>{comment}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
