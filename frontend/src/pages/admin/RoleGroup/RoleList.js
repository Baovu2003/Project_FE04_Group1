import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [notification, setNotification] = useState(""); // State for notification

  // Fetch roles data from API
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/roles");
      const data = await response.json();
      console.log(data);
      setRoles(data.records);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    setRoles(roles.map((role) => ({ ...role, checked: !checkAll })));
  };

  const handleDelete = async (id) => {
    // try {
    //     await axios.delete(`${process.env.REACT_APP_API_URL}/roles/${id}`);
    //     fetchRoles(); // Refresh the list after deletion
    // } catch (error) {
    //     console.error("Error deleting role:", error);
    // }
  };

  return (
    <div>
      <h1 className="mb-4">Nhóm quyền</h1>
      {notification && (
        <div className={`notification notification-info`} role="alert">
          {notification}
        </div>
      )}
      <div className="card mb-3 mt-4">
        <div className="card-header">Danh sách</div>
        <div className="card-body">
          <div className="row mb-5">
            <div className="col-4"></div>
            <div className="col-4"></div>
            <div className="col-4">
              <Link
                to="/admin/roles/create"
                className="btn btn-outline-success"
              >
                + Create
              </Link>
            </div>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Nhóm quyền</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={role.id}>
                  <td>{index + 1}</td>
                  <td>{role.title}</td>
                  <td>{role.description}</td>
                  <td>
                    <Link
                      to={`/admin/roles/edit/${role._id}`}
                      className="btn btn-warning me-2"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(role._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RolesList;
