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
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState(new Set(["All"]));
  const [filterBy, setFilterBy] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("upvotes");
  const [productCount, setProductCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [overlayWrapperForm, setOverlayWrapperForm] = useState();
  const [product, setProduct] = useState();

  const overlayWrapperRef = useRef();
  useEffect(() => {
    isLoggedIn ? setOverlayWrapperForm(<AddProductForm isEditing={isEditing} product={product} overlayWrapperRef={overlayWrapperRef}/>) : setOverlayWrapperForm(<SignupForm isDesktop={isDesktop} setOverlayWrapperForm={setOverlayWrapperForm} isMain={true} userData={userData}/>)
  
  }, [isLoggedIn])
  

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

        const res = await axios.get("http://localhost:8000/api/products");
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
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
    

  }, []);

  return (
    <>
      <NavBar userData={userData} isLoggedIn={isLoggedIn}/>
      <HeroSection />

      <div className="productSectionWrapper">
        <div className="filterWrapper">
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
            />
          )}

          <div className="filterButtonsWrapper">
            {[...filters].map((filter) => {
              return (
                <span
                  key={filter}
                  className={
                    filter === filterBy
                      ? "filterButton selectedFilter"
                      : "filterButton"
                  }
                  onClick={() => {
                    try {
                      if (filter === "All") {
                        filter = null;
                      }
                      const getFilteredProdcts = async () => {
                        let res = await axios.get(
                          "http://localhost:8000/api/products",
                          {
                            params: {
                              filterByCategory: filter,
                              sortBy: sortBy,
                            },
                          }
                        );
                        setProducts(res.data);
                        setFilterBy(filter);
                      };
                      getFilteredProdcts();
                    } catch {
                      console.log("Error fetching data");
                    }
                  }}
                >
                  {filter}
                </span>
              );
            })}
          </div>
        </div>

        <div className="productSection">
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
            />
          )}
          <div className="productCardsWrapper">
            {products.map((currentProduct, i) => (
              <ProductBlock key={i} isLoggedIn={isLoggedIn} product={currentProduct} isDesktop={isDesktop} overlayWrapperRef={overlayWrapperRef} setIsEditing={setIsEditing} setProduct={setProduct} parentProduct={[product]} />
            ))}
          </div>
        </div>
      </div>

      <OverlayFormLayout
        overlayWrapperRef={overlayWrapperRef}
        isDesktop={isDesktop}
        formHeading={isLoggedIn ? "Add your product" : "Signup to continue"}
        form={overlayWrapperForm}
        
      />
    </>
  );
}
