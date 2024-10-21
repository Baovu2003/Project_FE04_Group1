import React, { useEffect, useState } from "react";

function RolesList() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/roles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRoles(data.records);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []); 

  return (
    <div className="container mt-4">
      <h1 className="text-center">Roles List</h1>
      <ul className="list-group mt-3">
        {roles.map((role) => (
          <li key={role._id} className="list-group-item">
            {role.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RolesList;
