import React from "react";
import "./StatusBar.css";

export default function StatusBar(props) {
  return (
    <div className="statusBarWrapper">
      <span className="suggestionsCount">{props.productCount} Suggestions</span>
      <div className="sortSelectionWrapper">
        {props.isDesktop && <span className="sortBy">Sort by:</span>}
        <select className="sortSelector">
          <option value="upvotes">Upvotes</option>
          <option value="comment">Comment</option>
        </select>
      </div>
      <button className="addProductButton">+ Add Product</button>
    </div>
  );
}
