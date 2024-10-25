import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { get, post } from "../../../../Helpers/API.helper";
import { useNavigate } from "react-router-dom";
import Notification from "../../../../Helpers/Notification ";
import { useDispatch } from "react-redux";
import { loginActions } from "../../../../actions/Login";
import { accountActions } from "../../../../actions/AccountActions";
import { getCookie } from "../../../../Helpers/Cookie.helper";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = getCookie("token");

  console.log(token);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken = await get(
          `http://localhost:5000/admin/auth/${token}`
        );
        console.log(accountByToken.user);
        if (accountByToken) {
          dispatch(loginActions(true));
          dispatch(accountActions(accountByToken));

          navigate("/admin/dashboard");
        }
      } catch (error) {
        navigate("/admin/auth/login");
      }
    };

    if (token) {
      fetchApi();
    } else {
      navigate("/admin/auth/login");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await post("http://localhost:5000/admin/auth/loginPost", {
        email: username,
        password: password,
      });

      if (data.token) {
        setSuccessMessage("Login successful! Redirecting...");
        document.cookie = `token=${data.token}; path=/; max-age=86400`; // Cookie lasts 1 day
        console.log(data.user, data.role);
        dispatch(loginActions({ user: data.user, role: data.role }));
        dispatch(accountActions({ user: data.user, role: data.role }));
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      } else {
        throw new Error("Token not received. Login failed.");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="container signin-container">
        <div className="signin-content">
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>

            {/* Display Notification component for error or success messages */}
            {errorMessage && (
              <Notification message={errorMessage} type="error" />
            )}
            {successMessage && (
              <Notification message={successMessage} type="success" />
            )}

            <Form
              onSubmit={handleSubmit}
              className="register-form"
              id="login-form"
            >
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
