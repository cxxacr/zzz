import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { Input, Button, Form, Icon,Modal } from "antd";
import {login} from '../../api/person'
import md5 from 'blueimp-md5'
import action from '../../store/actionCreators'
function loginFail() {
    const modal = Modal.error({
        title: '亲,很遗憾登录失败了~',
        content: '请检测您的用户名和密码是否正确呢~',
    });
}

export class Login extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(err) return console.log(err);
      let {username,password} = values
      password = md5(password)
      let result = await login({
          username,
          password
      })
      if(parseFloat(result.code) === 0){
        this.props.history.go(-1);
        this.props.queryInfo();
        return ;
      } 
      loginFail();
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="loginWrap">
        <div className="loginImg"></div>
        <div className="loginForm">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "亲,这边后台显示您没有输入用户名呢~",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="亲,在这输入您的用户名哦~"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "亲,这边后台显示您没有输入密码呢~",
                  },
                ],
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="亲,输入密码,不要让他人知道哦~"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleSubmit}
              >
                立即登录
              </Button>
              Or <Link to="/person/register">register now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}



export default Form.create()(
  connect(null, action.person)(Login)
);
