import React, { useState, useEffect } from "react";
import Background from "../../assets/images/new-home/breadcrumb-img.jpg";
import footer from "../../assets/images/new-home/footer-location-img.jpg";
import skype from "../../assets/images/new-home/skype.png";
import wp from "../../assets/images/new-home/whatsapp.png";
import shape10 from "../../assets/images/shape/shape-10.jpg";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "../../components/PreLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stickey from "../../components/Stickey";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import {
  Image,
  Container,
  Col,
  Figure,
  Row,
  Form,
  Spinner,
} from "react-bootstrap";

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pharmaProducts, setPharmaProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
   const { productGroup } = useParams();
  const decodedProductGroup = decodeURIComponent(productGroup.replace(/-/g, ' '));
  console.log("decodedProductGroup", decodedProductGroup);

  const handleAddToCartClick = () => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero!");
      return;
    }
    setIsLoading(true);
    handleAddToCart().finally(() => {
      setIsLoading(false);
    });
  };

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

  const [productData, setProductData] = useState({
    ProductDetail2: "",
    ProductDetailLabel: "",
    Group: "",
    Quantity: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [desc, setDescription] = useState("");
  const [error, setError] = useState("");
  const handleQuantityChange = (e) => {
    const value = e.target.value;

    // Convert the input value to a number
    const numValue = Number(value);
    console.log("numValue", numValue);
    // Check if the value is a positive number
    // if (numValue > 0) {
    setQuantity(value);
    setError("");
    // } else {
    //   // Optionally, provide feedback to the user about the invalid input
    //   alert("Quantity must be a positive number.");
    // }
  };
  console.log("id", id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/areatype`
        );
        setPharmaProducts(response.data); // Assuming the data is an array of products
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  // Effect to filter products based on the URL parameter
  useEffect(() => {
    const product = pharmaProducts.find(
      (p) => p.ProductGroup === decodedProductGroup
    );

    console.log("productaaaaaaaaaaa", product);
    setSelectedProduct(product);
  }, [decodedProductGroup, pharmaProducts]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/projectdetail`
        );
        const allData = await response.json();
        console.log("allData", allData);
        const filteredData = allData.filter(
          (item) =>
            item.ProductDetail &&
            item.ProductDetail.ProductGroup === decodedProductGroup &&
            item.IsActive
        );
        console.log("filteredData", filteredData);
        setData(
          filteredData.sort((a, b) =>
            a.Description.localeCompare(b.Description)
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [decodedProductGroup]);

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

      let productIds = JSON.parse(localStorage.getItem("productIds")) || [];

      productIds.push(productId);

      localStorage.setItem("productIds", JSON.stringify(productIds));

      const storedProductIds = JSON.parse(localStorage.getItem("productIds"));
      console.log("inquiry product :", response);
      setQuantity(0);

      if (storedProductIds.includes(productId)) {
        setShow(false);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const productsByStartingLetter = data.reduce((acc, product) => {
    const startingLetter = product.Description[0];
    if (!acc[startingLetter]) {
      acc[startingLetter] = [];
    }
    acc[startingLetter].push(product);
    return acc;
  }, {});

  const productsStartingWithA = data.filter((product) =>
    product.Description.startsWith("A")
  );

  return (
    <React.Fragment
      style={{ position: "relative", minHeight: "100%", top: "0px" }}
    >
      <Helmet>
        <title>{selectedProduct?.metaTitle || "Default Product Title"}</title>
        <meta
          name="description"
          content={
            selectedProduct?.metaDescription || "Default Product Description"
          }
        />
        <meta
          name="keywords"
          content={selectedProduct?.metaKeywords || "Default,Product,Keywords"}
        />
        <meta
          property="og:title"
          content={selectedProduct?.metaTitle || "Default Product Title"}
        />
        <meta
          property="og:description"
          content={
            selectedProduct?.metaDescription || "Default Product Description"
          }
        />
        <meta
          property="og:image"
          content={selectedProduct?.metaImage || "default-image.jpg"}
        />
        <meta
          property="og:url"
          content={selectedProduct?.metaURL || window.location.href}
        />
        <link
          rel="canonical"
          href={window.location.href}
        />
      </Helmet>

      <Stickey />

      <ToastContainer />

      {!data || data?.length < 1 ? (
        <Preloader />
      ) : (
        <>
          <div className="boxed_wrapper">
            <section className="page-title">
              <div
                className="bg-layer"
                style={{ backgroundImage: `url(${Background})` }}
              ></div>
              <Container className="auto-container">
                <div className="content-box">
                  <h1>{decodedProductGroup}</h1>
                  <ul className="bread-crumb clearfix">
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Products</li>
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
                              type="text"
                              name="quantity"
                              required
                              placeholder="Enter Quantity"
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
                              onClick={handleAddToCartClick}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                "Add To Cart"
                              )}
                            </button>
                          </Col>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            {Object.entries(productsByStartingLetter).map(
              ([letter, products]) => {
                // let paddingValue = Math.max(5, products.length * 2);
                return (
                  <section
                    // style={{ padding: `${paddingValue}px`, paddingTop: "30px" }}
                    className="sidebar-page-container blog-large-image news-style-two sec-pad product-sec"
                  >
                    <Container className="auto-container">
                      <div className="pro-list">
                        <div className="sec-title">
                          <h3 className="title">Chemical By {letter}</h3>
                        </div>
                        <Row>
                          {products.map((item, index) => (
                            <div
                              key={index}
                              className={`col-lg-${
                                products.length === 1 ? "4" : "4"
                              } col-md-12 col-sm-12 content-side`}
                            >
                              <div className="news-block-one">
                                <div
                                  className="inner-box"
                                  style={{ boxShadow: "none" }}
                                >
                                  <a
                                    style={{ color: "red" }}
                                    className="text"
                                    href={`/productDetails/${item.Description.replace(/\s+/g, '-')}`}
                                    onClick={() =>
                                      localStorage.setItem(
                                        "description",
                                        item.Description
                                      )
                                    }
                                  >
                                    <h2
                                      style={{
                                        overflowWrap: "break-word",
                                        textTransform: "uppercase",
                                        color:
                                          item.ProductDetailDescription
                                            .length === 0
                                            ? "red"
                                            : "#16436f",
                                      }}
                                    >
                                      {item.Description}
                                    </h2>
                                  </a>
                                  <div className="lower-box ">
                                    <div className="link">
                                      <a
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#inquiryModal"
                                        onClick={() => {
                                          setShow(true);
                                          setname(item.Description);
                                          setid(item._id);
                                          setDescription(
                                            item.ProductDetail.ProductGroup
                                          );
                                        }}
                                      >
                                        Inquiry
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Row>
                      </div>
                    </Container>
                  </section>
                );
              }
            )}

            {/* <div
              className="modal fade"      
              id="inquiryModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Make Inquiry
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="contact-section">
                      <div className="form-inner">
                        <form
                          method="post"
                          action=""
                          id="contact-form"
                          novalidate="novalidate"
                        >
                          <div className="row clearfix">
                            <Col lg={12} md={6} sm={12} className="form-group">
                              <label>Product Name</label>
                              <input
                                type="text"
                                name="username"
                                placeholder="Product Name"
                                required=""
                                aria-required="true"
                              />
                            </Col>
                            <Col lg={6} md={6} sm={12} className="form-group">
                              <label>Quantity</label>
                              <input
                                type="number"
                                name="email"
                                required=""
                                placeholder="Quantity"
                                aria-required="true"
                              />
                            </Col>
                            <Col lg={6} md={6} sm={12} className="form-group">
                              <label>Select Grade</label>
                              <div className="select-box">
                                <select
                                  className="selectmenu"
                                  style={{ display: "none" }}
                                >
                                  <option selected="selected">
                                    Select Grade
                                  </option>
                                  <option>BP</option>
                                  <option>USP</option>
                                  <option>EP</option>
                                  <option>Other</option>
                                </select>
                                <div
                                  className="nice-select selectmenu"
                                  tabindex="0"
                                >
                                  <span className="current">Select Grade</span>
                                  <ul className="list">
                                    <li
                                      data-value="Select Grade"
                                      className="option selected"
                                    >
                                      Select Grade
                                    </li>
                                    <li data-value="BP" className="option">
                                      BP
                                    </li>
                                    <li data-value="USP" className="option">
                                      USP
                                    </li>
                                    <li data-value="EP" className="option">
                                      EP
                                    </li>
                                    <li data-value="Other" className="option">
                                      Other
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Col>
                            <Col
                              lg={12}
                              md={12}
                              sm={12}
                              className="form-group message-btn"
                            >
                              <button
                                type="submit"
                                className="theme-btn"
                                name="submit-form"
                              >
                                Send Message
                              </button>
                            </Col>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <section
              className="locations-section sec-pad text-center"
              style={{
                backgroundImage: `url(${shape10})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Container>
                <div className="sec-title">
                  <span className="sub-title">Locations</span>
                  <h2>
                    Support across 50+ countries <br />
                    around the world
                  </h2>
                </div>
                <Row className="clearfix justify-content-center">
                  <Col lg={6} md={6} sm={12} className="location-block mt-5">
                    <div className="location-block-one">
                      <div className="inner-box">
                        <Figure className="image-box">
                          <Image src={footer} alt="" fluid />
                        </Figure>
                        <h6>SHREEJI PHARMA INTERNATIONAL</h6>
                        <h3>
                          311, Atlantis Heights, Sarabhai Main Road, Vadiwadi,
                          Vadodara - 390 007, Gujarat, INDIA.
                        </h3>
                        <div className="custom-info">
                          <div className="link">
                            <Link to="mailto:contact@shreejipharma.com">
                              Email : contact@shreejipharma.com
                              <i className="flaticon-right-arrow"></i>
                            </Link>
                          </div>
                          <div className="link">
                            <Link to="tel:8866002331">
                              Contact : +91 8866002331
                              <i className="flaticon-right-arrow"></i>
                            </Link>
                          </div>
                          <div className="link">
                            <Link to="tel:8866002331">
                              Landline : 0265 3504578
                              <i className="flaticon-right-arrow"></i>
                            </Link>
                          </div>
                          <div className="link">
                            <Link to="skype:Nilesh.sheth70?Chat">
                              Skype ID: Nilesh.sheth70
                              <i className="flaticon-right-arrow"></i>
                            </Link>
                          </div>
                          <div className="link">
                            <Link
                              onClick={() => setShowModal(true)}
                              style={{ color: "#16436f" }}
                            >
                              Locate Us
                              <i className="flaticon-right-arrow"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            {/* <div className="sticky-button">
              <Link
                to="assets/catalogue-shreeji-pharma.pdf"
                target="__blank"
                download=""
              >
                Download Brochure
              </Link>
            </div> */}
            {/* <div className="sticky-whatsapp">
              <Link
                to="https://api.whatsapp.com/send?phone=918866002331&amp;text= Hello Shreeji Pharma Team, I am interested in -"
                target="_blank"
              >
                <Image src={wp} className="img-responsive" alt="WhatsApp" />
              </Link>
            </div> */}
            {/* <div className="sticky-skype">
              <Link to="skype:Nilesh.sheth70?Call" target="_blank">
                <Image src={skype} className="img-responsive" alt="Skype" />
              </Link>
            </div> */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Vadiwadi, Vadodara</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7381.956093641144!2d73.167648!3d22.31667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf6c89cabb19%3A0xf803cbcf27adf1aa!2sShreeji%20Pharma%20International!5e0!3m2!1sen!2sus!4v1712310707767!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Modal.Body>
            </Modal>
          </div>
          {/* <button
            className={`scroll-top scroll-to-target ${isVisible ? "open" : ""}`}
            onClick={scrollToTop}
            style={{ display: isVisible ? "block" : "none" }}
          >
            <i className="flaticon-up-arrow"></i>
          </button> */}
        </>
      )}
    </React.Fragment>
  );
}
