import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteItem, patch } from "../../../Helpers/API.helper";
import Modal from "../../../Helpers/Modal "; // Import the Modal component
function Category() {
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToChange, setProductIdToChange] = useState(null);

  const [newStatus, setNewStatus] = useState("");

  const [notification, setNotification] = useState(""); // State for notification

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/products-category"
      );
      const data = await response.json();
      console.log("data.records:", data.records);
      setCategories(data.records);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleStatusChange = (productId, currentStatus) => {
    console.log(productId, currentStatus);
    const status = currentStatus === "active" ? "inactive" : "active";
    setNewStatus(status);
    setProductIdToChange(productId);
    setIsModalOpen(true);
  };
  const handleModalConfirm = async () => {
    if (!productIdToChange) return;

    try {
      const data = await patch(
        `http://localhost:5000/admin/products-category/change-status/${newStatus}/${productIdToChange}`
      );
      console.log(data);
      setNotification(`Trạng thái đã được cập nhật thành "${newStatus}".`); // Set notification message
      fetchCategory();
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
        `http://localhost:5000/admin/products-category/delete/${productIdToDelete}`
      );
      fetchCategory();
      setNotification("Update the deleted.");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    setIsDeleteModalOpen(false); // Đóng modal xóa
  };
  const renderTableRows = (records, level = 1) => {
    return records.map((item, index) => {
      const prefix = Array(level).join("-- ");
      return (
        <>
          <tr key={item.id}>
            <td>
              <input type="checkbox" name="id" value={item.id} />
            </td>
            <td>{index + 1}</td>
            <td>
              <img
                src={
                  item.thumbnail
                    ? item.thumbnail.startsWith("http")
                      ? item.thumbnail
                      : `http://localhost:5000${item.thumbnail}`
                    : "http://localhost:5000/path-to-placeholder-image.png" // Placeholder image URL
                }
                alt={item.title || "Placeholder Image"}
                width="100px"
                height="auto"
              />
            </td>
            <td>
              {prefix} {item.title}
            </td>
            <td>
              <input
                type="number"
                defaultValue={item.position}
                min="1"
                style={{ width: "60px", borderRadius: "5px" }}
                name="position"
              />
            </td>
            <td>
              <Button
                variant={item.status === "active" ? "success" : "danger"}
                onClick={() => handleStatusChange(item._id, item.status)}
              >
                {item.status === "active" ? "Active" : "Inactive"}
              </Button>
            </td>           
                <td>
                  {/* Hiển thị trạng thái đã xóa */}
                  {item.deleted ? (
                    <h6 className="text-danger">Đã xóa</h6>
                  ) : (
                    <h6 className="text-success">Chưa xóa</h6>
                  )}
                </td>

                <td>
                  <Link
                    to={`detail/${item._id}`}
                    className="btn btn-primary me-2"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`edit/${item._id}`}
                    className="btn btn-warning me-2"
                  >
                    Update
                  </Link>

                  <Button
                    variant={item.deleted ? "success" : "danger"}
                    onClick={() => handleDelete(item._id)}
                    className="ms-2"
                  >
                    {item.deleted ? "Undeleted" : "Deleted"}
                  </Button>
                </td>
          </tr>
          {item.children &&
            item.children.length > 0 &&
            renderTableRows(item.children, level + 1)}
        </>
      );
    });
  };

  return (
    <div>
      {notification && (
        <div className={`notification notification-info`} role="alert">
          {notification}
        </div>
      )}
      <h1>Category Management</h1>
      <Row>
        <Col md={4}>
          <Link
            to="/admin/products-category/create"
            className="btn btn-success"
          >
            Create category
          </Link>
        </Col>
      </Row>
      <form
        action=""
        method="POST"
        data-path={`admin/products-category/delete`}
        id="form-delete-item"
      >
        <table className="table">
          <thead>
            <tr>
              <th>Select</th>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Position</th>
              <th>Status</th>
              <th>isDeleted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRows(categories)}</tbody>
        </table>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        message={`Bạn có chắc chắn muốn thay đổi trạng thái thành "${newStatus}"?`}
      />

<Modal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        message="Bạn có chắc muốn xóa sản phẩm này không?"
      />
    </div>
  );
}

export default Category;
