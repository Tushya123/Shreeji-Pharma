import React, { useState, useEffect } from "react";
import logo from "../assets/images/new-home/logo.png";
import Background from "../assets/images/new-home/breadcrumb-img.jpg";
import footer from "../assets/images/new-home/footer-location-img.jpg";
import skype from "../assets/images/new-home/skype.png";
import wp from "../assets/images/new-home/whatsapp.png";
import Header from "../components/Header";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from "react-bootstrap";
import Preloader from "../components/PreLoader";
import Stickey from "../components/Stickey";
import { Helmet } from "react-helmet";

const countriesArray = [
  { label: "DZ", value: "ALGERIA" },
  { label: "AR", value: "ARGENTINA" },
  { label: "AU", value: "AUSTRALIA" },
  { label: "BD", value: "BANGLADESH" },
  { label: "BE", value: "BELGIUM" },
  { label: "BR", value: "BRAZIL" },
  { label: "CA", value: "CANADA" },
  { label: "CN", value: "CHINA" },
  { label: "EG", value: "EGYPT" },
  { label: "FR", value: "FRANCE" },
  { label: "DE", value: "GERMANY" },
  { label: "IN", value: "INDIA" },
  { label: "IL", value: "ISRAEL" },
  { label: "IT", value: "ITALY" },
  { label: "JP", value: "JAPAN" },
  { label: "MY", value: "MALAYSIA" },
  { label: "MX", value: "MEXICO" },
  { label: "NP", value: "NEPAL" },
  { label: "NL", value: "NETHERLANDS" },
  { label: "NZ", value: "NEW ZEALAND" },
  { label: "PH", value: "PHILIPPINES" },
  { label: "PT", value: "PORTUGAL" },
  { label: "QA", value: "QATAR" },
  { label: "ZA", value: "SOUTH AFRICA" },
  { label: "ES", value: "SPAIN" },
  { label: "SE", value: "SWEDEN" },
  { label: "CH", value: "SWITZERLAND" },
  { label: "TR", value: "TURKEY" },
  { label: "UA", value: "UKRAINE" },
  { label: "AE", value: "UNITED ARAB EMIRATES" },
  { label: "GB", value: "UNITED KINGDOM" },
  { label: "US", value: "UNITED STATES" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    ContactPerson: "",
    Mobile: "",
    Email: "",
    Country: "",
    Remark: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toLowerCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.stopPropagation();
      e.target.classList.add("was-validated");
      return;
    }
    try {
      setIsLoading(true); // Start loading

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/contactinquiry`,
        formData
      );

      if (response) {
        toast.success("Your application has been submitted successfully!");
        setFormData({
          ContactPerson: "",
          Mobile: "",
          Email: "",
          Country: "",
          Remark: "",
        });
        e.target.classList.remove("was-validated");
      } else {
        toast.error("Application submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("Application submission failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

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
    // Simulate a delay to show the loader
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <React.Fragment
      style={{ position: "relative", minHeight: "100%", top: "0px" }}
    >
      <Helmet>
        <title>
          Contact Shreeji Pharma: Reach Out for Pharmaceutical Solutions
        </title>
        <meta
          name="description"
          content="Get in touch with Shreeji Pharma for trusted pharmaceutical products and solutions. Contact us today for inquiries and more information."
        />
        <meta
          name="keywords"
          content="Pharmaceutical company in India, Pharmaceuticals raw materials suppliers, Pharmaceutical distribution companies, Pharma chemicals, Vadodara, Gujarat, medical supplies, pharma"
        />
        <link rel="canonical" href={window.location.href} />
        {/* <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: window.location.href,
            description:
              "Official contact page of Shreeji Pharma International, providing easy access to customer support and inquiry submission.",
          })}
        </script> */}
      </Helmet>
      <Stickey />
      <ToastContainer />
      <div className="boxed_wrapper">
        <section className="page-title">
          <div
            className="bg-layer"
            style={{ backgroundImage: `url(${Background})` }}
          ></div>
          <Container className="auto-container">
            <div className="content-box">
              <h1>Contact</h1>
              <ul className="bread-crumb clearfix">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Contact</li>
              </ul>
            </div>
          </Container>
        </section>
        <section className="contact-info-section">
          <Container className="auto-container">
            <div className="lower-box">
              <Row className="clearfix">
                <Col lg={4} md={6} sm={12} className="single-column">
                  <div className="single-item">
                    <div className="icon-box">
                      <i className="flaticon-pin"></i>
                    </div>
                    <h3>Location</h3>
                    <p>
                      311, Atlantis Heights, Sarabhai Main Road, Vadiwadi,
                      Vadodara - 390 007
                    </p>
                  </div>
                </Col>
                <Col lg={4} md={6} sm={12} className="single-column">
                  <div className="single-item">
                    <div className="icon-box">
                      <i className="flaticon-phone-call-1"></i>
                    </div>
                    {/* <h3>Contact Info</h3> */}

                    <h5>
                      <a href="tel:+91 8866002331">
                        +91 8866002331/ <br />
                        0265 3504578{" "}
                      </a>
                    </h5>
                    <p>
                      Mon to Sat: 10.00am to 6.00pm <br /> Sunday: Closed
                    </p>
                  </div>
                </Col>
                <Col lg={4} md={6} sm={12} className="single-column">
                  <div className="single-item">
                    <div className="icon-box">
                      <i className="flaticon-message"></i>
                    </div>
                    <h3>
                      <i className="flaticon-dial-pad"></i>
                      <a href="mailto:contact@shreejipharma.com">
                        contact@shreejipharma.com
                      </a>
                    </h3>
                    <h3>
                      <i className="fa-brands fa-skype"></i>
                      <a href="skype:Nilesh.sheth70?Chat">Nilesh.sheth70</a>
                    </h3>
                    <h3>
                      <i className="fa-brands fa-whatsapp"></i>
                      <a
                        href="https://api.whatsapp.com/send?phone=918866002331&amp;text= Hello Shreeji Pharma Team, I am interested in -"
                        target="_blank"
                      >
                        +91 8866002331
                      </a>
                    </h3>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
        <section className="contact-section sec-pad centred">
          <Container className="auto-container">
            <Row className="clearfix justify-content-center">
              <Col xl={6} lg={12} md={12} className="inner-column">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10372.815643465836!2d73.16075495016815!3d22.317465242314196!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf6c89cabb19%3A0xf803cbcf27adf1aa!2sShreeji%20Pharma%20International!5e0!3m2!1sen!2sin!4v1713952635837!5m2!1sen!2sin"
                  style={{ border: 0, width: "100%", height: 700 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
              <Col xl={6} lg={12} md={12} className="inner-column">
                <div className="inner-box">
                  <div className="sec-title">
                    <span className="sub-title">Send a Message</span>
                    <h2>
                      Drop a line & get a reply <br /> from our team
                    </h2>
                  </div>
                  <div className="form-inner">
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="needs-validation"
                    >
                      <Row className="clearfix">
                        <Col lg={6} md={12} sm={12} className="form-group">
                          <i className="fa-solid fa-user"></i>
                          <label>Name</label>
                          <input
                            type="text"
                            name="ContactPerson"
                            placeholder="Enter your name"
                            value={formData.ContactPerson}
                            onChange={handleChange}
                            required
                          />
                          <div className="invalid-feedback">
                            Enter your name!
                          </div>
                        </Col>
                        <Col lg={6} md={12} sm={12} className="form-group">
                          <i className="fa-solid fa-phone"></i>
                          <label>Number</label>
                          <input
                            type="text"
                            name="Mobile"
                            placeholder="Enter your number"
                            value={formData.Mobile}
                            onChange={handleChange}
                            pattern="\d{10}"
                            required
                          />
                          <div className="invalid-feedback">
                            Invalid phone number
                          </div>
                        </Col>
                        <Col lg={6} md={12} sm={12} className="form-group">
                          <i className="fa-solid fa-envelope"></i>
                          <label>Email</label>
                          <input
                            type="email"
                            name="Email"
                            placeholder="Enter your Email"
                            value={formData.Email}
                            onChange={handleEmailChange}
                            required
                          />
                          <div className="invalid-feedback">Invalid email</div>
                        </Col>
                        <Col lg={6} md={12} sm={12} className="form-group">
                          <label>Select Country</label>
                          <div className="select-box">
                            <select
                              className="nice-select selectmenu"
                              name="Country"
                              value={formData.Country}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select Country</option>
                              {countriesArray.map((country) => (
                                <option
                                  key={country.label}
                                  value={country.value}
                                >
                                  {country.value}
                                </option>
                              ))}
                            </select>
                            <div className="invalid-feedback">
                              Please select your country!
                            </div>
                          </div>
                        </Col>
                        <Col lg={12} md={12} sm={12} className="form-group">
                          <label>Message</label>
                          <textarea
                            name="Remark"
                            placeholder="Enter your message"
                            rows="3"
                            value={formData.Remark}
                            onChange={handleChange}
                            required
                          ></textarea>
                          <div className="invalid-feedback">
                            Enter your message!
                          </div>
                        </Col>
                        <Col
                          lg={12}
                          md={12}
                          sm={12}
                          className="form-group message-btn"
                        >
                          <button type="submit" className="theme-btn contact">
                            Submit Here
                          </button>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* <div className="sticky-button">
          <a href="assets/catalogue-shreeji-pharma.pdf" target="__blank" download="">
            Download Brochure
          </a>
        </div> */}
        {/* <div className="sticky-whatsapp">
          <a href="https://api.whatsapp.com/send?phone=918866002331&amp;text= Hello Shreeji Pharma Team, I am interested in -" target="_blank">
            <img src={wp} className="img-responsive" />
          </a>
        </div>
        <div className="sticky-skype">
          <a href="skype:Nilesh.sheth70?Call" target="_blank">
            <img src={skype} className="img-responsive" />
          </a>
        </div> */}
        <div
          className="modal fade"
          id="exampleModa"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content custom-model-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Vadiwadi, Vadodara
                </h1>
                <button
                  type="button"
                  className="btn-close custom-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7381.956093641144!2d73.167648!3d22.31667!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf6c89cabb19%3A0xf803cbcf27adf1aa!2sShreeji%20Pharma%20International!5e0!3m2!1sen!2sus!4v1712310707767!5m2!1sen!2sus"
                  style={{ border: 0, width: 600, height: 450 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
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
