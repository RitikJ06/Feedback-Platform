import React from "react";
import "./AddProductForm.css";
import axios from "axios";

import { useRef } from "react";

export default function AddProductForm(props) {
  const nameRef = useRef();
  const categoryRef = useRef();
  const logoRef = useRef();
  const linkRef = useRef();
  const descriptionRef = useRef();

  const createProduct = async () => {
    let userData = JSON.parse(localStorage.getItem("data"));
    if (!userData) {
      userData = { jwtToken: false };
    }
    try {
      let res = await axios.post(
        "http://localhost:8000/api/products/",
        {
          name: nameRef.current.value,
          category: categoryRef.current.value,
          logo: logoRef.current.value,
          link: linkRef.current.value,
          description: descriptionRef.current.value,
        },
        {
          headers: {
            token: userData.jwtToken,
          },
        }
      );
      if (res.data.status === 201) {
        props.overlayWrapperRef.current.style.display ="none";
      }
    } catch {
      console.log("error");
    }
  };
  return (
    <div className="addProductForm">
      <input
        ref={nameRef}
        className="productFormInput"
        type="text"
        placeholder="Name of the company"
        name="name"
        required
      />
      <input
        ref={categoryRef}
        className="productFormInput"
        type="text"
        placeholder="Category"
        name="category"
        required
      />
      <input
        ref={logoRef}
        className="productFormInput"
        type="url"
        placeholder="Add logo url"
        name="url"
        required
      />
      <input
        ref={linkRef}
        className="productFormInput"
        type="url"
        placeholder="Link of product"
        name="productLink"
        required
      />
      <input
        ref={descriptionRef}
        className="productFormInput"
        type="text"
        placeholder="Add description"
        name="description"
        required
      />
      <button onClick={() => createProduct()} className="addProductFormButton">
        +Add
      </button>
    </div>
  );
}
