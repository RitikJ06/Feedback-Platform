import React from "react";
import "./StatusBar.css";

export default function StatusBar(props) {
  return (
    <div className="statusBarWrapper">
      <span className="suggestionsCount">{props.productCount} Suggestions</span>
      <div className="sortSelectionWrapper">
        {props.isDesktop && <span className="sortBy">Sort by:</span>}
        <select onChange={(e) => {
            console.log(e.target.value);
            let sortedProducts = []
            if(e.target.value == "upvotes"){
                sortedProducts = props.products.sort((a, b) => a.upvotes > b.upvotes ? -1 : 1)
            }
            else if (e.target.value == "comment"){
                sortedProducts = props.products.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
            }
            else{
                sortedProducts = props.products;
            }
            console.log(sortedProducts)
            props.setProducts([...sortedProducts])
        }} className="sortSelector">
          <option value="upvotes">Upvotes</option>
          <option value="comment">Comment</option>
        </select>
      </div>
      <button className="addProductButton">+ Add Product</button>
    </div>
  );
}
