import React, { useState } from 'react';
import { Input, Space, Button, message, Form } from 'antd';
import '../../assets/styles/login.scss';
import { UserOutlined, LockOutlined, CommentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginAPI, RegisterAPI } from '../../request/api/index';
import LoginIcon from '../../assets/image/loginIcon.png'

const  Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Flag, setFlag] = useState(true);

  const [usernameValue, setusernameValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");

  const [RegisterusernameValue, setRegisterusernameValue] = useState("");
  const [RegisterPasswordValue, setRegisterPasswordValue] = useState("");
  const [RegisterEmailValue, setRegisterEmail] = useState("");
  const [ConfirmPasswordValue, setConfirmPasswordValueChange] = useState("");

  const usernameChange = (e) => {
    setusernameValue(e.target.value);
  };

  const PasswordValueChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const RegisterusernameChange = (e) => {
    setRegisterusernameValue(e.target.value);
  };

  const RegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  const RegisterPasswordValueChange = (e) => {
    setRegisterPasswordValue(e.target.value);
  };

  const ConfirmPasswordValueChange = (e) => {
    setConfirmPasswordValueChange(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (Flag) {
        gotologin();
      } else {
        Login();
      }
    }
  };

  const gotologin = () => {
    if (!usernameValue.trim() || !PasswordValue.trim()) {
      return;
    }
    const params = { username: usernameValue, password: PasswordValue };
    LoginAPI(params).then(res => {
      // console.log(res)
      if (res.data.code === 200) {
        message.success("登录成功");
        sessionStorage.setItem("loginFlag", true);
        sessionStorage.setItem("username", usernameValue);
        dispatch({ type: 'set_loginFlag', payload: true });
        dispatch({ type: 'set_username', payload: usernameValue });
        navigate('/home');
      } else {
        message.error("用户名或密码错误");
      }
    }).catch(error => {
      message.error("请求失败");
      console.log(error);
    });
  };

  const gotoregister = () => {
    setFlag(!Flag);
  };

  const Login = () => {
    if (!RegisterusernameValue.trim() || !RegisterPasswordValue.trim() || !RegisterEmailValue.trim() || !ConfirmPasswordValue.trim()) {
      return;
    }
    if (RegisterPasswordValue !== ConfirmPasswordValue) {
      message.error('密码与确认密码不一致');
      return;
    }
    const params = { username: RegisterusernameValue, password: RegisterPasswordValue, email: RegisterEmailValue };
    RegisterAPI(params).then(res => {
      if (res.data.code === 200) {
        message.success("注册成功");
        setFlag(!Flag);
      } else if(res.data.code === 199) {
        message.error("用户名已存在");
      }else if(res.data.code === 198){
        message.error("邮箱已存在")
      }else{
        message.error("注册失败")
      }
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <div className='login'>
      <div className='background'></div>
      <div className='loginPage'>
        <div className='loginBox'>
          <div className='title' style={{ color: 'white' }}>
            <img src={LoginIcon} alt='图标'  className='loginIcon'/> 
            <h1>Sunsimiao</h1>
          </div>
          <div className='subtitle'>
            <h2>欢迎登录孙思邈医疗平台</h2>
          </div>
          <div className='form' onKeyDown={handleKeyPress}>
            {Flag ? (
              <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Form>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                  >
                    <Input autoComplete="off" placeholder="用户名" prefix={<UserOutlined className="site-form-item-icon" />} onChange={usernameChange} className='usernameinput' />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input.Password placeholder="密码" prefix={<LockOutlined className="site-form-item-icon" />} onChange={PasswordValueChange} className='usernameinput' />
                  </Form.Item>
                  <Form.Item>
                    <div className='btn'>
                      <Button type="primary" htmlType="submit" className='loginBtn' onClick={gotologin}>登录</Button>
                      <Button type="primary" className='registeredBtn' onClick={gotoregister}>注册</Button>
                    </div>
                  </Form.Item>
                </Form>
              </Space>
            ) : (
              <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Form>
                  <Form.Item
                    name="regusername"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                  >
                    <Input placeholder="用户名" prefix={<UserOutlined className="site-form-item-icon" />} onChange={RegisterusernameChange} className='usernameinput' />
                  </Form.Item>
                  <Form.Item
                    name="reguseremail"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                  >
                    <Input placeholder="邮箱" prefix={<CommentOutlined className="site-form-item-icon" />} onChange={RegisterEmailChange} className='usernameinput' />
                  </Form.Item>
                  <Form.Item
                    name="regpassword"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input.Password placeholder="密码" prefix={<LockOutlined className="site-form-item-icon" />} onChange={RegisterPasswordValueChange} className='usernameinput' />
                  </Form.Item>
                  <Form.Item
                    name="confirmpassword"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input.Password placeholder="确认密码" prefix={<LockOutlined className="site-form-item-icon" />} onChange={ConfirmPasswordValueChange} className='usernameinput' />
                  </Form.Item>
                  <Form.Item>
                    <div className='btn'>
                      <Button type="primary" htmlType="submit" className='registeredBtn' onClick={Login}>注册</Button>
                    </div>
                  </Form.Item>
                </Form>
              </Space>
            )}
          </div>
          <div className='loginfooter'>
            版权所有@心动实验室(X-Lab)
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
