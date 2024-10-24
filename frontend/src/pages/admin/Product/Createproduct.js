import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../Helpers/API.helper";
import Notification from "../../../Helpers/Notification ";

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [product_category_id, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [position, setPosition] = useState(""); // State for position
  const [status, setStatus] = useState("active"); // State for status

  const [message, setMessage] = useState(""); // State for success/error message
  const [type, setType] = useState(""); // Success or error type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get("http://localhost:5000/admin/products-category");
        console.log("Categories fetched:", data.records);
        setCategories(data.records); // Assume the API returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(selectedCategory)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discountPercentage", discountPercentage);
    formData.append("stock", stock);
    formData.append("product_category_id", selectedCategory);
    formData.append("thumbnail", thumbnail);
    formData.append("position", position);
    formData.append("status", status);
  
    try {
      await post("http://localhost:5000/admin/products/create", formData);
      setMessage("Product created successfully!");
      setType("success");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (error) {
      setMessage("Error submitting form.");
      setType("error");
      console.error("Submission error:", error);
    }
  };
  
  const renderSelectTree = (records, level = 0) => {
    return records.map((item) => {
      const prefix = Array(level + 1).join("-- ");
      return (
        <React.Fragment key={item.id}>
          <option value={item.id}>
            {prefix} {item.title}
          </option>
          {item.children && item.children.length > 0 && renderSelectTree(item.children, level + 1)}
        </React.Fragment>
      );
    });
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
            {renderSelectTree(product_category_id)}
          </Form.Control>
        </Form.Group>

        {/* Status (Radio buttons) */}
        <Form.Group>
          <Form.Label>Status:</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="statusActive"
              label="Active"
              name="status"
              value="active"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />
            <Form.Check
              type="radio"
              id="statusInactive"
              label="Inactive"
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
