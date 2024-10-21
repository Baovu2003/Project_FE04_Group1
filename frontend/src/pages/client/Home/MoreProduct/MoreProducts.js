import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './MoreProducts.css';

const products = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BAuNqbXIkmuKk7obGlwGUqW-hEoaj6COIg&s',
    title: 'Pink Premium Ceramic',
    price: '$99.00 USD',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BAuNqbXIkmuKk7obGlwGUqW-hEoaj6COIg&s',
    title: 'Golden Designers Mug',
    price: '$50.00',
    originalPrice: '$69.00 USD',
    onSale: true,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BAuNqbXIkmuKk7obGlwGUqW-hEoaj6COIg&s',
    title: 'Golden Designers Mug',
    price: '$50.00',
    originalPrice: '$69.00 USD',
    onSale: true,
  },

  // Add other products here...
];

function MoreProducts() {
  return (
    <>
      <div className="bao-subheadline">
        <div className="bao-subheadline-deco-line"></div>
        <div className="bao-subheadline-label">More Products</div>
        <div className="bao-subheadline-deco-line"></div>
      </div>
      <Container className="more-products mb-4">
        <Row className="g-4">
          {products.map((product, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <div className="bao-product-cart">
                <div
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  <div className="product-overlay group">
                    {product.onSale && (
                      <div className="on-sale-badge">On Sale</div>
                    )}
                    <Button variant="light" className="explore-button">
                      Explore Mug
                    </Button>
                  </div>
                </div>
                <div className="product-info">
               
                    <div className="product-title">{product.title}</div>
                  
                  <div className="bao-price">
                    <span className="product-price">{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice}</span>
                    )}
                  </div>
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
