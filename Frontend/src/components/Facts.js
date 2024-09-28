import React from "react";
import { Helmet } from "react-helmet";
import funfact from "../assets/images/background/funfact-bg.jpg";
import { Col, Container, Row } from "react-bootstrap";

export default function Facts() {
  return (
    <React.Fragment>
      <Helmet>
        {/* <title>Fun Facts - Shreeji Pharma International</title> */}
        <meta
          name="description"
          content="Discover interesting facts and figures about Shreeji Pharma International, including our happy clients, quality products, and precise test results."
        />
        <meta
          name="keywords"
          content="fun facts, Shreeji Pharma International, happy clients, quality products, test results"
        />
        <meta name="author" content="Shreeji Pharma International" />
        {/* <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            name: "Shreeji Pharma International",
            url: "http://www.shreejipharma.com",
            logo: "http://www.shreejipharma.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-401-555-1212",
              contactType: "Customer service",
            },
            sameAs: [
              "http://www.facebook.com/shreejipharma",
              "http://www.twitter.com/shreejipharma",
            ],
            awards: [
              "1000+ Happy Clients",
              "100+ Quality Products",
              "100% Accurate and Precise Test Results",
            ],
          })}
        </script> */}
      </Helmet>
      <section
        className="funfact-section text-center"
        aria-labelledby="funfacts-title"
      >
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${funfact})` }}
          role="img"
          aria-label="Background image representing fun facts"
        ></div>
        <Container>
          <header className="sec-title text-light">
            <h2 id="funfacts-title" style={{ color: "white" }}>
              Facts that will blow your mind
            </h2>
            <p className="sub-title">Interesting Numbers</p>
          </header>
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
                        aria-label="1000+ Happy Clients"
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
                        aria-label="100+ Quality Products"
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
                        aria-label="100 Percent Accurate and Precise Test Results"
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
    </React.Fragment>
  );
}
