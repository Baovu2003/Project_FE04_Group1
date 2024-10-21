import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { patch, post } from '../../../Helpers/API.helper'; // Assuming you have a post helper function
import Notification from '../../../Helpers/Notification ';

function UpdateRole() {
  const { id } = useParams(); // Extract roleId from URL params
  console.log(id);
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); // State for success/error message
  const [type, setType] = useState(''); // Success or error type
  const [roleData, setRoleData] = useState({
    title: '',
    description: '',
    permission: []
  });

  useEffect(() => {
    fetchRoleDetails(); // Fetch role details when component mounts
  }, []);

  const fetchRoleDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/roles/edit/${id}`);
      
      const data = await response.json();
      if (!data.records) {
        // Navigate to roles page if no data is found
        navigate('/');
        navigate('/admin/roles');
      } else {
        console.log(data)
        setRoleData(data.records); // Set the role data to be edited
      }
    
    } catch (error) {
      console.error('Error fetching role data:', error);
        navigate('/admin/roles');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log({name,value})
    setRoleData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  console.log(roleData)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await patch(`http://localhost:5000/admin/roles/edit/${id}`, roleData);
      setMessage('Role created successfully!');
      setType('success'); // Success notification
      setTimeout(() => {
          navigate('/admin/roles');
      }, 2000);
    
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (

    <div className="container my-4">
      <h1>{roleData.title ? `Sửa Nhóm Quyền: ${roleData.title}` : 'Loading...'}</h1>
      <Notification message={message} type={type}/>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Tên nhóm quyền</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={roleData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={roleData.description}
            onChange={handleInputChange}
            rows="3"
            required
          ></textarea>
        </div>

        {/* Permissions can be handled later as checkboxes or multi-select */}

        <button type="submit" className="btn btn-primary">Cập nhật</button>
      </form>
    </div>
  );
}

export default UpdateRole;
