import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { post } from "../../../Helpers/API.helper";
import Notification from "../../../Helpers/Notification ";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return; // Early return to prevent further execution
    }
  
    setError(""); // Reset error state before submitting
  
    try {
      const response = await post("http://localhost:5000/user/register", {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      });
  
      // Handle the API response
      if (response) {
        console.log("Registration successful:", response);
        // Reset form data if needed
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        
        setSuccessMessage("Registration successful! Redirecting to login...");
        
        // Delay navigation to login page after showing success message
        setTimeout(() => {
          navigate("/user/login");
        }, 2000); // Wait 2 seconds before redirecting
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
  
    console.log("Registration data:", formData);
  };
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {successMessage && (
            <Notification message={successMessage} type="success" />
          )}
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

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
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-4 w-100"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
