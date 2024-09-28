import React, { useState, useEffect } from "react";
import "./App.css";
import "./assets/css/animate.css";
import "./assets/css/bootstrap.css";
import "./assets/css/color.css";
import "./assets/css/flaticon.css";
import "./assets/css/font-awesome-all.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/jquery.fancybox.min.css";
import "./assets/css/nice-select.css";
import "./assets/css/owl.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/timePicker.css";
import About from "./pages/About";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Commitment from "./pages/Commitment";
import Products from "./pages/Products/Products";
import ProductsDetails from "./pages/Products/ProductsDetails";
import Gallery from "./pages/Gallery";
import Certificate from "./pages/Certificate";
import Contect from "./pages/Contect";
import Cart from "./pages/Cart";
import Productss from "./components/Productss";
import Header from "./components/Header";
import Blog from "./components/Blog";
import AboutUs from "./components/AboutUs";
import Inquiry from "./components/Inquiry";
import BlogsDetails from "./pages/Blogs/BlogsDetails";
import InnderGallery from "./pages/InnerGallery";
import NewsEvent from "./components/NewsEvent";
import NewsDetails from "./pages/News/NewsDetails";
import { SearchProvider } from "./pages/Search/SearchProvider";
import Search from "./pages/Search/Search";
import Preloader from "./components/PreLoader";
import Industries from "./components/Industries";
import Strenghts from "./components/Strenghts";
import Facts from "./components/Facts";
import GoogleTranslate from "./components/GoogleTranslate";
import ScrollToTop from "./components/ScrollToTop";
import StickyBrochure from "./components/Brochure";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SearchProvider>
        <GoogleTranslate />
        <StickyBrochure />
        <BrowserRouter>
          <Header />
          {/* <ScrollToTop/> */}
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productss" element={<Productss />} />
              <Route path="/about" element={<About />} />
              <Route path="/commitment" element={<Commitment />} />
              <Route path="/products/:productGroup" element={<Products />} />
              <Route path="/productDetails/:id" element={<ProductsDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/contact" element={<Contect />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/inquiry" element={<Inquiry />} />
              <Route path="/blogdetails/:id" element={<BlogsDetails />} />
              <Route path="/innergallery/:index" element={<InnderGallery />} />
              <Route path="/newsevent" element={<NewsEvent />} />
              <Route path="/detailNews/:id" element={<NewsDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/strenghts" element={<Strenghts />} />
              <Route path="/Facts" element={<Facts />} />
            </Routes>

            <Footer />
          </>
        </BrowserRouter>
      </SearchProvider>
    </>
  );
}

export default App;