import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOrderMutation } from "../slices/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [subtotal, setSubTotal] = useState("");
  const [phonenumber, setPhone] = useState("");

  const [Order, { isLoading }] = useOrderMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user_id = localStorage.getItem("userId");
      await Order({
        user_id,
        phonenumber,
        subtotal,
      }).unwrap();
      toast.success("Successfully Order Placed!");
      navigate("/getOrder");
    } catch (error) {
      toast.error("Not Authorised ");
    }
  };

  return (
    <FormContainer>
      <h1>Order</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Phone Number"
            value={phonenumber}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Sub Total</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Subtotal"
            value={subtotal}
            onChange={(e) => setSubTotal(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-3"
        >
          Place Order
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
