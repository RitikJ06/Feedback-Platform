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

  const createOrEditProduct = async () => {
    let userData = props.userData;
    if (!userData) {
      userData = { jwtToken: false };
    }
    try {
      let res;
      if (props.editingProduct) {
        res = await axios.put(
          "http://localhost:8000/api/products/" + props.editingProduct._id,
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
      } else {
        res = await axios.post(
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
      }
      if (res.data.status === 201 || res.data.status === 200) {
        props.overlayWrapperRef.current.style.display = "none";
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
        defaultValue={props.editingProduct.name}
        required
      />
      <input
        ref={categoryRef}
        className="productFormInput"
        type="text"
        placeholder="Category"
        name="category"
        defaultValue={props.editingProduct.category}
        required
      />
      <input
        ref={logoRef}
        className="productFormInput"
        type="url"
        placeholder="Add logo url"
        name="url"
        defaultValue={props.editingProduct.logo}
        required
      />
      <input
        ref={linkRef}
        className="productFormInput"
        type="url"
        placeholder="Link of product"
        name="productLink"
        defaultValue={props.editingProduct.link}
        required
      />
      <input
        ref={descriptionRef}
        className="productFormInput"
        type="text"
        placeholder="Add description"
        name="description"
        defaultValue={props.editingProduct.description}
        required
      />
      <button
        onClick={() => createOrEditProduct()}
        className="addProductFormButton"
      >
        +Add
      </button>
    </div>
  );
}
