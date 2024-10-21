import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./ListProduct.css"
function ListProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        const updatedProducts = data.map((item) => ({
          ...item,
          priceNew: (
            (item.price * (100 - item.discountPercentage)) /
            100
          ).toFixed(2),
          originalPrice: item.price,
        }));
        setProducts(updatedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Danh sách sản phẩm</h1>
      {products ? (
      <Row>
      {products.map((product) => (
       <Col lg={3} md={4} sm={6} xs={12} className="mb-4" key={product._id}>

          <div className="product">
            <div className="product-image-container">
              <img className="product-image" src={product.thumbnail} alt={product.title} />
              {/* {product.discountPercentage > 0 && (
                <span className="discount-badge">-{product.discountPercentage}%</span>
              )} */}
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.title}</h2>            
              <div className="price-box">
                <span className="new-price">${product.priceNew}</span>
                {product.discountPercentage > 0 && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
              </div>
              <Button className="buy-button">Add to Cart</Button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
      ) : (
        <>Error when to loading data</>
      )}
    </Container>
  );
}

export default ListProduct;
