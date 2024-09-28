import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Background from "../assets/images/new-home/breadcrumb-img.jpg";
import footer from "../assets/images/new-home/footer-location-img.jpg";
import skype from "../assets/images/new-home/skype.png";
import wp from "../assets/images/new-home/whatsapp.png";
import shape10 from "../assets/images/shape/shape-10.jpg";
import axios from "axios";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Image,
  Figure,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Preloader from "../components/PreLoader";
import Stickey from "../components/Stickey";

export default function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/Certificate`
        );
        const activeCertificates = response.data.filter(
          (cert) => cert.IsActive
        );
        setCertificates(activeCertificates);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };
    fetchData();
  }, []);

  const handleZoomInClick = (certificateImage) => {
    setSelectedCertificate(certificateImage);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  const metaTitle = certificates.length > 0 ? certificates[0].metaTitle : "Certificate - Shreeji Pharma";
  console.log("metaTitle", metaTitle);
  const metaDescription = certificates.length > 0 ? certificates[0].metaDescription : "View our certificates and accreditations at Shreeji Pharma.";
  console.log("metaDescription", metaDescription);
  const metaKeywords = certificates.length > 0 ? certificates[0].metaKeywords : "Shreeji Pharma, Certificates, Accreditations";
  console.log("metaKeywords", metaKeywords);
  const metaImage = certificates.length > 0 ? certificates[0].metaImage : "default-image.jpg";
  console.log("metaImage", metaImage);
  const metaURL = certificates.length > 0 ? certificates[0].metaURL : "https://default-url.com";
  console.log("metaURL", metaURL);

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
      {!certificates.length ? (
        <Preloader />
      ) : (
        <>
          <div className="boxed_wrapper">
            <section
              className="page-title"
              style={{ backgroundImage: `url(${Background})` }}
            >
              <Container className="auto-container">
                <div className="content-box">
                  <h1>Certificate</h1>
                  <ul className="bread-crumb clearfix">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>Certificate</li>
                  </ul>
                </div>
              </Container>
            </section>
            <section className="service-details sec-pad">
              <Container>
                <Row className="clearfix">
                  {certificates.map((item, index) => (
                    <Col
                      key={index}
                      lg={3}
                      md={6}
                      sm={12}
                      className="project-block gallery"
                    >
                      <div className="project-block-one">
                        <div className="inner-box">
                          <div className="static-content">
                            <Figure className="image-box">
                              <Image
                                src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${item.CertificateImage}`}
                                alt={`Certificate ${item.Title}`}
                                fluid
                                onClick={() =>
                                  handleZoomInClick(item.CertificateImage)
                                }
                              />
                            </Figure>
                            <div className="text-center">
                              <h5 className="gal-txt">{item.Title}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            </section>
            <Modal show={!!selectedCertificate} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>View Certificate</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedCertificate && (
                  <Image
                    src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${selectedCertificate}`}
                    alt="Selected Certificate"
                    style={{ width: "100%" }}
                    fluid
                  />
                )}
              </Modal.Body>
            </Modal>
          </div>
        </>
      )}
    </React.Fragment>
  );
}