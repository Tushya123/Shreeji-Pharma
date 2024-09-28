import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Figure } from "react-bootstrap";
import Background from "../assets/images/new-home/breadcrumb-img.jpg";
import footer from "../assets/images/new-home/footer-location-img.jpg";
import skype from "../assets/images/new-home/skype.png";
import wp from "../assets/images/new-home/whatsapp.png";
import Background1 from "../assets/images/background/funfact-bg.jpg";
import axios from "axios";
import shape10 from "../assets/images/shape/shape-10.jpg";
import { Link } from "react-router-dom";
import Preloader from "../components/PreLoader";
import { Modal } from "react-bootstrap";
import Stickey from "../components/Stickey";
import { Helmet } from "react-helmet";

export default function About() {
  const [cmsDesc, setcmsDesc] = useState("");
  const [title, setTitle] = useState("");
  const [cmsImage, setcmsImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [metaImage, setMetaImage] = useState("");
  const [metaUrl, setMetaUrl] = useState("");

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
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/cms`
        );
        console.log(res);
        const data = res.data.find(
          (entry) => entry._id === "663f4d5fef85cf304603e082"
        );
        console.log("sssssssss", data);
        setcmsDesc(data.cmsDesc);
        setTitle(data.Title);
        setcmsImage(data.cmsImage);
        setMetaTitle(data.metaTitle);
        setMetaDescription(data.metaDescription);
        setMetaKeywords(data.metaKeywords);
        setMetaImage(data.metaImage);
        setMetaUrl(data.metaUrl);
      } catch (error) {
        console.error("Error fetching about us data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment
      style={{ position: "relative", minHeight: "100%", top: "0px" }}
    >
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Stickey />
      {!cmsDesc || cmsDesc?.length < 1 ? (
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
                  <h1>About Us</h1>
                  <ul className="bread-crumb clearfix">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>About Us</li>
                  </ul>
                </div>
              </Container>
            </section>
            <section className="about-section sec-pad">
              <Container>
                <Row className="clearfix justify-content-center">
                  <Col lg={6} md={8} sm={12} className="image-column">
                    <div className="image-box">
                      <div className="shape-box">
                        <div className="shape shape-1 hexagon_shape"></div>
                        <div className="shape shape-2 hexagon_shape"></div>
                        <div className="shape shape-3 hexagon_shape"></div>
                      </div>
                      <div className="image-inner hexagon_shape">
                        <Figure className="image">
                          <Image
                            src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${cmsImage}`}
                            alt=""
                            fluid
                          />
                        </Figure>
                      </div>
                      <div className="text">
                        <div className="inner">
                          <h2>
                            20<span>+</span>
                          </h2>
                          <h6>
                            Years of <br />
                            Experience
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} md={12} sm={12} className="content-column">
                    <div className="content-box">
                      <div className="sec-title">
                        <span className="sub-title">
                          Welcome to Shreeji Pharma International
                        </span>
                        <h2>About US</h2>
                      </div>
                      <div className="text">
                        {React.createElement("div", {
                          dangerouslySetInnerHTML: {
                            __html: `${cmsDesc}<style>p{font-size:19px;font-weight:400}`,
                          },
                        })}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="funfact-section text-center">
              <div
                className="bg-layer"
                style={{ backgroundImage: `url(${Background1})` }}
              ></div>
              <Container>
                <div className="sec-title text-light">
                  <span className="sub-title">Interesting Numbers</span>
                  <h2 style={{ color: "white" }}>
                    Facts that will blow your mind
                  </h2>
                </div>
                <div className="inner-content">
                  <Row className="clearfix">
                    <Col lg={4} md={6} sm={12} className="funfact-block mb-4">
                      <div className="funfact-block-one">
                        <div className="inner-box">
                          <div className="icon-box">
                            <i className="flaticon-rating"></i>
                          </div>
                          <div className="count-outer count-box counted">
                            <span
                              className="count-text"
                              data-speed="1500"
                              data-stop="1000"
                            >
                              1000+
                            </span>
                          </div>
                          <h3>Our Happy Clients</h3>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={12} className="funfact-block mb-4">
                      <div className="funfact-block-one">
                        <div className="inner-box">
                          <div className="icon-box">
                            <i className="flaticon-atom"></i>
                          </div>
                          <div className="count-outer count-box counted">
                            <span
                              className="count-text"
                              data-speed="1500"
                              data-stop="100"
                            >
                              100+
                            </span>
                          </div>
                          <h3>Our Quality Products</h3>
                        </div>
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={12} className="funfact-block mb-4">
                      <div className="funfact-block-one">
                        <div className="inner-box">
                          <div className="icon-box">
                            <i className="flaticon-lab"></i>
                          </div>
                          <div className="count-outer count-box counted">
                            <span
                              className="count-text"
                              data-speed="1500"
                              data-stop="100"
                            >
                              100
                            </span>
                            <span>%</span>
                          </div>
                          <h3>Accurate and Precise in Test Results</h3>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            </section>
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
        </>
      )}
    </React.Fragment>
  );
}
