import React from "react";
import useSignup from "../../hooks/useSignup";
import { Button, Flex, Form, Input, Typography } from "antd";
import singupic from "../../assets/img/signup3d.webp";
import { Link } from "react-router-dom";
const Signup = () => {
  const { loading, signupUser } = useSignup();
  const handlesignup = async (values) => {
    await signupUser(values);
  };
  return (
    <div className="h-[90vh] flex-center justify-center z-[10]">
      <div className=" bg-white flex-center justify-center p-8 gap-5 rounded-xl shadow-lg">
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Sign In
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan mb-8">
            Sign In with email
          </Typography.Text>
          <Form onFinish={handlesignup} layout="vertical">
            <Form.Item
              // label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please input your full name",
                },
              ]}
            >
              <Input size="large" placeholder="Name" className="z-0" />
            </Form.Item>
            <Form.Item
              // label="Full Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "please input full email",
                },
                {
                  type: "email",
                  message: "The input is not valid Email!",
                },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>
            <Form.Item
              // label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "please input your Password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                color="default"
                variant="solid"
                size="large"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center text-gray-600">
            <span>
              Already have an account ?&nbsp;&nbsp;
              <Link to="/auth/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </span>
          </div>
        </Flex>

        <Flex flex={1} className="hidden lg:block">
          <img
            src={singupic}
            className="max-w-full"
            alt="Signup illustration"
          />
        </Flex>
      </div>
    </div>
  );
};

export default Signup;
