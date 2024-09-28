import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Background from "../assets/images/new-home/breadcrumb-img.jpg";
import Stickey from "../components/Stickey";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function ImageView() {
  const { index } = useParams();
  const [galleryData, setGalleryData] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts

    const fetchGalleryData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/GalleryPhoto`);
        const data = response.data.filter(item => item.IsActive && item.Category === index);
        setGalleryData(data);
        if (data.length > 0 && data[0].GalleryTypeDetails.length > 0) {
          setCategory(data[0].GalleryTypeDetails[0].Category);
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        navigate('/error');
      }
    };

    fetchGalleryData();
  }, [index, navigate]);

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const metaTitle = galleryData.length > 0 ? galleryData[0].metaTitle : "Gallery - Image View";
  const metaDescription = galleryData.length > 0 ? galleryData[0].metaDescription : "View images from the gallery.";
  const metaKeywords = galleryData.length > 0 ? galleryData[0].metaKeywords : "gallery, images, view, zoom";
  const metaImage = galleryData.length > 0 ? galleryData[0].metaImage : Background;
  const metaURL = galleryData.length > 0 ? galleryData[0].metaURL : window.location.href;

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
      <div className="boxed_wrapper">
        <section className="page-title" style={{ backgroundImage: `url(${Background})` }}>
          <Container>
            <div className="content-box">
              <h1>{category ? `${category}` : "Gallery"}</h1>
              <ul className="bread-crumb clearfix">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
              </ul>
            </div>
          </Container>
        </section>

        <section style={{ padding: "30px 0" }}>
          <Container>
            <Row>
              {galleryData.map((item, index) => (
                <Col md={4} key={index} style={{ marginBottom: "30px" }}>
                  <div 
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onClick={() => handleImageClick(index)}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1.00)"}
                  >
                    <Image
                      src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${item.imageURL}`}
                      alt={item.Category}
                      className="img-fluid"
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        {lightboxOpen && (
          <Lightbox
            mainSrc={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${galleryData[lightboxIndex].imageURL}`}
            nextSrc={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${galleryData[(lightboxIndex + 1) % galleryData.length].imageURL}`}
            prevSrc={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${galleryData[(lightboxIndex + galleryData.length - 1) % galleryData.length].imageURL}`}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() => setLightboxIndex((lightboxIndex + galleryData.length - 1) % galleryData.length)}
            onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % galleryData.length)}
          />
        )}
      </div>
    </React.Fragment>
  );
}