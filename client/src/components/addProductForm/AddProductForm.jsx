import React from "react";
import "./AddProductForm.css";
import axios from "axios";

import { useRef, useEffect } from "react";

export default function AddProductForm(props) {
  useEffect(() => {
    nameRef.current.value = props.editingProduct.name ? props.editingProduct.name : "";
    categoryRef.current.value = props.editingProduct.category ? props.editingProduct.category : "";
    logoRef.current.value = props.editingProduct.logo ? props.editingProduct.logo : "";
    linkRef.current.value = props.editingProduct.link ? props.editingProduct.link : "";
    descriptionRef.current.value = props.editingProduct.description ? props.editingProduct.description : "";
  }, [props.editingProduct]);

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
      if (props.editingProduct.name) {
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
        props.setProductAdded((value) => value + 1);
        props.overlayWrapperRef.current.style.display = "none";
      }

      console.log(categoryRef.current.value);
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
      <button
        onClick={() => createOrEditProduct()}
        className="addProductFormButton"
      >
        +Add
      </button>
    </div>
  );
}
