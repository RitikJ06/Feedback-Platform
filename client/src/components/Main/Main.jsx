import React from "react";
import "./Main.css";
import axios from "axios";
import NavBar from "./navBar/NavBar";
import HeroSection from "./heroSection/HeroSection";
import StatusBar from "./statusBar/StatusBar";
import ProductBlock from "./productBlock/ProductBlock";
import OverlayFormLayout from "../common/overlayFormLayouy/OverlayFormLayout";

import SignupForm from "../common/SignupForm/SignupForm";
import AddProductForm from "../addProductForm/AddProductForm";
import { useState, useEffect, useRef } from "react";

export default function Main() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState(new Set(["All"]));
  const [filterBy, setFilterBy] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("upvotes");
  const [productCount, setProductCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [formHeading, setFormHeading] = useState();
  const [overlayWrapperForm, setOverlayWrapperForm] = useState();
  const [editingProduct, setEditingProduct] = useState("");

  const overlayWrapperRef = useRef();
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  useEffect(() => {
    isLoggedIn
      ? setOverlayWrapperForm(
          <AddProductForm
            userData={userData}
            editingProduct={editingProduct}
            overlayWrapperRef={overlayWrapperRef}
          />
        )
      : setOverlayWrapperForm(
          <SignupForm
            isDesktop={isDesktop}
            setOverlayWrapperForm={setOverlayWrapperForm}
            isMain={true}
            userData={userData}
            setFormHeading={setFormHeading}
          />
        );
    isLoggedIn
      ? setFormHeading("Add your product")
      : setFormHeading("Signup to continue");
  }, [isLoggedIn, editingProduct]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedData = JSON.parse(localStorage.getItem("data"));
        if (storedData) {
          const response = await axios.get(
            "http://localhost:8000/autheticate",
            {
              headers: {
                token: storedData.jwtToken,
              },
            }
          );
          if (response.data.status === 200) {
            setIsLoggedIn(true);
            setUserData(storedData);
          }
        }
        const res = await axios.get("http://localhost:8000/api/products", {
          params: {
            filterByCategory: filterBy === "All" ? null : filterBy,
            sortBy: sortBy,
          },
        });
        let all_filters = new Set();
        res.data.map((item) => {
          item.category.map((cate) => {
            all_filters = all_filters.add(cate);
          });
        });
        all_filters = new Set([...filters, ...all_filters]);
        setFilters(all_filters);
        setProducts(res.data);
        setProductCount(res.data.length);
      } catch {
        console.log("Someting went wrong!");
      }
    };
    fetchData();
    console.log("this is is executed ");
  }, [sortBy, filterBy]);

  return (
    <>
      <NavBar
        isDesktop={isDesktop}
        userData={userData}
        isLoggedIn={isLoggedIn}
      />
      <HeroSection isDesktop={isDesktop} />

      <div className="productSectionWrapper">
        <div
          className={
            isDesktop ? "filterWrapper" : "filterWrapper filterWrapperRes"
          }
        >
          {isDesktop && (
            <div className="filterHeading">
              <h1>Feedback</h1>
              <p>Apply filter</p>
            </div>
          )}
          {!isDesktop && (
            <StatusBar
              productCount={productCount}
              setProducts={setProducts}
              products={products}
              isDesktop={isDesktop}
              sortBy={sortBy}
              setSortBy={setSortBy}
              overlayWrapperRef={overlayWrapperRef}
              filterBy={filterBy}
              setEditingProduct={setEditingProduct}
            />
          )}

          <div
            className={
              isDesktop
                ? "filterButtonsWrapper"
                : "filterButtonsWrapper filterButtonsWrapperRes"
            }
          >
            {[...filters].map((filter) => {
              return (
                <span
                  key={filter}
                  className={
                    filter === filterBy
                      ? "filterButton selectedFilter"
                      : "filterButton"
                  }
                  onClick={() => setFilterBy(filter)}
                >
                  {filter}
                </span>
              );
            })}
          </div>
        </div>

        <div
          className={
            isDesktop ? "productSection" : "productSection productSectionRes"
          }
        >
          {isDesktop && (
            <StatusBar
              productCount={productCount}
              setProducts={setProducts}
              products={products}
              isDesktop={isDesktop}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              overlayWrapperRef={overlayWrapperRef}
              setEditingProduct={setEditingProduct}
            />
          )}
          <div className="productCardsWrapper">
            {products.map((currentProduct, i) => (
              <ProductBlock
                key={i}
                isLoggedIn={isLoggedIn}
                product={currentProduct}
                isDesktop={isDesktop}
                overlayWrapperRef={overlayWrapperRef}
                setEditingProduct={setEditingProduct}
              />
            ))}
          </div>
        </div>
      </div>

      <OverlayFormLayout
        overlayWrapperRef={overlayWrapperRef}
        isDesktop={isDesktop}
        formHeading={formHeading}
        form={overlayWrapperForm}
      />
    </>
  );
}
