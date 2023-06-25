import React from "react";
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
          props.setEditingProduct({});
          props.overlayWrapperRef.current.style.display = "flex";
        }}
        className="addProductButton"
      >
        + Add Product
      </button>
    </div>
  );
}
