import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../../../Helpers/Notification ";
import { postV2 } from "../../../Helpers/API.helper";

function AccountCreate() {
  const [roles, setRoles] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role_id, setRoleId] = useState("");
  const [status, setStatus] = useState("inactive");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({}); // For storing error messages

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
    fetchAccounts();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/roles");
      const data = await response.json();
      setRoles(data.records);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/accounts");
      const data = await response.json();
      setAccounts(data.records); // Store account list in state
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
    if (!email) return "Please input your E-mail!";
    if (!emailRegex.test(email)) return "The input is not valid E-mail!";
    if (accounts.some(account => account.email === email)) return "Email already exists";
    return null;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/; // Phone number must start with '0' and have 10 digits total
    if (!phone) return "Please input your Phone number!";
    if (!phoneRegex.test(phone)) return "Phone number must start with 0 and contain exactly 10 digits!";
    if (accounts.some(account => account.phone === phone)) return "Phone number already exists";
    return null;
};


  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    
    // Validate email in real-time
    const emailError = validateEmail(emailInput);
    if (emailError) {
      setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors;
        return rest; // Remove email error if it was present
      });
    }
  };

  const handlePhoneChange = (e) => {
    const phoneInput = e.target.value;
    setPhone(phoneInput);
    
    // Validate phone in real-time
    const phoneError = validatePhone(phoneInput);
    if (phoneError) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: phoneError }));
    } else {
      setErrors((prevErrors) => {
        const { phone, ...rest } = prevErrors;
        return rest; // Remove phone error if it was present
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
      return; // Prevent submission if there's a validation error
    } else {
      setErrors({}); // Clear errors if both email and phone are valid
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("avatar", avatar);
    formData.append("role_id", role_id);
    formData.append("status", status);

    try {
      const response = await postV2(
        "http://localhost:5000/admin/accounts/create",
        formData // Send FormData instead of JSON
      );

      if (!response.ok) {
        throw new Error("Error creating account");
      }

      const data = await response.json();
      console.log("Account created successfully:", data);
      setMessage("Tài khoản đã được tạo thành công!");
      setType("success");
      setTimeout(() => {
        navigate("/admin/accounts");
      }, 500);
    } catch (error) {
      console.error("Error creating account:", error);
      setMessage("Đã xảy ra lỗi khi tạo tài khoản!");
      setType("error");
    }
  };

  return (
    <>
      <div>
        <h1>Create Account</h1>
        <Notification message={message} type={type} />
        {roles.length > 0 ? (
          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange} 
                isInvalid={errors.email} 
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={handlePhoneChange} 
                isInvalid={errors.phone} 
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Avatar */}
            <Form.Group controlId="formAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/*"
              />
            </Form.Group>

            {/* Role ID (Select from API) */}
            <Form.Group controlId="formRoleId">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role_id}
                onChange={(e) => setRoleId(e.target.value)}
                required
              >
                <option value="">-- Select Role --</option>
                {roles &&
                  roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.title}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            {/* Status */}
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  id="active"
                  type="radio"
                  label="Active"
                  value="active"
                  checked={status === "active"}
                  onChange={() => setStatus("active")}
                />
                <Form.Check
                  id="inactive"
                  type="radio"
                  label="Inactive"
                  value="inactive"
                  checked={status === "inactive"}
                  onChange={() => setStatus("inactive")}
                />
              </div>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        ) : (
          <div className="col-4">
            <span>Chưa có role. Vui lòng tạo role 🚀 </span>
            <Link
              to="/admin/roles/create"
              className="btn btn-outline-success"
            >
              + Create
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default AccountCreate;
