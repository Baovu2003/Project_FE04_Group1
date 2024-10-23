import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AccountList() {
  const [roles, setRoles] = useState([]);

  const [accounts, setAccounts] = useState([]); // State để lưu danh sách tài khoản
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

  const getRoleName = (id) => {
    const roleName = roles.find((d) => d._id === id);
    return roleName ? roleName.title : "Unknown";
  };
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

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/accounts");
        if (!response.ok) {
          throw new Error("Error fetching accounts");
        }
        const data = await response.json();
        console.log(data);
        setAccounts(data.records); // Giả sử API trả về mảng tài khoản
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false); // Đặt loading là false khi đã hoàn tất
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang tải
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Account List</h1>
      <Link to="create" className="btn btn-primary mb-3">
        Create Account
      </Link>
      {accounts.length > 0 ? (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th> {/* Cột Actions */}
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account._id}>
                <td>{account.fullName}</td>
                <td>{account.email}</td>
                <td>{account.phone}</td>
                <td>
                  <td>{getRoleName(account.role_id)}</td>
                </td>             
                <td>
                  <Button
                    variant={account.status === "active" ? "success" : "danger"}
                    // onClick={() =>
                    //   handleStatusChange(account._id, account.status)
                    // } 
                  >
                    {account.status === "active" ? "Active" : "Inactive"}
                  </Button>
                </td>
                <td>
                  <Link
                    to={`/accounts/${account._id}`}
                   className="btn btn-primary me-2"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/accounts/edit/${account._id}`}
                  className="btn btn-warning me-2"
                  >
                    Edit
                  </Link>

                  <Button
                    variant={account.deleted ? "success" : "danger"}
                    // onClick={() => handleDelete(account._id)}                   
                  >
                    {account.deleted ? "Undeleted" : "Deleted"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning" role="alert">
          No accounts found.
        </div>
      )}
    </div>
  );
}

export default AccountList;
