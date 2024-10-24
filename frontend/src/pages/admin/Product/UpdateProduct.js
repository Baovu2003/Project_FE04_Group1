import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { get, patch } from "../../../Helpers/API.helper";

function UpdateProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    stock: 0,
    thumbnail: "",
    position: 0,
    status: "active",
    product_category_id: "",
  });
  const [categories, setCategories] = useState([]); // Assuming you have categories to select
  const [filePreview, setFilePreview] = useState(null); // State for file preview
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await get(
          `http://localhost:5000/admin/products/detail/${id}`
        );
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

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
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }
  
    try {
      const data = await patch(`http://localhost:5000/admin/products/edit/${id}?_method=PATCH`, formData);
      
      // If your backend sends a success message in the response, you can access it like this:
      if (data && data.message) {
        setNotification(data.message); // Set success notification from the response
      } else {
        setNotification("Product updated successfully!"); // Default success message if none provided
      }
  
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/admin/products"); // Use navigate for redirection
      }, 2000); // Redirects after 2 seconds
  
    } catch (error) {
      setNotification("Product update was not successful!"); // Set notification on error
      console.error("Error during product update:", error); // Log the error for debugging
    }
  };
  

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, thumbnail: file });
      setFilePreview(URL.createObjectURL(file)); // Create preview URL
    } else {
      setFilePreview(null); // Reset preview if no file selected
    }
  };

  return (
    <div className="container mt-5">
      {notification && (
        <div className={`notification notification-info`} role="alert">
          {notification}
        </div>
      )}
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div className="form-group mb-3">
          <label htmlFor="title">Tiêu đề</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group mb-3">
          <label htmlFor="description">Mô tả</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>

        {/* Product Category */}
        <div className="form-group mb-3">
          <label htmlFor="product_category_id">Danh mục cha</label>
          <select
            name="product_category_id"
            id="product_category_id"
            className="form-control"
            value={product.product_category_id}
            onChange={(e) =>
              setProduct({ ...product, product_category_id: e.target.value })
            }
          >
            <option value="">--Chọn danh mục cha--</option>
            {renderSelectTree(categories)}
          </select>
        </div>

        {/* Price */}
        <div className="form-group mb-3">
          <label htmlFor="price">Giá</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            min="0"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>

        {/* Discount Percentage */}
        <div className="form-group mb-3">
          <label htmlFor="discountPercentage">Phần trăm giảm giá</label>
          <input
            type="number"
            className="form-control"
            id="discountPercentage"
            name="discountPercentage"
            step="0.01"
            min="0"
            value={product.discountPercentage}
            onChange={(e) =>
              setProduct({ ...product, discountPercentage: e.target.value })
            }
          />
        </div>

        {/* Stock */}
        <div className="form-group mb-3">
          <label htmlFor="stock">Số lượng trong kho</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
        </div>

        {/* Thumbnail URL */}
        <div className="form-group mb-3">
          <label htmlFor="thumbnail">Ảnh sản phẩm (URL)</label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
          />
          {filePreview ? (
            <img
              src={filePreview}
              alt="Product Preview"
              className="upload-image-preview"
              style={{ width: "10%", marginTop: "10px" }}
            />
          ) : (
            product.thumbnail && (
              <img
                src={
                  product.thumbnail.startsWith("http")
                    ? product.thumbnail
                    : `http://localhost:5000${product.thumbnail}`
                }
                alt={product.title}
                className="upload-image-preview"
                style={{ width: "10%", marginTop: "10px" }}
              />
            )
          )}
        </div>

        {/* Position */}
        <div className="form-group mb-3">
          <label htmlFor="position">Vị trí</label>
          <input
            type="number"
            className="form-control"
            id="position"
            name="position"
            placeholder="auto increase"
            value={product.position}
            onChange={(e) =>
              setProduct({ ...product, position: e.target.value })
            }
          />
        </div>

        {/* Status (Radio buttons) */}
        <div className="form-group mb-3">
          <label>Trạng thái:</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="statusActive"
              name="status"
              value="active"
              checked={product.status === "active"}
              onChange={(e) =>
                setProduct({ ...product, status: e.target.value })
              }
            />
            <label htmlFor="statusActive" className="form-check-label">
              Hoạt động
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              className="form-check-input"
              id="statusInActive"
              name="status"
              value="inactive"
              checked={product.status === "inactive"}
              onChange={(e) =>
                setProduct({ ...product, status: e.target.value })
              }
            />
            <label htmlFor="statusInActive" className="form-check-label">
              Dừng hoạt động
            </label>
          </div>
        </div>

        {/* Update Button */}
        <div className="form-group mt-4">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
      <Link to="/admin/products" className="btn btn-secondary mt-3">
        Quay lại
      </Link>
    </div>
  );
}

export default UpdateProduct;
