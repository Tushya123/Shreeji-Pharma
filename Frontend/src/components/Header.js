import React, { useState, useEffect } from "react";
import logo from "../assets/images/new-home/logo.png";
import logo1 from "../assets/images/new-home/new-logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSearch } from "../pages/Search/SearchProvider";
import { useNavigate } from "react-router-dom";
import { Container, Figure, Nav } from "react-bootstrap";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { Helmet } from "react-helmet";

export default function Header() {
  const [products, setProducts] = useState([]);
  const [prod, setProd] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [metaInfo, setMetaInfo] = useState({});

  const navigate = useNavigate();

  const handleProductSelect = (productGroup) => {
    console.log("Original Product Group:", productGroup); // Log the original string
    const encodedProductGroup = encodeURIComponent(productGroup);
    console.log("Encoded Product Group:", encodedProductGroup); // Log the encoded result
    navigate(`/products/${encodedProductGroup}`);
  };

  const {
    searchQuery,
    setQuery,
    setSearchQuery,
    showModal,
    handleShow,
    handleClose: originalHandleClose,
    productsData,
  } = useSearch();

  const handleClose = () => {
    // navigate(`/search?query=""`);
    originalHandleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();

    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const toggleShowProducts = () => {
    setShowProducts((prevShowProducts) => !prevShowProducts);
  };

  useEffect(() => {
    const storedProductIds = localStorage.getItem("productIds");
    if (storedProductIds) {
      setProd(JSON.parse(storedProductIds));
    }
  }, [localStorage.getItem("productIds")]);

  console.log("prod", prod.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/areatype`
        );
        const activeProducts = response.data.filter(
          (product) => product.IsActive
        );

        // Define the custom order
        const customOrder = [
          "6641abe793c69c545ac233e2",
          "6634b74108aa777d7b59c4c1",
          "663b598ccc6c2844e6838bbc",
        ];

        // Sort the active products according to the custom order
        const sortedProducts = activeProducts.sort((a, b) => {
          const indexA = customOrder.indexOf(a._id);
          const indexB = customOrder.indexOf(b._id);

          if (indexA === -1 && indexB === -1) {
            // Both items are not in the custom order, sort randomly
            return 0.5 - Math.random();
          }

          if (indexA === -1) return 1; // a is not in the custom order, so b comes first
          if (indexB === -1) return -1; // b is not in the custom order, so a comes first

          return indexA - indexB;
        });

        // Separate ordered and unordered products
        const orderedProducts = sortedProducts.filter((product) =>
          customOrder.includes(product._id)
        );
        const unorderedProducts = sortedProducts.filter(
          (product) => !customOrder.includes(product._id)
        );

        // Shuffle unordered products randomly
        const shuffledUnorderedProducts = unorderedProducts.sort(
          () => 0.5 - Math.random()
        );

        // Combine ordered and shuffled unordered products
        const finalSortedProducts = [
          ...orderedProducts,
          ...shuffledUnorderedProducts,
        ];

        console.log("finalSortedProducts", finalSortedProducts);
        setProducts(finalSortedProducts);

        const productWithMeta = finalSortedProducts.find(
          (product) =>
            product.metaTitle && product.metaDescription && product.metaKeywords
        );

        if (productWithMeta) {
          setMetaInfo({
            title: productWithMeta.metaTitle,
            description: productWithMeta.metaDescription,
            keywords: productWithMeta.metaKeywords,
            url: productWithMeta.metaURL,
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleIconClick = () => {
    setSearchQuery("");
  };

  return (
    <React.Fragment>
      {/* <Helmet>
        <title>{metaInfo.title || "Shreeji Pharma International"}</title>
        <meta
          name="description"
          content={
            metaInfo.description ||
            "Explore high-quality pharmaceutical products at Shreeji Pharma International. Your trusted partner in healthcare."
          }
        />
        <meta
          name="keywords"
          content={
            metaInfo.keywords ||
            "pharma, healthcare, pharmaceuticals, drugs, medicine, Shreeji Pharma"
          }
        />
        <link
          rel="canonical"
          href={metaInfo.url || "http://www.shreejipharma.com"}
        />
      </Helmet> */}
      <header className={`main-header header-style-one`}>
        <Container className="container">
          <div className="translate-x">
            <div className="logo-box">
              <Figure className="logo">
                <div className="custome-logo-box">
                  <a href="/">
                    <img src={logo} alt="" />
                  </a>
                </div>
                <div className="top-right">
                  <ul className="logo-name clearfix">
                    <h3>Shreeji Pharma International</h3>
                  </ul>
                </div>
              </Figure>
            </div>
          </div>
        </Container>
        <div className="header-top">
          <Container
            className="auto-container"
            style={{ marginBottom: "4px", marginTop: "148px" }}
          >
            <div className="top-inner">
              <ul className="info-list clearfix">
                <li className="support-box custom-border1">
                  <div className="icon-box">
                    <i className="flaticon-dial-pad"></i>
                  </div>
                  <a href="tel:8866002331">+918866002331</a>
                </li>
                <li className="custom-border">
                  <div className="icon-box">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <a href="mailto:contact@shreejipharma.com">
                    contact@shreejipharma.com
                  </a>
                </li>
              </ul>
              <ul className="social-links clearfix">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61561764669906"
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/sheth12" target="_blank">
                    <i className="fa-brands fa-square-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.linkedin.com/profile/view?id=99777214&amp;trk=tab_pro"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </Container>
        </div>
        <div
          className={`header-lower ${isSticky ? "sticky-header" : ""}`}
          style={{ zIndex: 9 }}
        >
          <Container className="auto-container">
            <div className="outer-box">
              <div className="menu-area clearfix">
                <div
                  className="mobile-nav-toggler"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                </div>
                <Nav className="main-menu navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/commitment">Commitment</Link>
                      </li>
                      <li className="dropdown">
                        <Link to="#">Products</Link>
                                               <ul>
                          {products.map((product, index) => (
                            <li key={index}>
                              <Link
                                onClick={() =>
                                  handleProductSelect(product.ProductGroup.replace(/\s+/g, '-'))
                                }
                                to={`/products/${product.ProductGroup.replace(/\s+/g, '-')}`} // Replace spaces with hyphens
                              >
                                {product.ProductGroup}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>

                      <li>
                        <Link to="/gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link to="/certificate">Certificate</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </div>
                </Nav>
              </div>
              <ul className="menu-right-content">
                {isSticky ? (
                  <li className="support-box">
                    <div className="icon-box">
                      <i className="flaticon-dial-pad"></i>
                    </div>
                    <a href="tel:8866002331">+918866002331</a>
                  </li>
                ) : (
                  <li className="support-box">
                    <div className="icon-box">
                      <Link to="/cart">
                        <i className="fas fa-shopping-cart"></i>
                      </Link>
                      <span className="cart-badge">{prod.length}</span>
                    </div>
                    <Link to="/cart">My Cart</Link>
                  </li>
                )}
                <li
                  className="search-box-outer search-toggler"
                  onClick={handleShow}
                >
                  <i
                    className="flaticon-magnifying-glass"
                    onClick={handleIconClick}
                  ></i>
                </li>

                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <div
                      className="upper-box clearfix"
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <figure className="logo-box pull-left">
                        <a href="#">
                          <img className="searchlogo" src={logo1} alt="Logo" />
                        </a>
                      </figure>
                      {/* <div
                        className="close-search pull-right"
                        onClick={handleClose}
                        style={{
                          cursor: "pointer",
                          marginLeft: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <i
                          className="fas fa-times"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </div> */}
                    </div>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="overlay-layer"></div>
                    <div className="auto-container">
                      <div className="search-form">
                        <form method="post" action="#" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <fieldset>
                              <div>
                                <span style={{ display: "flex" }}>
                                  <button
                                    type="submit"
                                    className="button_setting"
                                  >
                                    <i
                                      className="flaticon-magnifying-glass "
                                      style={{ padding: "10px" }}
                                    ></i>
                                  </button>
                                  <input
                                    type="search"
                                    className="search_setting"
                                    name="search-field"
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                    placeholder="Type your keyword and hit"
                                    required=""
                                  />
                                </span>
                              </div>
                            </fieldset>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </ul>
            </div>
          </Container>
        </div>
      </header>

      <Offcanvas
        className="offcanvas"
        show={isMobileMenuOpen}
        onHide={() => setIsMobileMenuOpen(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="nav-logo">
              <Link to="/">
                <img
                  src={logo1}
                  alt=""
                  title=""
                  style={{ backgroundColor: "white" }}
                />
              </Link>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="menu-box">
            <div className="menu-outer">
              <ul className="navigation clearfix upper">
                <li>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/commitment"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Commitment
                  </Link>
                </li>

                <li className="dropdown">
                  <div onClick={toggleShowProducts}>
                    <Link className="dropdown-toggle">
                      Products
                      <span>
                        {showProducts ? (
                          <RiArrowUpSLine />
                        ) : (
                          <RiArrowDownSLine />
                        )}
                      </span>
                    </Link>
                  </div>
                  {showProducts && (
                    <ul className="">
                      {products
                        .sort((a, b) =>
                          a.ProductGroup.localeCompare(b.ProductGroup)
                        )
                        .map((product, index) => (
                          <li key={index} className="ps-4">
                            <Link
                              style={{ padding: "10px" }}
                              to="#"
                              onClick={() => {
                                window.location.href = "/products";
                                localStorage.setItem(
                                  "selectedProductId",
                                  product.ProductGroup
                                );
                              }}
                            >
                              {product.ProductGroup}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>

                <li>
                  <Link
                    to="/gallery"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/certificate"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Certificate
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="contact-info">
              <h4>Contact Info</h4>
              <ul>
                <li>Chicago 12, Melborne City, USA</li>
                <li>
                  <a href="tel:+8801682648101" style={{ color: "white" }}>
                    +88 01682648101
                  </a>
                </li>
                <li>
                  <a href="mailto:info@example.com" style={{ color: "white" }}>
                    info@example.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="social-links">
              <ul className="clearfix">
                <li>
                  <Link to="/">
                    <span className="fab fa-twitter"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span className="fab fa-facebook-square"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span className="fab fa-pinterest-p"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span className="fab fa-instagram"></span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span className="fab fa-youtube"></span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
}
