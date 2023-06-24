import React from "react";
import "./ProductBlock.css";
import axios from "axios";
import commentIcon from "./../../../images/comment_icon.svg";
import commentCountIcon from "./../../../images/comment_count_icon.svg";
import sendIcon from "./../../../images/send_icon.svg";

import { useState, useRef, useEffect } from "react";

export default function ProductBlock(props) {
  const commentSectionRef = useRef();
  const commentRef = useRef();
  const upvotesRef = useRef(0);
  const [comments, setComments] = useState([]);
  const [upvoteCount, setUpvoteCount] = useState(0);
  useEffect(() => {
    setComments(props.product.comments);
    setUpvoteCount(props.product.upvotes);
  }, [props.product.upvotes, props.product.comments]);

  const updateUpvotes = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/product/upvote/" + props.product._id
      );
      console.log(res.data, typeof res.data.status);
      if (res.data.status === 200) {
        setUpvoteCount((count) => count + 1);
        upvotesRef.current.value += 1;
      }
    } catch {
      console.log("error");
    }
  };

  const saveComment = async () => {
    try {
      if (!commentRef.current.value.trim()) {
        return;
      }
      const res = await axios.patch(
        "http://localhost:8000/api/product/comment/" + props.product._id,
        { comment: commentRef.current.value }
      );
      if (res.data.status === 200) {
        setComments([...comments, commentRef.current.value]);
        commentRef.current.value = "";
      }
    } catch {
      console.log("error");
    }
  };

  const editProduct = () => {
    props.setIsEditing(true)
    props.setProduct([props.product])
    props.overlayWrapperRef.current.style.display = "flex";
  };

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
              <div className="upvoteCounter" onClick={() => updateUpvotes()}>
                <div>^</div>
                <div ref={upvotesRef}>{upvoteCount}</div>
              </div>
            </div>
          </div>
          <div className="cardDetailsBottomSection">
            <div className="cardDetailsBottomLeftSection">
              <div className="categoryWrapper">
                {props.product.category.map((item) => (
                  <span key={item} className="categoryItem">
                    {item}
                  </span>
                ))}
              </div>
              <div
                className="commentWrapper"
                onClick={() => {
                  !commentSectionRef.current.style.display ||
                  commentSectionRef.current.style.display === "none"
                    ? (commentSectionRef.current.style.display = "flex")
                    : (commentSectionRef.current.style.display = "none");
                }}
              >
                <img src={commentIcon} alt="comment Icon" />
                {props.isDesktop && <span> &nbsp; Comment</span>}
              </div>
            </div>

            <div className="cardDetailsBottomRightSection">
              {props.isLoggedIn && <button className="editButton" onClick={()=>editProduct()}>Edit</button>}
              <div className="commentCounter">
                {comments.length} &nbsp;
                <img src={commentCountIcon} alt="comment count icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="commentSection" ref={commentSectionRef}>
        <div className="commentInputWrapper">
          <input
            onKeyUp={(e) => {
              e.preventDefault();
              if (e.keyCode === 13) {
                saveComment();
              }
            }}
            ref={commentRef}
            placeholder="Add a comment..."
            className="commentInput"
            type="text"
          />
          <img
            src={sendIcon}
            onClick={() => saveComment()}
            alt="send icon"
            className="sendIcon"
          />
        </div>
        <div className="commentsWrapper">
          <ul>
            {comments.map((comment, i) => {
              return <li key={i}>{comment}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
