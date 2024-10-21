import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Form,
  InputGroup,
} from "react-bootstrap";
import { deleteItem, patch } from "../../../Helpers/API.helper";
import "../../../Helpers/Modal.css";
import "../../../Helpers/Notification.css";
import { Link } from "react-router-dom";
import Modal from "../../../Helpers/Modal "; // Import the Modal component
function ProductList() {
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDeleted, setFilterDeleted] = useState("all");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("position-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of products per page

  const [notification, setNotification] = useState(""); // State for notification

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToChange, setProductIdToChange] = useState(null);

  const [newStatus, setNewStatus] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/products`);
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products); // Set filtered products to the entire list initially
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setFilterStatus(status);
    updateFilteredProducts(status, searchKeyword, sortOrder, filterDeleted);
  };

  const handleDeletedFilterChange = (event) => {
    const deleted = event.target.value;
    setFilterDeleted(deleted);
    updateFilteredProducts(filterStatus, searchKeyword, sortOrder, deleted);
  };

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    updateFilteredProducts(filterStatus, keyword, sortOrder, filterDeleted);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    updateFilteredProducts(filterStatus, searchKeyword, order, filterDeleted);
  };

  const updateFilteredProducts = (status, keyword, order, deletedStatus) => {
    console.log({ status, keyword, order, deletedStatus });
    const filtered = products.filter((product) => {
      const matchesStatus = status === "all" || product.status === status;
      const matchesKeyword = product.title
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchesDeleted =
        deletedStatus === "all" ||
        product.deleted === (deletedStatus === "deleted");
      console.log({ matchesStatus, matchesKeyword, matchesDeleted });
      return matchesStatus && matchesKeyword && matchesDeleted;
    });

    const sorted = filtered.sort((a, b) => {
      switch (order) {
        case "position-asc":
          return a.position - b.position;
        case "position-desc":
          return b.position - a.position;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredProducts(sorted);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStatusChange = (productId, currentStatus) => {
    const status = currentStatus === "active" ? "inactive" : "active";
    setNewStatus(status);
    setProductIdToChange(productId);
    setIsModalOpen(true); // Open the modal instead of confirm
  };

  const handleModalConfirm = async () => {
    if (!productIdToChange) return;

    try {
      const data = await patch(
        `http://localhost:5000/admin/products/change-status/${newStatus}/${productIdToChange}`
      );
      setNotification(`Trạng thái đã được cập nhật thành "${newStatus}".`); // Set notification message
      fetchProducts();
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Hàm để mở modal xóa và lưu trữ ID sản phẩm muốn xóa
  const handleDelete = (productId) => {
    console.log("productId in handleDelete");
    setProductIdToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  // Hàm để đóng modal xóa
  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteConfirm = async () => {
    if (!productIdToDelete) {
      console.error("No product ID to delete");
      return;
    }

    console.log("Deleting product with ID:", productIdToDelete); // Kiểm tra ID

    try {
      await deleteItem(
        `http://localhost:5000/admin/products/delete/${productIdToDelete}`
      );
      fetchProducts();
      setNotification("Sản phẩm đã bị xóa.");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    setIsDeleteModalOpen(false); // Đóng modal xóa
  };


  console.log({ filterStatus, searchKeyword, sortOrder, filterDeleted });
  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Danh sách sản phẩm</h1>
      {notification && (
        <div className={`notification notification-info`} role="alert">
          {notification}
        </div>
      )}

      {/* Bulk Action Form */}
      <Row className="mb-3">
        <Col>
          <form className="d-flex align-items-start">
            <div className="form-group me-2">
              <select
                name="type"
                className="form-select"
                // value={bulkAction}
              >
                <option value="active">Activate</option>
                <option value="inactive">InActive</option>
                <option value="deleteAll">Delete</option>
                <option value="change-position">Change Position</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </form>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter keyword"
              value={searchKeyword}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Select value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </Col>
        <Col md={6}>
          <Form.Select
            value={filterDeleted}
            onChange={handleDeletedFilterChange}
          >
            <option value="all">All</option>
            <option value="deleted">Deleted</option>
            <option value="undeleted">Undeleted</option>
          </Form.Select>
        </Col>
      </Row>
      {/* Create Product */}
      <Row className="mb-3">
        {/* Phần sort */}
        <Col md={8}>
          <Form.Select value={sortOrder} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="position-desc">Vị trí giảm dần</option>
            <option value="position-asc">Vị trí tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Link to="/admin/products/create" className="btn btn-success">
            Create Product
          </Link>
        </Col>
      </Row>

      {/* Vẽ product ra giao diện */}
      {currentProducts.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="checkall" />
              </th>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Position</th>
              <th>Trạng thái</th>
              <th>IsDeleted</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product._id}>
                <td>
                  <input type="checkbox" name="id" value={product._id} />
                </td>
                <td>{startIndex + index + 1}</td>
                <td>
                  <img
                    src={
                      product.thumbnail
                        ? product.thumbnail.startsWith("http")
                          ? product.thumbnail
                          : `http://localhost:5000${product.thumbnail}`
                        : "http://localhost:5000/path-to-placeholder-image.png" // Placeholder image URL
                    }
                    alt={product.title || "Placeholder Image"}
                    width="100px"
                    height="auto"
                  />
                </td>

                <td>{product.title}</td>
                <td>{product.price}$</td>
                <td>{product.position}</td>
                <td>
                  <Button
                    variant={product.status === "active" ? "success" : "danger"}
                    onClick={() =>
                      handleStatusChange(product._id, product.status)
                    } // Call handler on click
                  >
                    {product.status === "active" ? "Active" : "Inactive"}
                  </Button>
                </td>
                <td>
                  {/* Hiển thị trạng thái đã xóa */}
                  {product.deleted ? (
                    <h6 className="text-danger">Đã xóa</h6>
                  ) : (
                    <h6 className="text-success">Chưa xóa</h6>
                  )}
                </td>

                <td>
                  <Link
                    to={`detail/${product._id}`}
                    className="btn btn-primary me-2"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`edit/${product._id}`}
                    className="btn btn-warning me-2"
                  >
                    Update
                  </Link>

                  <Button
                    variant={product.deleted ? "success" : "danger"}
                    onClick={() => handleDelete(product._id)}
                    className="ms-2"
                  >
                    {product.deleted ? "Undeleted" : "Deleted"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Not found</p>
      )}

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          {currentPage > 1 && (
            <>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(1)}
                >
                  Trang đầu
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Trang trước
                </button>
              </li>
            </>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          {currentPage < totalPages && (
            <>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Trang sau
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(totalPages)}
                >
                  Trang cuối
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        message={`Bạn có chắc chắn muốn thay đổi trạng thái thành "${newStatus}"?`}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        message="Bạn có chắc muốn xóa sản phẩm này không?"
      />
    </Container>
  );
}

export default ProductList;
