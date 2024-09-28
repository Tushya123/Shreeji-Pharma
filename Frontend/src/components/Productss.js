import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Container, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Products() {
  const arrowStyle = {
    display: "block",
    background: "#16436f",
    borderRadius: "10px",
    zIndex: "2",
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyle }}
        onClick={onClick}
        aria-label="Next"
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyle }}
        onClick={onClick}
        aria-label="Previous"
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]);
  const [metaInfo, setMetaInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/api/auth/list/areatype`
        );
        const activeProducts = response.data.filter(
          (product) => product.IsActive
        );

        const customOrder = [
          "6641abe793c69c545ac233e2",
          "6634b74108aa777d7b59c4c1",
          "663b598ccc6c2844e6838bbc",
        ];

        const sortedProducts = activeProducts.sort((a, b) => {
          const indexA = customOrder.indexOf(a._id);
          const indexB = customOrder.indexOf(b._id);

          if (indexA === -1 && indexB === -1) {
            return 0.5 - Math.random();
          }

          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });

        const orderedProducts = sortedProducts.filter((product) =>
          customOrder.includes(product._id)
        );
        const unorderedProducts = sortedProducts.filter(
          (product) => !customOrder.includes(product._id)
        );

        const shuffledUnorderedProducts = unorderedProducts.sort(
          () => 0.5 - Math.random()
        );

        const finalSortedProducts = [
          ...orderedProducts,
          ...shuffledUnorderedProducts,
        ];

        setProducts(finalSortedProducts);
        const productWithMeta = finalSortedProducts.find(
          (product) =>
            product.metaTitle && product.metaDescription && product.metaKeywords
        );

        if (productWithMeta) {
          setMetaInfo({
            title: productWithMeta.metaTitle,
            description: productWithMeta.metaDescription,
            keywords: productWithMeta.metaKeywords,
            url: productWithMeta.metaURL,
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{metaInfo.title || "Shreeji Pharma International"}</title>
        <meta
          name="description"
          content={
            metaInfo.description ||
            "Explore high-quality pharmaceutical products at Shreeji Pharma International. Your trusted partner in healthcare."
          }
        />
        <meta
          name="keywords"
          content={
            metaInfo.keywords ||
            "pharma, healthcare, pharmaceuticals, drugs, medicine, Shreeji Pharma"
          }
        />
        <link
          rel="canonical"
          href={window.location.href}
        />
      </Helmet>
      <section className="service-section bg-color-1 sec-pad">
        <Container>
          <div className="sec-title">
            <span className="sub-title">Our Products</span>
            <h2>We Provide Quality Product</h2>
          </div>
          <Slider {...settings}>
            {products.map((product, index) => (
              <div className="service-block-one" key={index}>
                <div className="inner-box">
                  <div className="image-box">
                    <Figure className="image">
                      <img
                        src={`${process.env.REACT_APP_API_URL_SHREEJI_PHARMACY}/${product.ImageUrl}`}
                        alt={`Image of ${product.ProductGroup}`}
                      />
                    </Figure>
                    <div className="icon-box">
                      <i
                        className="flaticon-biochemistry"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                  <div className="lower-content">
                    <Link
                      to={`/products/${product.ProductGroup.replace(/\s+/g, '-')}`}
                    >
                      <h3>{product.ProductGroup}</h3>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
    </React.Fragment>
  );
}