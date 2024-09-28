import React from "react";
import logo from "../assets/images/new-home/new-logo.png";

const Preloader = () => (
  <React.Fragment>
    <div className="loader-wrap">
      <div className="preloader">
        <div id="handle-preloader" className="handle-preloader">
          <div className="animation-preloader">
            <div className="spinner" aria-hidden="true"></div>
            <div className="txt-loading">
              <img src={logo} alt="Company logo loading" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Preloader;
