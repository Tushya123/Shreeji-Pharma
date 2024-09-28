import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Modal,
  Button,
  Figure,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import Background from "../../assets/images/new-home/breadcrumb-img.jpg";
import skype from "../../assets/images/new-home/skype.png";
import wp from "../../assets/images/new-home/whatsapp.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Preloader from "../../components/PreLoader";
import Stickey from "../../components/Stickey";

export default function NewsDetails() {
  const [BlogsList, setBlogsList] = useState([]);
  const [blogDetails, setBlogDetails] = useState(null);
  const [blogDetails1, setBlogDetails1] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true); // Start loading

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/Blog`
        );
        console.log("nice:", response);
        setBlogsList(response.data);
        setIsLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false); // Stop loading on error
      }
    };
    const fetchData1 = async () => {
      try {
        setIsLoading(true); // Start loading

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/Newsletter`
        );
        console.log("nice:", response);
        setBlogDetails1(response.data);
        setIsLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false); // Stop loading on error
      }
    };

    fetchData();
    fetchData1();
  }, []);

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/get/Newsletter/${id}`
        );
        console.log("this is", response);
        setBlogDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Blogs data:", error);
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!blogDetails) {
    return <div>No blog data available</div>;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{blogDetails.Title} - Shreeji Pharma</title>
        <meta name="description" content={blogDetails.Description} />
        <meta name="keywords" content="Pharmacy, News, Blog, Shreeji Pharma" />
        {/* <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://example.com/blogs/${id}`,
            },
            headline: blogDetails?.Title,
            image: [
              `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${blogDetails?.NewsletterImage}`,
            ],
            datePublished: blogDetails?.PublishDate,
            dateModified: blogDetails?.LastUpdated,
            author: {
              "@type": "Organization",
              name: "Shreeji Pharma International",
            },
            publisher: {
              "@type": "Organization",
              name: "Shreeji Pharma International",
              logo: {
                "@type": "ImageObject",
                url: "https://example.com/logo.png",
              },
            },
            description: blogDetails?.Description,
          })}
        </script> */}
      </Helmet>
      <Stickey />
      <div className="boxed_wrapper">
        <section className="page-title">
          <div
            className="bg-layer"
            style={{ backgroundImage: `url(${Background})` }}
          ></div>
          <Container>
            <div className="content-box">
              <h1>{blogDetails.Title}</h1>
              <ul className="bread-crumb clearfix">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>News</li>
                {/* <li>{Blogs.Title}</li> */}
              </ul>
            </div>
          </Container>
        </section>
        <section className="sidebar-page-container Blogs-details sec-pad">
          <Container>
            <Row>
              <Col lg={8} md={12} sm={12} className="content-side">
                <div className="Blogs-details-content">
                  <div className="content-one">
                    <Figure className="image-box">
                      <Image
                        src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${blogDetails.NewsletterImage}`}
                        alt=""
                        fluid
                      />
                    </Figure>
                  </div>
                  <div className="content-four pb-5">
                    <h2>{blogDetails.Title}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blogDetails.Description,
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col lg={4} md={12} sm={12} className="sidebar-side">
                <div className="blog-sidebar">
                  <div className="sidebar-widget category-widget">
                    <div className="widget-title">
                      <h3>News</h3>
                    </div>
                    <div className="widget-content">
                      <ul className="category-list clearfix">
                        {blogDetails1.map((blog) => (
                          <li key={blog._id}>
                            <Link to={`/detailNews/${blog._id}`}>
                              {blog.Title}
                              <i className="flaticon-right-arrow"></i>
                            </Link>
                          </li>
                        ))}
                      </ul>
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
          <Image src={wp} className="img-responsive" />
        </Link>
      </div>
      <div className="sticky-skype">
        <Link to="skype:Nilesh.sheth70?Call" target="_blank">
          <Image src={skype} className="img-responsive" />
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
