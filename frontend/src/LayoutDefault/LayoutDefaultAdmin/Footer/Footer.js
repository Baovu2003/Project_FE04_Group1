import React from "react";
import { FaFacebook, FaTwitter, FaPinterest, FaDribbble } from "react-icons/fa"; 
import { Container, Row, Col } from 'react-bootstrap'; 
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="py-4">
          <Col lg={4} md={12} className="mb-4">
            <div className="footer-about">
              <h4>About Us</h4>
              <p>
                Our mission is to quench your thirst and nourish your body
                with meticulously purified water.
                <br />
                Perfect for athletes and health-conscious individuals.
              </p>
              <div className="social-icons">
                <span>Follow:</span>
                <ul>
                  <li>
                    <a href="#" className="facebook">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="twitter">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="pinterest">
                      <FaPinterest />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dribbble">
                      <FaDribbble />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h5>Useful Links</h5>
            <ul className="footer-links">
              <li><a href="#">About Pronia</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact us</a></li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h5>My Table</h5>
            <ul className="footer-links">
              <li><a href="#">View Cart</a></li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h5>Customer Service</h5>
            <ul className="footer-links">
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">Wish List</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="mb-4">
            <h5>Address:</h5>
            <ul className="footer-address">
              <li><a href="#">Hoa Lac High Tech Park</a></li>
              <li><a href="#">Hanoi, Vietnam</a></li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <Row>
            <Col lg={12}>
              <div className="copyright text-center">
                <span className="copyright-text">
                  © 2024 PROJECT by CPL_HN_FE04_Group2
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
