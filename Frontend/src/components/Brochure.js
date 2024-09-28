import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StickyBrochure = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // Load download link dynamically
    const linkElement = document.createElement("a");
    linkElement.href = "/catalogue-shreeji-pharma-copy.pdf";
    linkElement.target = "__blank";
    // linkElement.download = "";

    linkElement.textContent = "Download Brochure";
    document.getElementById("brochure-download-link").appendChild(linkElement);
  }, []);

  return (
    <div className="google-trans-brochure">
      {/* <div id="google_translate_element" style={{ paddingBottom: "3px" }}> */}
      <div id="brochure-download-link"></div>
      {/* </div> */}
    </div>
  );
};

export default StickyBrochure;
