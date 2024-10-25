import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { get, patch } from "../../../Helpers/API.helper";
import Notification from "../../../Helpers/Notification ";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../../Helpers/Cookie.helper";
import { loginActions } from "../../../actions/Login";
import { accountActions } from "../../../actions/AccountActions";
function Permissions() {
  const [permissions, setPermissions] = useState([]);
  const [updatedPermissions, setUpdatedPermissions] = useState([]);
  const [message, setMessage] = useState(""); // State for success/error message
  const [type, setType] = useState(""); // Success or error type
  const navigate = useNavigate();

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const data = await get("http://localhost:5000/admin/roles/permissions");

      setPermissions(data.records);
      // Initialize updatedPermissions state with empty arrays for permissionsChild
      const initialPermissions = data.records.map((record) => ({
        id: record._id,
        permissionsChild: record.permission || [],
      }));
      setUpdatedPermissions(initialPermissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e, permissionType, recordIndex) => {
    console.log({ e, permissionType, recordIndex });
    const isChecked = e.target.checked;
    setUpdatedPermissions((prevPermissions) => {
      console.log(prevPermissions);
      const updated = [...prevPermissions];
      // Sử dụng Set để lưu trữ permissionsChild thay cho mảng
      let permissionsSet = new Set(updated[recordIndex].permissionsChild);
      console.log(permissionsSet);

      if (isChecked) {
        // Thêm permissionType vào Set
        permissionsSet.add(permissionType);
      } else {
        // Xóa permissionType khỏi Set
        permissionsSet.delete(permissionType);
      }
      // Chuyển Set trở lại thành mảng và cập nhật
      updated[recordIndex].permissionsChild = Array.from(permissionsSet);

      return updated;
    });
  };

  // Handle form submit
  const handleSubmit = async () => {
    console.log("Updated Permissions:", updatedPermissions);
    // You can make an API request here to send the updatedPermissions to your backend
    try {
      await patch(
        "http://localhost:5000/admin/roles/permissions",
        updatedPermissions
      );
      setMessage("Update permisssion successfully!");
      setType("success");

      setTimeout(() => {
        navigate("/admin/roles");
      }, 2000);
    } catch (error) {
      setMessage("Error for Update permisssion.");
      setType("error");
    }
  };

  return (
    <Container className="my-4">
      <h1>Phân quyền</h1>
      <Notification message={message} type={type} />
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleSubmit} variant="primary">
          Update
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Tính năng</th>
            {permissions.map((record) => (
              <th key={record._id} className="text-center">
                {record.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* ID Row */}
          <tr>
            <td>ID</td>
            {permissions.map((record) => (
              <td key={record._id} className="text-center">
                <input type="text" value={record._id} readOnly />
              </td>
            ))}
          </tr>

          {/* Permission categories */}
          <tr>
            <td colSpan={permissions.length + 1}>
              <b>Danh mục sản phẩm</b>
            </td>
          </tr>
          {[
            "products-category_view",
            "products-category_create",
            "products-category_update",
            "products-category_delete",
          ].map((permissionType) => (
            <tr key={permissionType}>
              <td>
                {permissionType
                  .replace("products-category_", "")
                  .replace("_", " ")}
              </td>
              {permissions.map((record, index) => (
                <td key={record._id} className="text-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(e, permissionType, index)
                    }
                    checked={updatedPermissions[
                      index
                    ].permissionsChild.includes(permissionType)}
                    style={{ transform: "scale(1.5)", cursor: "pointer" }}
                  />
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td colSpan={permissions.length + 1}>
              <b>Sản phẩm</b>
            </td>
          </tr>
          {[
            "products_view",
            "products_create",
            "products_update",
            "products_delete",
          ].map((permissionType) => (
            <tr key={permissionType}>
              <td>
                {permissionType.replace("products_", "").replace("_", " ")}
              </td>
              {permissions.map((record, index) => (
                <td key={record._id} className="text-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(e, permissionType, index)
                    }
                    checked={updatedPermissions[
                      index
                    ].permissionsChild.includes(permissionType)}
                    style={{ transform: "scale(1.5)", cursor: "pointer" }}
                  />
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td colSpan={permissions.length + 1}>
              <b>Nhóm Quyền</b>
            </td>
          </tr>
          {["roles_view", "roles_create", "roles_update", "roles_delete"].map(
            (permissionType) => (
              <tr key={permissionType}>
                <td>
                  {permissionType.replace("products_", "").replace("_", " ")}
                </td>
                {permissions.map((record, index) => (
                  <td key={record._id} className="text-center">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(e, permissionType, index)
                      }
                      checked={updatedPermissions[
                        index
                      ].permissionsChild.includes(permissionType)}
                      style={{ transform: "scale(1.5)", cursor: "pointer" }}
                    />
                  </td>
                ))}
              </tr>
            )
          )}

          <tr>
            <td colSpan={permissions.length + 1}>
              <b>Phân Quyền</b>
            </td>
          </tr>
          {[
            "permissions_view",
            "permissions_create",
            "permissions_update",
            "permissions_delete",
          ].map((permissionType) => (
            <tr key={permissionType}>
              <td>
                {permissionType.replace("products_", "").replace("_", " ")}
              </td>
              {permissions.map((record, index) => (
                <td key={record._id} className="text-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(e, permissionType, index)
                    }
                    checked={updatedPermissions[
                      index
                    ].permissionsChild.includes(permissionType)}
                    style={{ transform: "scale(1.5)", cursor: "pointer" }}
                  />
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <td colSpan={permissions.length + 1}>
              <b>Danh sách tài khoản</b>
            </td>
          </tr>
          {[
            "accounts_view",
            "accounts_create",
            "accounts_update",
            "accounts_delete",
          ].map((permissionType) => (
            <tr key={permissionType}>
              <td>
                {permissionType.replace("products_", "").replace("_", " ")}
              </td>
              {permissions.map((record, index) => (
                <td key={record._id} className="text-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(e, permissionType, index)
                    }
                    checked={updatedPermissions[
                      index
                    ].permissionsChild.includes(permissionType)}
                    style={{ transform: "scale(1.5)", cursor: "pointer" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Permissions;
