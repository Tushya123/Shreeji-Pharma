import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Figure, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";

export default function Blog() {
  const [Blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/listonly/Blog`
        );
        console.log("Data:", response);
        const activeCertificates = response.data.filter(
          (Blog) => Blog.IsActive
        );
        setBlogs(activeCertificates);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, []);

  const firstBlogId = Blogs.length > 0 ? Blogs[0].Title : null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        {/* <title>Blog - Explore our latest Blog</title> */}
        <meta
          name="description"
          content="Explore our latest blog posts and stay updated with the latest news and articles."
        />
        <meta name="keywords" content="blog, latest blog, news, articles" />
        {/* <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Blog",
            headline: "Explore our latest Blog",
            url: window.location.href,
            image: Blogs.map(
              (blog) =>
                `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${blog.BlogImage}`
            ),
            description:
              "Stay updated with the latest news and articles in our blog.",
            articleSection: "News",
            publisher: {
              "@type": "Organization",
              name: "Shreeji Pharma International",
            },
            author: {
              "@type": "Organization",
              name: "Shreeji Pharma International",
            },
            blogPost: Blogs.map((blog) => ({
              "@type": "BlogPosting",
              headline: blog.Title,
              image: `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${blog.BlogImage}`,
              datePublished: blog.createdAt,
              description: blog.Description.slice(0, 150) + "...",
            })),
          })}
        </script> */}
      </Helmet>
      <section className="blog-grid news-style-two py-5 pb-0">
        <Container>
          <header className="sec-title">
            <span className="sub-title">Blog</span>
            <div className="blog">
              <h1>Explore our latest Blog</h1>
              <div className="btn-box">
                <button className="theme-btn bn">
                <Link
  style={{ color: "white" }}
  to={`/blogdetails/${firstBlogId ? firstBlogId.replace(/\s+/g, '-') : ''}`}
>
  View All Blog
</Link>
                </button>
              </div>
            </div>
          </header>
          <Row className="clearfix">
            {Blogs.map((blog, index) => (
              <Col
                as="article"
                lg={6}
                md={6}
                sm={12}
                className="mb-4"
                key={index}
                style={{ paddingRight: "0px" }}
              >
                <div className="news-block-one wow fadeInUp animated">
                  <div className="inner-box">
                    <div className="image-box position-relative">
                      <Figure className="image mb-0">
                        <img
                          src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${blog.BlogImage}`}
                          alt={blog.Title}
                          className="img-fluid blogImg"
                        />
                      </Figure>
                      <div className="link-btn position-absolute">
                        <Link to={`/blogdetails/${blog._id}`}>
                          <i className="flaticon-zoom-in"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="lower-content p-3">
                      <div className="category mb-2">
                        <a>{blog.Category}</a>
                      </div>
                      <ul className="post-info list-unstyled d-flex mb-2">
                        <li className="me-3">{formatDate(blog.createdAt)}</li>
                      </ul>
                      <h2 className="mb-3">
                        <Link to={`/blogdetails/${blog.Title}`}>
                          {blog.Title}
                        </Link>
                      </h2>
                      <div className="lower-box">
                                               <div className="link">
                          <Link to={`/blogdetails/${blog.Title.replace(/\s+/g, '-')}`}>Read More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
            <div className="btn-box">
              <button className="theme-btn btn">
                <Link
                  style={{ color: "white" }}
                  to={`/blogdetails/${firstBlogId}`}
                >
                  View all blog
                </Link>
              </button>
            </div>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}
