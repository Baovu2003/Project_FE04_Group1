import React, { useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { post } from "../../../../Helpers/API.helper";
import Notification from "../../../../Helpers/Notification ";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const [successMessage, setSuccessMessage] = useState(""); // Optional success message handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Xóa thông báo lỗi trước khi submit
  
    try {
      const response = await post("http://localhost:5000/admin/auth/loginPost", {
        email: username,
        password: password,
      });
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      if (response.ok) {
        setSuccessMessage("Login successful! Redirecting...");
        console.log("Login successful");
        // Xử lý logic chuyển trang sau khi đăng nhập thành công
      }
    } catch (error) {
      // Parse lỗi trả về từ backend
      const errorMsg = JSON.parse(error.message)?.message || "An error occurred. Please try again later.";
      setErrorMessage(errorMsg); // Hiển thị thông báo lỗi chi tiết
    }
  };
  

  return (
    <div className="signin-wrapper">
      <div className="container signin-container">
        <div className="signin-content">
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>

            {/* Display Notification component for error or success messages */}
            {errorMessage && <Notification message={errorMessage} type="error" />}
            {successMessage && <Notification message={successMessage} type="success" />}

            <Form onSubmit={handleSubmit} className="register-form" id="login-form">
              <Form.Group controlId="login">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="remember" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button type="submit" className="mt-3 w-50" variant="primary">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
