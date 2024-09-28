import React, { useEffect, useState } from "react";
import axios from "axios";
import Background from "../assets/images/new-home/breadcrumb-img.jpg";
import { Container, Figure, Image, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Preloader from "../components/PreLoader";
import shape10 from "../assets/images/shape/shape-10.jpg";
import footer from "../assets/images/new-home/footer-location-img.jpg";
import skype from "../assets/images/new-home/skype.png";
import wp from "../assets/images/new-home/whatsapp.png";
import Stickey from "../components/Stickey";
import { Helmet } from "react-helmet";

export default function Commitment() {
  const [commitments, setCommitments] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/Commitment`
        );
        const activeCommitments = res.data.filter(
          (commitment) => commitment.IsActive
        );
        console.log("activeCommitments", activeCommitments);
        setCommitments(activeCommitments);
      } catch (error) {
        console.error("Error fetching commitments:", error);
      }
    };
    fetchData();
  }, []);

  const metaTitle = commitments.length > 0 ? commitments[0].metaTitle : "Default Title";
  const metaDescription = commitments.length > 0 ? commitments[0].metaDescription : "Default Description";
  const metaKeywords = commitments.length > 0 ? commitments[0].metaKeywords : "Default Keywords";
  const metaImage = commitments.length > 0 ? commitments[0].metaImage : "default-image.jpg";
  const metaURL = commitments.length > 0 ? commitments[0].metaURL : "https://default-url.com";

  return (
    <React.Fragment>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaURL} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Stickey />
      {!commitments || commitments.length < 1 ? (
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
                  <h1>Commitment And Approach</h1>
                  <ul className="bread-crumb clearfix">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>Commitment</li>
                  </ul>
                </div>
              </Container>
            </section>
            <section className="shop-details commitment">
              <Container className="auto-container">
                <div className="product-discription mb-0">
                  <div className="customer-comment mb-0">
                    <Row className="clearfix justify-content-center">
                      {commitments.map((commitment, index) => {
                        const colClass =
                          index % 4 === 0 || index % 4 === 3
                            ? "col-lg-7 col-md-8 col-sm-12 comment-column"
                            : "col-lg-5 col-md-8 col-sm-12 comment-column";
                        return (
                          <div key={index} className={colClass}>
                            <div className="single-comment-box">
                              <div className="inner-box">
                                <Figure className="comment-thumb">
                                  <Image
                                    src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${commitment.CommitmentImage}`}
                                    alt={`Commitment ${index}`}
                                  />
                                </Figure>
                                <div className="inner">
                                  <h3>{commitment.Title}</h3>
                                  <p>{commitment.Description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Row>
                  </div>
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