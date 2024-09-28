import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const productsData = products;
  const skip = 0;
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const INFINITE = Number.MAX_SAFE_INTEGER;

  const [perPage, setPerPage] = useState(INFINITE);

  const [pageNo, setPageNo] = useState(0);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState("asc");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listProjectDetailByParamsSearch`,
          {
            skip: skip,
            per_page: perPage,
            sorton: column,
            sortdir: sortDirection,
            match: searchQuery,
            IsActive: filter,
          }
        );
        console.log(response.data, "Abacavir sulfate");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        showModal,
        handleShow,
        handleClose,
        productsData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
