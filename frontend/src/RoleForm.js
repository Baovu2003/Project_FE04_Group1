import React, { useState } from "react";

function RoleForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const dataToSend = { title, description }; // Tạo đối tượng để gửi
    console.log("Sending data:", dataToSend); // Kiểm tra cấu trúc dữ liệu

    const response = await fetch("http://localhost:5000/admin/roles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend), // Gửi dữ liệu
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Role created:", data);
      // Xử lý sau khi gửi thành công, như thông báo cho người dùng
    } else {
      console.error("Error creating role:", response.statusText);
    }
  };

  return (
    <div className="container">
      <h1>Thêm mới quyền</h1>
      <form id="form-create-product" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group mb-3">
          <label htmlFor="title">Tiêu đề</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Create Button */}
        <div className="form-group mt-4">
        <button 
  type="submit" 
  className="btn btn-primary btn-lg" // Thêm `btn-lg` để làm nút lớn hơn
>
  Tạo mới
</button>

        </div>
      </form>
    </div>
  );
}

export default RoleForm;
