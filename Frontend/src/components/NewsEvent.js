import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

export default function NewsEvent() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/Newsletter`
        );
        console.log("Data:", response.data);
        const activeCertificates = response.data.filter(
          (News) => News.IsActive
        );
        setNews(activeCertificates);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);
  const Newsfirst = news.length > 0 ? news[0]._id : null;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <React.Fragment>
      <Helmet>
        {/* <title>Latest News & Events - Shreeji Pharma International</title> */}
        <meta
          name="description"
          content="Stay updated with the latest news and events from Shreeji Pharma International. Discover our latest advancements and activities."
        />
        <meta
          name="keywords"
          content="Shreeji Pharma, news, events, pharmaceutical updates, healthcare news"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "NewsArticle",
            headline: "Latest News & Events - Shreeji Pharma International",
            image: [
              `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/some-news-image.jpg`, // Example, use dynamic images if available
            ],
            datePublished: news[0]?.NewsDate,
            dateModified: news[0]?.NewsDate,
            author: {
              "@type": "Organization",
              name: "Shreeji Pharma International",
            },
            publisher: {
              "@type": "Organization",
              name: "Shreeji Pharma International",
              logo: {
                "@type": "ImageObject",
                url: `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/logo.png`,
              },
            },
          })}
        </script>
      </Helmet>
      <section className="news-section sec-pad">
        <Container>
          <div className="sec-title">
            <span className="sub-title">News &amp; Events</span>
            <div className="blog">
              <h2>Explore our latest post</h2>
              {/* <div className="btn-box">
                <Link
                  style={{ color: "white" }}
                  to={`/detailNews/${Newsfirst}`}
                  className="theme-btn bn"
                >
                  View All News
                </Link>
              </div> */}
            </div>
          </div>
          <Row>
            {news.length > 0 ? (
              news.map((item, index) => (
                <Col lg={4} md={6} sm={12} className="news-block" key={index}>
                  <div
                    className="news-block-one wow fadeInUp animated"
                    data-wow-delay="00ms"
                    data-wow-duration="1500ms"
                    style={{
                      visibility: "visible",
                      animationDuration: "1500ms",
                      animationDelay: "0ms",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image">
                          <img
                            src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${item.NewsletterImage}`}
                            alt={item.Title}
                          />
                        </figure>
                        <div className="link-btn">
                          {/* <Link to={`/detailNews/${item._id}`}> */}
                          {/* <i className="flaticon-zoom-in"></i> */}
                          {/* </Link> */}
                        </div>
                      </div>
                      <div className="lower-content">
                        <div className="category">
                          <a>Shreeji Pharma</a>
                        </div>
                        <ul className="post-info clearfix">
                          <li>{item.NewsDate}</li>
                        </ul>
                        <h3>
                          {/* <Link to={`/detailNews/${item._id}`}> */}
                          {item.Title}
                          {/* </Link> */}
                        </h3>
                        {/* <div className="lower-box">
                          <div className="link">
                            <Link to={`/detailNews/${item._id}`}>
                              Read More
                            </Link>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Col>
                <p>No news available</p>
              </Col>
            )}
            {/* <div className="btn-box">
              <Link
                style={{ color: "white" }}
                to={`/detailNews/${Newsfirst}`}
                className="theme-btn btn"
              >
                View All News
              </Link>
            </div> */}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
