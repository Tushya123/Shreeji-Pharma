import React, { useState, useEffect } from "react";
import "react-magic-slider-dots/dist/magic-dots.css";
import footer from "../assets/images/new-home/footer-location-img.jpg";
import skype from "../assets/images/new-home/skype.png";
import wp from "../assets/images/new-home/whatsapp.png";
import star from "../assets/images/new-home/star.png";
import aeo from "../assets/images/new-home/aeo.png";
import iso from "../assets/images/new-home/iso.png";
import shape10 from "../assets/images/shape/shape-10.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Products from "./Productss";
import Header from "./Header";
import axios from "axios";
import Blog from "./Blog";
import AboutUs from "./AboutUs";
import Inquiry from "./Inquiry";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import NewsEvent from "./NewsEvent";
import Industries from "./Industries";
import Strenghts from "./Strenghts";
import Facts from "./Facts";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Figure,
  Image,
} from "react-bootstrap";
import Preloader from "./PreLoader";
import { Link } from "react-router-dom";

export default function Stickey() {
  const [showModal, setShowModal] = useState(false);
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

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => {
      return (
        <MagicSliderDots
          dots={dots}
          numDotsToShow={4}
          dotWidth={30}
          // autoplay={true}
          speed={500}
          slidesToScroll={1}
          slidesToShow={1}
        ></MagicSliderDots>
      );
    },
  };

  return (
    <React.Fragment
    // style={{ position: "relative", minHeight: "100%", top: "0px" }}
    >
      <div className="stickey-div">
        <button
          className={`scroll-top scroll-to-target ${isVisible ? "open" : ""}`}
          onClick={scrollToTop}
          style={{ display: isVisible ? "block" : "none" }}
        >
          <i className="flaticon-up-arrow"></i>
        </button>

        <div className="sticky-skype2">
          <Link to="skype:Nilesh.sheth70?Chat" target="_blank">
            <Image src={skype} className="img-responsive" alt="Skype" />
          </Link>
        </div>
        <div className="sticky-whatsapp2">
          <Link
            to="https://api.whatsapp.com/send?phone=919909247312&amp;text= Hello Shreeji Pharma Team, I am interested in -"
            target="_blank"
          >
            <Image src={wp} className="img-responsive" alt="WhatsApp" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
