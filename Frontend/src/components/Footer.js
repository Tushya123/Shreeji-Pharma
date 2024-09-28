import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Figure, Row, Col, Container } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Helmet } from "react-helmet";

export default function Footer() {
  const [cmsDesc, setcmsDesc] = useState("");
  const [galleryData, setGalleryData] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/GalleryPhoto`
        );
        setGalleryData(response.data);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/cms`
        );
        const data = res.data.find(
          (entry) => entry._id === "663f0071ef85cf304603e046"
        );
        setcmsDesc(data.cmsDesc);
      } catch (error) {
        console.error("Error fetching about us data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      
      <footer className="main-footer footer-style-two ">
        <Container>
          <div className="widget-section">
            <Row className="clearfix">
              <Col
                lg={5}
                md={7}
                sm={12}
                className="mb-4"
                style={{ paddingLeft: "0px" }}
              >
                <div className="footer-widget about-widget">
                  <div className="widget-title">
                    <h3>About Us</h3>
                  </div>
                  <div className="text" style={{ marginBottom: "-12px" }}>
                    {React.createElement("div", {
                      dangerouslySetInnerHTML: {
                        __html: `${cmsDesc}<style>p{font-size:19px;font-weight:400}`,
                      },
                    })}
                  </div>
                  <div className="lower-box d-flex align-items-center mt-3">
                    <div className="icon-box me-2">
                      <i className="flaticon-atom-1"></i>
                    </div>
                    <h5 className="mb-0">ISO 9001-2015 Certified</h5>
                  </div>
                </div>
              </Col>
              <Col lg={3} md={5} sm={12} className="mb-4">
                <div className="footer-widget links-widget">
                  <div className="widget-title">
                    <h3>Quick Links</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="links-list list-unstyled">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/commitment">Commitment</Link>
                      </li>
                      <li>
                        <Link to="/products/Active-Pharmaceutic-Ingredients">Products</Link>
                      </li>
                      <li>
                        <Link to="/certificate">Certificate</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={12} sm={12} className="mb-4">
                <div className="footer-widget gallery-widget">
                  <div className="widget-title">
                    <h3>Gallery</h3>
                  </div>
                  <div className="widget-content">
                    <ul className="image-list list-unstyled d-flex flex-wrap">
                      {galleryData.slice(0, 12).map((item, index) => (
                        <li key={index} className="me-2 mb-2">
                          <Figure
                            className="image mb-0"
                            style={{ border: "1px solid #1C2A4D" }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${item.imageURL}`}
                              alt=""
                              className="img-fluid"
                            />
                            <Link
                              onClick={() => {
                                setLightboxOpen(true);
                                setLightboxIndex(index);
                              }}
                            >
                              <i className="flaticon-zoom-in"></i>
                            </Link>
                          </Figure>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="footer-bottom py-0">
            <Row className="footerBottomRow">
              <Col
                lg={6}
                md={6}
                className="text-lg-start text-center mb-3 mb-lg-0"
              >
                <div className="copyright">
                  <p className="mb-0 copyrightTitle">
                    Copyright © 2024 <a href="#">Shreeji Pharma </a> All Rights
                    Reserved
                  </p>
                </div>
              </Col>
              <Col lg={6} md={6} className="text-lg-end text-center">
                <div className="copyright">
                  <p className="mb-0 copyrightTitle">
                    Powered By{" "}
                    <a
                      href="https://www.barodaweb.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Barodaweb | The E-Catalouge Designer
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </footer>

      {lightboxOpen && (
        <Lightbox
          mainSrc={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${galleryData[lightboxIndex].imageURL}`}
          nextSrc={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${
            galleryData[(lightboxIndex + 1) % galleryData.length].imageURL
          }`}
          prevSrc={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${
            galleryData[
              (lightboxIndex + galleryData.length - 1) % galleryData.length
            ].imageURL
          }`}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() =>
            setLightboxIndex(
              (lightboxIndex + galleryData.length - 1) % galleryData.length
            )
          }
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % galleryData.length)
          }
        />
      )}

      <Button className="scroll-top scroll-to-target" data-target="html">
        <i className="flaticon-up-arrow"></i>
      </Button>
    </React.Fragment>
  );
}
