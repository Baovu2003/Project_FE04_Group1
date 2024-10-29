import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useNavigate } from "react-router-dom";
import Notification from "../../../Helpers/Notification ";
import { get, post } from "../../../Helpers/API.helper";
import { getCookie } from "../../../Helpers/Cookie.helper";
import { useDispatch } from "react-redux";
import { loginActions } from "../../../actions/Login";
import { userActions } from "../../../actions/UserActions";

function LoginUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = getCookie("token");

  console.log(token);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken = await get(
          `http://localhost:5000/user/${token}`
        );
        console.log(accountByToken.user);
        if (accountByToken) {
          dispatch(loginActions(true));
          dispatch(userActions(accountByToken));
          navigate("/");
        }
      } catch (error) {
        navigate("/user/login");
      }
    };

    if (token) {
      fetchApi();
    } else {
      navigate("/user/login");
    }
  }, [token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("http://localhost:5000/user/login", {     
        email: formData.email,
        password: formData.password,
      });
  
      // Handle the API response
      if (response.tokenUser) {
        document.cookie = `token=${response.tokenUser}; path=/; max-age=86400`; // Cookie lasts 1 day
        console.log("Token:", response.tokenUser);
        console.log("User:", response.user);
        setSuccessMessage("Login successful");
        
        // Delay navigation to login page after showing success message
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.message ||
          "An error occurred during registration. Please try again."
      );
      console.error(error); // Log the error for debugging
    }
  
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility state
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {successMessage && (
            <Notification message={successMessage} type="success" />
          )}
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            {error && <div className="alert alert-danger">{error}</div>}

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-btn"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginUser;
