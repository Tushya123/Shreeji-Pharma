import React, { useState, useEffect } from "react";
import Background from "../assets/images/new-home/breadcrumb-img.jpg";
import skype from "../assets/images/new-home/skype.png";
import wp from "../assets/images/new-home/whatsapp.png";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet"; // Import Helmet
import axios from "axios";
import { Row, Col } from "reactstrap";
import Stickey from "../components/Stickey";
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
  ,
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

export default function Cart() {
  const validationSchema = Yup.object().shape({
    ContactPerson: Yup.string().required("Contact Person is required"),
    CompanyName: Yup.string().required("Company Name is required"),
    Mobile: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Invalid phone number"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Country: Yup.string().required("Country is required"),
    Comments: Yup.string().required("Comments is required"),
  });
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

  const [products, setProducts] = useState([]);
  const productIds = JSON.parse(localStorage.getItem("productIds")) || [];
  const [productData, setProductData] = useState({
    ProductDetail: [],
    ContactPerson: "",
    CompanyName: "",
    Country: "",
    Mobile: "",
    Email: "",
    Comments: "",
    IsActive: true,
  });
  const remove_inquiry = async (new_id, event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/remove/InquiryProduct/${new_id}`
      );
      if (response) {
        let productIds = JSON.parse(localStorage.getItem("productIds")) || [];
        productIds = productIds.filter((productId) => productId !== new_id);
        localStorage.setItem("productIds", JSON.stringify(productIds));
        setProductData({
          ProductDetail: JSON.parse(localStorage.getItem("productIds")),
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== new_id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const productIds = JSON.parse(localStorage.getItem("productIds")) || [];

    const uniqueProductIds = Array.from(new Set(productIds));

    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          uniqueProductIds.map(async (productId) => {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/getbyid/InquiryProduct/${productId}`
            );
            return {
              id: response.data._id,
              productDetail: response.data.ProductDetail,
              productDetailLabel: response.data.ProductDetailLabel,
              quantity: response.data.Quantity,
            };
          })
        );
        setProducts(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();

    setProductData((prevData) => ({
      ...prevData,
      ProductDetail: productIds,
    }));
  }, []);

  console.log("This is Product", products);

  const [product, setproductid] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(localStorage.getItem("productIds"));
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  console.log("THis is", productData);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/create/inquiry`,
        values
      );
      console.log("Data submitted successfully:", response.data);
      handleClose();
      toast.success("Data submitted successfully");

      setSubmitting(false);
      setProductData({
        ProductDetail: JSON.parse(localStorage.getItem("productIds")),
        ContactPerson: "",
        CompanyName: "",
        Country: "",
        Mobile: "",
        Email: "",
        Comments: "",
        IsActive: true,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data");
    }
  };
  const isDisabled = products.length === 0;

  return (
    <>
      <React.Fragment
        style={{ position: "relative", minHeight: "100%", top: "0px" }}
      >
        <Helmet>
          {/* <title>Cart - Shreeji Pharma International</title> */}
          <meta
            name="description"
            content="View and manage your cart items for Shreeji Pharma International products."
          />
          <meta
            name="keywords"
            content="pharma, cart, online shopping, medical supplies"
          />
          <link rel="canonical" href={window.location.href} />
        </Helmet>
        <Stickey />
        <ToastContainer />

        <div className="boxed_wrapper">
          <section className="page-title">
            <div
              className="bg-layer"
              style={{ backgroundImage: `url(${Background})` }}
            ></div>
            <div className="auto-container">
              <div className="content-box">
                <h1>Cart</h1>
                <ul className="bread-crumb clearfix">
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>Cart</li>
                </ul>
              </div>
            </div>
          </section>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            dialogClassName="modal-xl"
          >
            <Modal.Header closeButton>
              <Modal.Title>Make Inquiry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-body">
                <div className="contact-section">
                  <div className="form-inner">
                    <Formik
                      initialValues={productData}
                      onSubmit={handleSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ errors, touched }) => (
                        <Form id="contact-form">
                          <Row className="clearfix">
                            <Col lg={4} md={6} sm={12} className="form-group">
                              <label>Contact Person</label>
                              <Field
                                type="text"
                                name="ContactPerson"
                                placeholder="Contact Person"
                                className={`form-control ${
                                  errors.ContactPerson &&
                                  touched.ContactPerson &&
                                  "is-invalid"
                                }`}
                              />
                              <ErrorMessage
                                name="ContactPerson"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                            <Col lg={4} md={6} sm={12} className="form-group">
                              <label>Company Name</label>
                              <Field
                                type="text"
                                name="CompanyName"
                                placeholder="Company Name"
                                className={`form-control ${
                                  errors.CompanyName &&
                                  touched.CompanyName &&
                                  "is-invalid"
                                }`}
                              />
                              <ErrorMessage
                                name="CompanyName"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                            <Col lg={4} md={6} sm={12} className="form-group">
                              <label>Phone</label>
                              <Field
                                type="text"
                                name="Mobile"
                                placeholder="Phone"
                                className={`form-control ${
                                  errors.Mobile &&
                                  touched.Mobile &&
                                  "is-invalid"
                                }`}
                              />
                              <ErrorMessage
                                name="Mobile"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                            <Col lg={4} md={6} sm={12} className="form-group">
                              <label>Email</label>
                              <Field
                                type="email"
                                name="Email"
                                placeholder="Email"
                                className={`form-control ${
                                  errors.Email && touched.Email && "is-invalid"
                                }`}
                              />
                              <ErrorMessage
                                name="Email"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                            <Col lg={4} md={6} sm={12} className="form-group">
                              <label>Country</label>
                              <Field
                                as="select"
                                name="Country"
                                className={`form-control ${
                                  errors.Country &&
                                  touched.Country &&
                                  "is-invalid"
                                }`}
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
                              </Field>
                              <ErrorMessage
                                name="Country"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                            <Col lg={8} md={6} sm={12} className="form-group">
                              <label>Comments</label>
                              <Field
                                as="textarea"
                                name="Comments"
                                placeholder="Comments"
                                rows="1"
                                className={`form-control ${
                                  errors.Comments &&
                                  touched.Comments &&
                                  "is-invalid"
                                }`}
                              />
                              <ErrorMessage
                                name="Comments"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                            <Col
                              lg={4}
                              md={12}
                              sm={12}
                              className="form-group message-btn text-center align-content-center"
                            >
                              <button
                                type="submit"
                                className="theme-btn"
                                data-bs-dismiss="modal"
                              >
                                Submit
                              </button>
                            </Col>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <section class="cart-section">
            <div class="auto-container">
              <div class="cart-outer">
                <div class="totle-table clearfix">
                  <div class="item pull-left">
                    <p>Your Cart: {products.length} Items</p>
                  </div>
                </div>
                <div class="row clearfix">
                  <div class="col-lg-12 col-md-12 col-sm-12 column clearfix">
                    <div class="table-outer">
                      <table responsive class="cart-table">
                        <thead class="cart-header">
                          <tr>
                            <th>Sr. No</th>
                            <th>Your Product</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((item, index) => {
                            return (
                              <tr>
                                <td style={{ fontSize: "16px" }}>
                                  {index + 1}
                                </td>
                                <td class="prod-column">
                                  <h5 style={{ fontSize: "16px" }}>
                                    {item.productDetailLabel}
                                  </h5>
                                </td>
                                <td class="prod-column">
                                  <h5 style={{ fontSize: "16px" }}>
                                    {item.quantity}
                                  </h5>
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    className="remove-btn"
                                    onClick={(event) =>
                                      remove_inquiry(item.id, event)
                                    }
                                  >
                                    <i className="fa-solid fa-xmark"></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Row className="d-flex justify-content-center">
                    <div className="col-lg-4 col-md-12 col-sm-12 column clearfix center-btn align-content-center">
                      <div className="btn-box clearfix">
                        <button
                          type="button"
                          className={`checkout-btn theme-btn ${
                            isDisabled ? "disabled-btn" : ""
                          }`}
                          data-bs-toggle="modal"
                          data-bs-target="#inquiryModal"
                          onClick={handleShow}
                          disabled={isDisabled}
                        >
                          Make Inquiry
                        </button>
                      </div>
                    </div>
                  </Row>
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

          <div
            className="modal fade"
            id="exampleModa"
            tabindex="-1"
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
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
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
    </>
  );
}
