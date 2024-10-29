import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Assuming you're using axios for API requests
import { get } from "../../../Helpers/API.helper";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image"; // Use Image component from react-bootstrap

function ProductDetail() {
  const { slug } = useParams(); // Get slug from the URL
  const [product, setProduct] = useState(null); // Initialize state to store product details
  const [productCategory, setProductCategory] = useState(null); // Initialize state to store product details
  const [selectedImage, setSelectedImage] = useState(0); // State for selected image
  const [selectedColor, setSelectedColor] = useState(""); // State for selected color
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  // Fetch product details when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await get(`http://localhost:5000/products/detail/${slug}`);
        setProduct(data.products); // Set the product data to state
        setProductCategory(data.category);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [slug]); // Dependency array includes slug so it refetches if slug changes

  if (!product) {
    return <div>Loading...</div>;
  }
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    // Check if the entered quantity exceeds the stock
    if (value <= 0) {
      setError("Số lượng > 0"); // Set error message
    } else if (value > product.stock) {
      setError("Số lượng không đủ."); // Set error message
    } else {
      setError(""); // Clear error message if quantity is valid
    }
  };

  return (
    <div
      style={{
        margin: "20px 10%",

        background: "#f8f9fa", // Light grey background
        borderRadius: "8px", // Rounded corners
        padding: "20px", // Space inside the box
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}
    >
         <Button variant="secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <img
              src={
                product.thumbnail
                  ? product.thumbnail.startsWith("http")
                    ? product.thumbnail
                    : `http://localhost:5000${product.thumbnail}`
                  : "http://localhost:5000/path-to-placeholder-image.png" // Placeholder image URL
              }
              alt={product.description}
              fluid
              className="rounded-lg mb-3" // Add border class here
              style={{
                width: "80%",
              }} // Align image to the right
            />

            <div className="d-flex mt-2">
              {/* {product.images.map((img, index) => (
              <Button
                key={index}
                onClick={() => setSelectedImage(index)}
                variant={selectedImage === index ? 'primary' : 'light'}
                className="me-2"
              >
                <Image src={img} alt={`Thumbnail ${index + 1}`} width={100} height={100} />
              </Button>
            ))} */}
            </div>
          </Col>
          <Col md={6}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <picture className="webpimg-container">
                <source
                  type="image/webp"
                  srcSet="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                />
                <img
                  srcSet="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                  width="89"
                  height="20"
                  alt="is_authentic"
                  className="styles__StyledImg-sc-p9s3t3-0 hbqSye"
                  style={{ width: "89px", height: "20px", opacity: 1 }}
                />
              </picture>

              <span
                className="brand-and-author no-after"
                style={{ marginLeft: "20px", marginTop: "10px" }}
              >
                <h6 style={{ display: "flex" }}>
                  <div>Category: </div>
                  <div style={{ color: "blue" }}> {productCategory.title}</div>
                </h6>
              </span>
            </div>

            <h1 className="h4">{product.title}</h1>
            <div className="d-flex align-items-center mb-2">
              <span className="me-2">5⭐</span>
            </div>
            <div className="mb-3">
              <div className="h5 d-flex align-items-center">
                {/* Display discounted price */}
                <div style={{ fontSize: "20px", color: "red" }}>₫</div>
                <div
                  className="mb-0"
                  style={{ fontSize: "40px", fontWeight: "bold", color: "red" }}
                >
                  {product.price.toLocaleString()}
                </div>

                <div
                  className="mb-0"
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "15px",
                  }}
                >
                  -{product.discountPercentage.toLocaleString()}%
                </div>
                {/* Display original price */}
                {product.discountPercentage > 0 && (
                  <span
                    className=""
                    style={{
                      textDecoration: "line-through",
                      marginLeft: "10px",
                      fontSize: "15px",
                      color: "gray",
                    }}
                  >
                    ₫
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toLocaleString()}{" "}
                    {/* Format as currency */}
                  </span>
                )}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Còn lại:</span>{" "}
              {product.stock} sản phẩm
            </div>

            <div className="mb-3">
              <h6 style={{ fontWeight: "bold" }}>Số lượng:</h6>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange} // Use the handler for quantity change
                className="form-control"
              />
              {error && <div className="text-danger mt-2">{error}</div>}{" "}
              {/* Error message */}
            </div>
            {/* <div className="mb-3">
            <h5>Kích thước:</h5>
            <div className="d-flex flex-wrap">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "primary" : "outline-primary"}
                  onClick={() => setSelectedSize(size)}
                  className="me-2 mb-2"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div> */}

            <button variant="info" className="cart-button">
              Add to cart
            </button>
            <Card className="mt-3">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <span>🚚 Miễn phí vận chuyển</span>
                </div>
                <div className="d-flex align-items-center">
                  <span>🔄 Đổi trả miễn phí trong 15 ngày</span>
                </div>
              </Card.Body>
            </Card>
            <div className="mt-4">
              <h5>Mô tả sản phẩm</h5>
              <p>{product.description}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProductDetail;
