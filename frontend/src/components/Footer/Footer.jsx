import React from "react";
import './Footer.css'

export default function Footer() {
  return (

          <div className="footer" >
            <span className="copyright">
              <p className="pfooter">
              © {new Date().getFullYear()}, Made with{" "}
              <i className="fa fa-heart heart" /> by SE --&gt; FSAA
              </p>
            </span>
          </div>
  );
}
