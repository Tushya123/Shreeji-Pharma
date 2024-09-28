import React, { useState, useEffect } from "react";
import Background from "../../assets/images/new-home/breadcrumb-img.jpg";
import footer from "../../assets/images/new-home/footer-location-img.jpg";
import skype from "../../assets/images/new-home/skype.png";
import wp from "../../assets/images/new-home/whatsapp.png";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "./SearchProvider";
import { Container, Form, Col } from "react-bootstrap";
import Stickey from "../../components/Stickey";

export default function Search() {
  const [productData, setProductData] = useState({
    ProductDetail2: "",
    ProductDetailLabel: "",
    Group: "",
    Quantity: "",
  });
  const navigate = useNavigate();
  const { searchQuery, productsData } = useSearch();
  const [dataInfo, setDataInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [desc, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  console.log("productsData", productsData);
  useEffect(() => {
    setProductData({
      Quantity: quantity,
      Group: desc,
      ProductDetailLabel: name,
      ProductDetail2: id,
    });
  }, [quantity, desc, name, id]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/InquiryProduct`,
        productData
      );

      if (!response.data || !response.data.data || !response.data.data._id) {
        throw new Error("Invalid response from the server");
      }

      const productId = response.data.data._id;
      console.log("Product ID from response:", productId);

      let productIds = JSON.parse(localStorage.getItem("productIds")) || [];
      console.log("Current product IDs in localStorage:", productIds);

      productIds.push(productId);
      console.log("Updated product IDs:", productIds);

      localStorage.setItem("productIds", JSON.stringify(productIds));
      console.log("Updated product IDs saved to localStorage");

      const storedProductIds = JSON.parse(localStorage.getItem("productIds"));
      console.log("Verified product IDs in localStorage:", storedProductIds);

      setQuantity(0);

      if (storedProductIds.includes(productId)) {
        setShow(false);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    console.log(productsData);
    if (productsData && productsData.length > 0 && productsData[0].data) {
      setDataInfo(productsData[0].data);
    }
  }, [productsData]);

  function setDesc(item, item2) {
    localStorage.setItem("description", item);
    localStorage.setItem("selectedProductId", item2);
    console.log("item", item);
    navigate("/productDetails");
  }
  console.log("dataInfo", dataInfo);

  return (
    <React.Fragment
      style={{ position: "relative", minHeight: "100%", top: "0px" }}
    >
      <Stickey />
      <div className="boxed_wrapper">
        <section className="page-title">
          <div
            className="bg-layer"
            style={{ backgroundImage: `url(${Background})` }}
          ></div>
          <Container className="auto-container">
            <div className="content-box">
              <h1>Search Result</h1>
              <ul className="bread-crumb clearfix">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Search</li>
              </ul>
            </div>
          </Container>
        </section>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Make Inquiry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body">
              <div className="contact-section new">
                <div className="form-inner">
                  <Form id="contact-form" noValidate>
                    <div className="row clearfix">
                      <Col lg={12} md={6} sm={12} className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          name="username"
                          placeholder="Product Name Here"
                          required
                          isDisabled={true}
                          value={name}
                          aria-required="true"
                        />
                      </Col>
                      <Col lg={12} md={6} sm={12} className="form-group">
                        <label>Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          required
                          placeholder="Enter Quantity"
                          aria-required="true"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </Col>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="form-group message-btn text-center"
                      >
                        <button
                          type="button"
                          className="theme-btn"
                          onClick={handleAddToCart}
                        >
                          Add To Cart
                        </button>
                      </Col>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <section
          className="new-prod sidebar-page-container blog-large-image news-style-two product-sec"
          style={{ padding: "40px 0px" }}
        >
          <Container className="auto-container">
            <div className="pro-list">
              <div className="sec-title">
                <h3 className="title">Search results for: "{searchQuery}"</h3>
              </div>
              <div className="title">
                <div
                  className="title-cat"
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  <h6
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      padding: "10px",
                      color: "#16436f",
                    }}
                  ></h6>
                </div>
              </div>
              <div className="row">
                {productsData.length > 0 ? (
                  productsData[0].data.length > 0 ? (
                    productsData[0].data.map((product, index) => (
                      <Col
                        lg={3}
                        md={12}
                        sm={12}
                        className="content-side"
                        key={index}
                      >
                        <div className="news-block-one">
                          <div
                            className="inner-box"
                            style={{ boxShadow: "none" }}
                          >
                            <Link
                              className="text"
                              onClick={() =>
                                setDesc(
                                  product.Description,
                                  product.ProductDetailTypes[0].ProductGroup
                                )
                              }
                              to="/productDetails"
                            >
                              <h2>{product.Description}</h2>
                            </Link>
                            <div className="lower-box">
                              <div className="link">
                                <button
                                  style={{
                                    fontSize: "16px",
                                    color: "#16436f",
                                    fontWeight: "600",
                                  }}
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#inquiryModal"
                                  onClick={() => {
                                    setShow(true);
                                    setname(product.Description);
                                    setid(product._id);
                                    setDescription(
                                      product.ProductDetail.ProductGroup
                                    );
                                  }}
                                >
                                  Inquiry
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <p>No products found.</p>
                  )
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section className="locations-section sec-pad centred">
          <div className="pattern-layer"></div>
          <div className="auto-container">
            <div className="sec-title">
              <span className="sub-title">Locations</span>
              <h2>
                Support across 50+ countries <br />
                around the world
              </h2>
            </div>
            <div className="row clearfix justify-content-center">
              <div className="col-lg-6 col-md-6 col-sm-12 location-block mt-5">
                <div className="location-block-one">
                  <div className="inner-box">
                    <figure className="image-box">
                      <img src={footer} alt="" />
                    </figure>
                    <h6>SHREEJI PHARMA INTERNATIONAL</h6>
                    <h3>
                      311, Atlantis Heights, Sarabhai Main Road, Vadiwadi,
                      Vadodara - 390 007, Gujarat, INDIA.
                    </h3>
                    <div className="custom-info">
                      <div className="link">
                        <a href="mailto:contact@shreejipharma.com">
                          Email : contact@shreejipharma.com
                          <i className="flaticon-right-arrow"></i>
                        </a>
                      </div>
                      <div className="link">
                        <a href="tel:8866002331">
                          Contact : +91 8866002331{" "}
                          <i className="flaticon-right-arrow"></i>
                        </a>
                      </div>
                      <div className="link">
                        <Link to="tel:8866002331">
                          Landline : 0265 3504578
                          <i className="flaticon-right-arrow"></i>
                        </Link>
                      </div>
                      <div className="link">
                        <a href="skype:Nilesh.sheth70?Chat">
                          Skype ID: Nilesh.sheth70{" "}
                          <i className="flaticon-right-arrow"></i>
                        </a>
                      </div>
                    </div>
                    <div className="link">
                      <a
                        href="#"
                        target="_blank"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModa"
                      >
                        Locate Us <i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="sticky-button">
          <a
            href="assets/catalogue-shreeji-pharma.pdf"
            target="__blank"
            download=""
          >
            Download Brochure
          </a>
        </div> */}
        {/* <div className="sticky-whatsapp">
          <a
            href="https://api.whatsapp.com/send?phone=918866002331&amp;text= Hello Shreeji Pharma Team, I am interested in -"
            target="_blank"
          >
            <img src={wp} className="img-responsive" />
          </a>
        </div>
        <div className="sticky-skype">
          <a href="skype:Nilesh.sheth70?Call" target="_blank">
            <img src={skype} className="img-responsive" />
          </a>
        </div> */}
      </div>
      {/* <button 
          className={`scroll-top scroll-to-target ${isVisible ? "open" : ""}`}
          onClick={scrollToTop}
          style={{ display: isVisible ? "block" : "none" }}>
        <i className="flaticon-up-arrow"></i>
      </button> */}
    </React.Fragment>
  );
}
