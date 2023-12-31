import React from "react";
import "./Main.css";
import axios from "axios";
import NavBar from "./navBar/NavBar";
import HeroSection from "./heroSection/HeroSection";
import StatusBar from "./statusBar/StatusBar";
import ProductBlock from "./productBlock/ProductBlock";
import OverlayFormLayout from "./overlayFormLayout/OverlayFormLayout";
import SignupForm from "../common/SignupForm/SignupForm";
import AddProductForm from "./addProductForm/AddProductForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useRef } from "react";

import loadingGif from './../../images/loading.gif'

export default function Main() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState(new Set(["All"]));
  const [filterBy, setFilterBy] = useState("All");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("upvotes");
  const [productCount, setProductCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const [formHeading, setFormHeading] = useState();
  const [overlayWrapperForm, setOverlayWrapperForm] = useState();
  const [editingProduct, setEditingProduct] = useState({});
  const [productAdded, setProductAdded] = useState(0);

  const overlayWrapperRef = useRef();
  
  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  useEffect(() => {
    isLoggedIn
      ? setOverlayWrapperForm(
          <AddProductForm
            isDesktop={isDesktop}
            setProductAdded={setProductAdded}
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

  useEffect(()=>{
    try {
      const auth = async () => {
        let storedData = JSON.parse(localStorage.getItem("data"));
        if (storedData) {
          const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/autheticate",
          {
            headers: {
              token: storedData.jwtToken,
            },
          }
          );
          if (response.data.status === 202) {
            setIsLoggedIn(true);
            setUserData(storedData);
          }
          else{
            setIsLoggedIn(false);
            localStorage.clear('data');
          }
        }
      }
      auth();
    }
    catch{
      console.log('error! could not authenticate user') 
    }

  }, [])

  useEffect(() => {
    const setNewFilters = async () => {
      // make api call to get all products to create filters list
      const resAll = await axios.get(process.env.REACT_APP_BASE_URL + "/api/products");

      let all_filters = new Set();
      resAll.data.map((item) => {
        item.category.map((cate) => {
          all_filters = all_filters.add(cate);
        });
      });
      all_filters = new Set(["All", ...all_filters]);
      setFilters(all_filters);
    }
    setNewFilters();
  }, [productAdded])
  

  useEffect(() => {
    const fetchData = async () => {
      try { 
        // make api call to get products with filter and sorting
        const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/products", {
          params: {
            filterByCategory: filterBy === "All" ? null : filterBy,
            sortBy: sortBy,
          },
        });

        setProducts(res.data);
        setProductCount(res.data.length);
      } catch {
        toast.error("Someting went wrong!")
      }
    };
    fetchData();
  }, [sortBy, filterBy, productAdded]);

  return (
    <>
      <ToastContainer position="bottom-left" />
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
            {!isDesktop && <div className="filterTextMob">Filters:</div>}
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
          <div
            className={
              isDesktop
                ? "productCardsWrapper"
                : "productCardsWrapper productCardsWrapperRes"
            }
          >
            {products.length !== 0 ? products.map((currentProduct, i) => (
              <ProductBlock
                key={i}
                isLoggedIn={isLoggedIn}
                product={currentProduct}
                isDesktop={isDesktop}
                overlayWrapperRef={overlayWrapperRef}
                setEditingProduct={setEditingProduct}
              />
            ))
              :
              <img src={loadingGif} alt="loading..."/>          
          }
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
