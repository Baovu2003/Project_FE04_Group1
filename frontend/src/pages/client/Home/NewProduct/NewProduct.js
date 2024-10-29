import React, { useEffect, useState } from 'react'
import { get } from '../../../../Helpers/API.helper';
import { Button, Col, Container, Row } from 'react-bootstrap';
function NewProduct() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products from the API
    const fetchProducts = async () => {
      try {
        const data = await get("http://localhost:5000/"); // Adjust the endpoint as needed
        setProducts(data.newProductFeatured);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log(products)
  return (
    <>
    <div className="bao-subheadline">
        <div className="bao-subheadline-deco-line"></div>
        <div className="bao-subheadline-label">New Products</div>
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
                    {product.discountPercentage > 0 && (
                      <div className="on-sale-badge">Featured</div>
                    )}
                   
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-title">{product.title}</div>
                  <div className="bao-price">
                    <span className="product-price">
                      ${product.price.toFixed(2)} USD
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="original-price">
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}{" "}
                        USD
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
  )
}

export default NewProduct