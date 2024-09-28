import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/new-home/logo1.png";
import Background from "../../assets/images/new-home/breadcrumb-img.jpg";
import skype from "../../assets/images/new-home/skype.png";
import wp from "../../assets/images/new-home/whatsapp.png";
import html2canvas from "html2canvas";
import axios from "axios";
import { Container, Row, Table, Figure, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import doc from "../../assets/images/unnamed.jpg";
import Stickey from "../../components/Stickey";

export default function ProductsDetails() {
  const { id } = useParams();
  const decodedId = id.replace(/-/g, ' ');
  const [productDetailsss, setProductDetails] = useState(null);
  const [isHidden, setIsHidden] = useState(true);
  const [prod, setProd] = useState([]);
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

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/productdetail/${decodedId}`
      )
      .then((response) => {
        console.log("Product details response:", response);
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    const storedProductIds = localStorage.getItem("productIds");
    if (storedProductIds) {
      setProd(JSON.parse(storedProductIds));
    }
  }, [localStorage.getItem("productIds")]);

  const generatePdf = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/download-pdf`,
        { ...productDetailsss },
        {
          responseType: "blob",
          crossOrigin: true,
        }
      )
      .then((response) => {
        console.log("response", response);
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "brochure.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Cleanup after download
      })
      .catch((error) => {
        console.error("Error generating PDF: ", error);
      });
  };

 

  return (
    <React.Fragment
      style={{ position: "relative", minHeight: "100%", top: "0px" }}
    >
      {productDetailsss && (
  <Helmet>
    <title>{productDetailsss.metaTitle}</title>
    <meta name="description" content={productDetailsss.metaDescription} />
    <meta name="keywords" content={productDetailsss.metaKeywords} />
    <meta property="og:title" content={productDetailsss.metaTitle} />
    <meta property="og:description" content={productDetailsss.metaDescription} />
    <meta property="og:image" content={productDetailsss.metaImage} />
    <meta property="og:url" content={productDetailsss.metaURL} />
    <link rel="canonical" href={window.location.href} />
  </Helmet>
)}
      <Stickey />
      <div className="boxed_wrapper">
        <section className="page-title">
          <div
            className="bg-layer"
            style={{ backgroundImage: `url(${Background})` }}
          ></div>
          <Container className="auto-container">
            <div className="content-box">
              <h1>
                {" "}
                {productDetailsss ? productDetailsss.Description : "Loading..."}
              </h1>
              <ul className="bread-crumb clearfix">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>{id}</li>
              </ul>
            </div>
          </Container>
        </section>
        <section className="sidebar-page-container blog-details sec-pad pro-det ptb-60">
          <Container className="auto-container">
            <Row className="clearfix">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="content-side"
                id="pdf-content"
              >
                <div className="blog-details-content">
                  <div className="content-one row mb-0">
                    <div
                      className={`col-lg-12 col-12 ${isHidden ? "hidden" : ""}`}
                    >
                      <div className="sec-title">
                        <Link to="/">
                          <img style={{ height: "10vh" }} src={logo} alt="" />
                        </Link>
                        <div className="btn-box">
                          <h6 style={{ color: "16436f" }}>
                            Shreeji Pharma International
                          </h6>
                          <li className="custom-border">
                            <h6 style={{ color: "16436f" }}>
                              contact@shreejipharma.com
                            </h6>
                          </li>
                          <li className="support-box custom-border1">
                            <h6>+918866002331</h6>
                          </li>
                        </div>
                      </div>
                    </div>
                    <Col lg={12}>
                      <Row className="justify-content-center">
                        <Col lg={12} className="product-image-banner">
                          <figure className="image-box">
                            {productDetailsss && (
                              <img
                                style={{ height: "170px" }}
                                src={
                                  productDetailsss.ImageUrl
                                    ? `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${productDetailsss.ImageUrl}`
                                    : doc
                                }
                                onLoad={() =>
                                  console.log("Image loaded successfully")
                                }
                                onError={() =>
                                  console.error("Error loading image")
                                }
                              />
                            )}
                          </figure>
                        </Col>
                        <Row>
                          <Col
                            lg={7}
                            className=" mt-4 product-name align-items-center d-flex"
                          >
                            <h3 className="producttext">{id}</h3>
                          </Col>
                        </Row>
                        {/* <div className="col-lg-5 col-12 text-right mt-4"></div> */}
                      </Row>
                    </Col>
                    <Col lg={12} className="mt-4">
                      <div className="table-outer product-detail-table">
                        <Table responsive className="cart-table">
                          <thead className="cart-header">
                            <tr style={{ padding: "0px" }}>
                              <th>Name</th>
                              <th>Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productDetailsss &&
                              productDetailsss.ProductDetailDescription.map(
                                (detail, index) => (
                                  <tr key={index}>
                                    <td>{detail.ProductKey}</td>
                                    <td className="prod-column">
                                      <h5>{detail.ProductValue}</h5>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </div>
                </div>
              </Col>
              <div className="btn-box clearfix mt-5 text-center">
                <button
                  className="checkout-btn theme-btn responsive"
                  onClick={generatePdf}
                >
                  Download Brochure
                </button>
              </div>
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
            <img src={wp} className="img-responsive" />
          </Link>
        </div>
        <div className="sticky-skype">
          <Link to="skype:Nilesh.sheth70?Call" target="_blank">
            <img src={skype} className="img-responsive" />
          </Link>
        </div> */}

        {/* <button
          className={`scroll-top scroll-to-target ${isVisible ? "open" : ""}`}
          onClick={scrollToTop}
          style={{ display: isVisible ? "block" : "none" }}
        >
          <i className="flaticon-up-arrow"></i>
        </button> */}
      </div>
    </React.Fragment>
  );
}