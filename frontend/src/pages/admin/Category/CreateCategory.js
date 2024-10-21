import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { post } from "../../../Helpers/API.helper";

function CreateCategory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [position, setPosition] = useState(""); // State for position
  const [status, setStatus] = useState("active"); // State for status
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

  // Hàm render cây danh mục
  const renderSelectTree = (records, level = 0) => {
    return records.map((item) => {
      const prefix = Array(level + 1).join("-- ");
      return (
        <React.Fragment key={item.id}>
          <option value={item.id} selected={item.id === selectedCategory}>
            {prefix} {item.title}
          </option>
          {/* Kiểm tra và render các danh mục con */}
          {item.children &&
            item.children.length > 0 &&
            renderSelectTree(item.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('parent_id', selectedCategory);
    formData.append('thumbnail', thumbnail); // Append file
    formData.append('position', position);
    formData.append('status', status);

    console.log("categoryData", formData);

    try {
        await fetch('http://localhost:5000/admin/products-category/create', {
            method: 'POST',
            body: formData,
        });
        navigate('/admin/products-category');
    } catch (error) {
        console.error('Error creating category:', error);
    }
};


  return (
    <div>
      <h1>Thêm mới danh mục sản phẩm</h1>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <Form.Group controlId="formTitle">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Parent Category */}
        <Form.Group controlId="formParentCategory">
          <Form.Label>Danh mục cha</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Chọn danh mục cha --</option>
            {renderSelectTree(categories)} {/* Gọi hàm renderSelectTree */}
          </Form.Control>
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="formDescription">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        {/* Thumbnail Upload */}
        <Form.Group controlId="formThumbnail">
          <Form.Label>Ảnh sản phẩm (URL)</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])} // Ensure single file is selected
            accept="image/*"
            required
          />
        </Form.Group>

        {/* Position */}
        <Form.Group controlId="formPosition">
          <Form.Label>Vị trí</Form.Label>
          <Form.Control
            type="number"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            placeholder="auto increase"
          />
        </Form.Group>

        {/* Status (Radio buttons) */}
        <Form.Group>
          <Form.Label>Trạng thái:</Form.Label>
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

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Tạo mới
        </Button>
      </Form>
    </div>
  );
}

export default CreateCategory;
