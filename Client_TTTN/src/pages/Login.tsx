import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
import { CURRENT_USER, getStoreJSON, setStoreJSON } from "../utils/configs";
import { Button, Checkbox, Form, Input } from "antd";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();
  const toastOptions: {} = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (getStoreJSON(CURRENT_USER)) {
      navigate("/");
    }
  }, []);

  const validateForm = (email: string, password: string) => {
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    if (validateForm(email, password)) {
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.message === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.message === true) {
        setStoreJSON(CURRENT_USER, data.content);
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="w-96 flex justify-center mt-36">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
}
