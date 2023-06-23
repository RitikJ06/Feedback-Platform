import React from "react";
import "./Main.css";
import axios from "axios";
import NavBar from "./navBar/NavBar";
import HeroSection from "./heroSection/HeroSection";
import StatusBar from "./statusBar/StatusBar";

import { useState, useEffect } from "react";

export default function Main() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  const [filters, setFilters] = useState(new Set(["All"]));
  const [filterBy, setFilterBy] = useState("All");

  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");
        let all_filters = new Set();
        res.data.map((item) => {
          item.category.map((cate) => {
            all_filters = all_filters.add(cate);
          });
        });
        all_filters = new Set([...filters, ...all_filters]);
        setFilters(all_filters);
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
      <NavBar />
      <HeroSection />

      <div className="productSectionWrapper">
        <div className="filterWrapper">
          {isDesktop &&
            <div className="filterHeading">
            <h1>Feedback</h1>
            <p>Apply filter</p>
          </div>
          }
          {!isDesktop && <StatusBar productCount={productCount} isDesktop={isDesktop}/>
          }

          <div className="filterButtonsWrapper">
            {[...filters].map((filter) => {
              return (
                <span
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

        <div className="productSection">
          {isDesktop && 
            <StatusBar productCount={productCount} isDesktop={isDesktop}/>
          }
        </div>
      </div>
    </>
  );
}