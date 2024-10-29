import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./MoreProducts.css";
import { get } from "../../../../Helpers/API.helper";
import { Link } from "react-router-dom";

function MoreProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products from the API
    const fetchProducts = async () => {
      try {
        const data = await get("http://localhost:5000/"); // Adjust the endpoint as needed
        setProducts(data.productFeatured);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="bao-subheadline">
        <div className="bao-subheadline-deco-line"></div>
        <div className="bao-subheadline-label">More Products</div>
        <div className="bao-subheadline-deco-line"></div>
      </div>
      <Container className="more-products mb-4">
        <Row className="g-4">
          {products.map((product) => (
            <Col xs={12} md={6} lg={3} key={product._id}>
              <div className="bao-product-cart">
                <div
                  className="product-image"
                  style={{
                    backgroundImage: `url(${
                      product.thumbnail
                        ? product.thumbnail.startsWith("http")
                          ? product.thumbnail
                          : `http://localhost:5000${product.thumbnail}`
                        : "/images/FullDrink.jpg"
                    })`,
                  }}
                >
                  <div className="product-overlay group">
                    <div className="button-featured">
                      {product.discountPercentage > 0 && (
                        <div className="on-sale-badge">Featured</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <Link to={`listProduct/detail/${product.slug}`}>
                    {" "}
                    <div className="product-title">{product.title}</div>
                  </Link>
                  <div className="bao-price">
                    <span className="product-price">
                      ${product.price.toLocaleString()} USD
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="original-price">
                        đ
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button variant="info" className="cart-button">
                    Add to cart
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default MoreProducts;
