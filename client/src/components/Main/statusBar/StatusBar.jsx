import React from "react";
import axios from "axios";
import "./StatusBar.css";

export default function StatusBar(props) {

  return (
    <div className="statusBarWrapper">
      <span className="suggestionsCount">{props.productCount} Suggestions</span>
      <div className="sortSelectionWrapper">
        {props.isDesktop && <span className="sortBy">Sort by:</span>}
        <select
          onChange={(e) => {
            props.setSortBy(e.target.value);
          }}
          className="sortSelector"
        >
          <option value="upvotes">Upvotes</option>
          <option value="comments">Comment</option>
        </select>
      </div>
      <button
        onClick={() => {
          props.overlayWrapperRef.current.style.display = "flex";
          props.setEditingProduct({})
        }}
        className="addProductButton"
      >
        + Add Product
      </button>
    </div>
  );
}
