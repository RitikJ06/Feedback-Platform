import React from "react";
import axios from "axios";
import "./StatusBar.css";

export default function StatusBar(props) {
  const getSortedProducts = async (e) => {
    try {
      const res = await axios.get("http://localhost:8000/api/products", {
        params: {
          filterByCategory: props.filterBy === "All" ? null : props.filterBy,
          sortBy: e.target.value,
        },
      });
      props.setProducts(res.data);
    } catch {
      console.log("something went wrong!");
    }
    props.setSortBy(e.target.value);
  };

  return (
    <div className="statusBarWrapper">
      <span className="suggestionsCount">{props.productCount} Suggestions</span>
      <div className="sortSelectionWrapper">
        {props.isDesktop && <span className="sortBy">Sort by:</span>}
        <select
          onChange={(e) => {
            getSortedProducts(e);
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
        }}
        className="addProductButton"
      >
        + Add Product
      </button>
    </div>
  );
}
