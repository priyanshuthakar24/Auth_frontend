import React from 'react'
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
import { Link, redirect } from 'react-router-dom';
import singupic from '../../assets/img/login3d.webp'
import useLogin from '../../hooks/useLogin';
import classes from './Login.module.css'
const Login = () => {
    const { error, loading, loginUser } = useLogin()

    const handleLogin = async (values) => {
        await loginUser(values);
        console.log(values);
        redirect('/');
    }
    return (
        <div className={classes.main}>
            <Card >
                <Flex gap='large' align='center'>
                    {/* form */}

                    <Flex vertical flex={1}>
                        <Typography.Title level={3} strong className='title'>
                            Sign In
                        </Typography.Title>
                        <Typography.Text type='secondary' strong className='slogan'>
                            Unlock your world!
                        </Typography.Text>
                        <Form layout='vertical' onFinish={handleLogin} autoComplete='off'>

                            <Form.Item label="Email"
                                name='email'
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please input  email',
                                        }, {
                                            type: 'email',
                                            message: 'The input is not valid Email!'
                                        },
                                    ]} >
                                <Input size='large' placeholder='Enter your  email' />
                            </Form.Item>
                            <Form.Item label="Password"
                                name='password'
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please input your Password',
                                        }
                                    ]} >
                                <Input.Password size='large' placeholder='Enter your Password' />
                            </Form.Item>

                            {
                                error && <Alert description={error} type='error' showIcon
                                    closable
                                    className='alert' />
                            }
                            <Form.Item>
                                <Button
                                    type={`${loading ? '' : 'primary'}`}
                                    htmlType='submit' size='large' className='btn' >
                                    {loading ? <Spin /> : 'Sign In'}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to='/auth/signup'>
                                    <Button size='large' className='btn'>Create an Account
                                    </Button>
                                </Link>
                            </Form.Item>
                            <Form.Item>
                                {/* <Glogin /> */}
                            </Form.Item>
                        </Form>
                    </Flex>
                    {/* image  */}
                    <Flex flex={1}>
                        <img src={singupic} className='auth-img' alt='Login image' />
                    </Flex>
                </Flex >
            </Card >
        </div>
    )
}

export default Login