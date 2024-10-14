import { Button, Card, Form } from "antd";
import { InputOTP } from "antd-input-otp";
import React from "react";
import "./verifyemil.css";
import OtpInput from "./OptInput";

const VerifyEmail = () => {
  const [form] = Form.useForm();

  // const handleFinish = (values) => {
  //   // The value will be array of string
  //   // Check the field if there is no value, or value is undefined/empty string
  //   const { otp } = values;
  //   if (!otp || otp.includes(undefined) || otp.includes(""))
  //     return form.setFields([
  //       {
  //         name: "otp",
  //         errors: ["OTP is invalid."],
  //       },
  //     ]);

  //   console.log(`OTP: ${otp}`);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <Card  className="shadow-lg p-10 "> */}
        {/* <h2 className="text-2xl font-semibold mb-4 text-center">Enter OTP</h2> */}
        <OtpInput />
      {/* </Card> */}
    </div>

    // {/* <section className="card">
    //   // <main className="app">
    //         <h2>Uncontrolled</h2>
    //         <Form form={form} onFinish={handleFinish}>
    //           <Form.Item
    //             name="otp"
    //             className="center-error-message"
    //             rules={[{ validator: async () => Promise.resolve() }]}
    //           >
    //             <InputOTP autoFocus inputType="numeric" length={6} />
    //           </Form.Item>

    //           <Form.Item noStyle>
    //             <Button block htmlType="submit" type="primary">
    //               Submit
    //             </Button>
    //           </Form.Item>
    //         </Form>
    //         // </main>
    //       // </section> */}
  );
};

export default VerifyEmail;
