import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <Card style={{backgroundColor: colors.primary[400]}}  >
        <Card.Body>
          <h2 className="text-center mb-4">Our Houses 🏠 </h2>

          {error && <Alert variant="danger">{error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <div style={{ padding: "10px" }}></div>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <div style={{ padding: "20px" }}></div>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
            >
              Log In
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">Log In To Our Houses!</div>
      </Card>
    </>
  );
}
