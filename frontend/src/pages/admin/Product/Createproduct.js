import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { post } from "../../../Helpers/API.helper";
import Notification from "../../../Helpers/Notification ";

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [position, setPosition] = useState(""); // New state for position
  const [status, setStatus] = useState("active"); // New state for status

  const [message, setMessage] = useState(""); // State for success/error message
  const [type, setType] = useState(""); // Success or error type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/products-category"
        );
        const data = await response.json();
        console.log("data", data.records);
        setCategories(data.records); // Assume the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountPercentage", discountPercentage);
    formData.append("stock", stock);
    formData.append("category_id", selectedCategory);
    formData.append("thumbnail", thumbnail); // Append file
    formData.append("position", position);
    formData.append("status", status);

    console.log("productData", formData);

    try {
      await fetch("http://localhost:5000/admin/products/create", {
        method: "POST",
        body: formData, // Pass formData in the request body
      });
      setMessage("Products created successfully!");
      setType("success"); // Success notification
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      setMessage("Error submitting form.");
      setType("error");
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <Notification message={message} type={type} />
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        {/* Price */}
        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            min="0"
          />
        </Form.Group>

        {/* Discount Percentage */}
        <Form.Group controlId="formDiscountPercentage">
          <Form.Label>Discount Percentage</Form.Label>
          <Form.Control
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(Number(e.target.value))}
            min="0"
          />
        </Form.Group>

        {/* Stock */}
        <Form.Group controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            min="0"
          />
        </Form.Group>

        {/* Position */}
        <Form.Group controlId="formPosition">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="number"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            placeholder="auto increase"
          />
        </Form.Group>

        {/* Category Selection */}
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">-- Choose a Category --</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        {/* Status (Radio buttons) */}
        <Form.Group>
          <Form.Label>Status:</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="statusActive"
              label="Hoạt động"
              name="status"
              value="active"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />
            <Form.Check
              type="radio"
              id="statusInActive"
              label="Dừng hoạt động"
              name="status"
              value="inactive"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
            />
          </div>
        </Form.Group>

        {/* Thumbnail Upload */}
        <Form.Group controlId="formThumbnail">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="image/*"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>
    </div>
  );
}

export default CreateProduct;
