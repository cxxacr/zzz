import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Select, Button,Modal } from "antd";
import md5 from 'blueimp-md5'
import {register} from '../../api/person'
import action from '../../store/actionCreators'
function registerFail() {
    const modal = Modal.error({
        title: '亲,很遗憾注册失败了~',
        content: '有可能是服务器崩了哦,麻烦稍后再试呢~',
    });
}
export class Register extends Component {
  state = {
    confirmDirty: false,
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码不一样哦!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if(err) return console.log(err);
      let {username,password,email,phone} = values;
      password = md5(password);
      let result = await register({
          username,
          password,
          email,
          phone
      })
      if(parseFloat(result.code) === 0){
          this.props.history.push('/person');
          this.props.queryInfo();
          return 
      }
      registerFail();
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className="registerBox">
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label="用户名">
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "亲,请输入用户名哦!" }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "亲,您的邮箱格式不正确呢~",
                },
                {
                  required: true,
                  message: "亲,请输入邮箱哦!",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "亲,请输入密码哦!",
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "亲,请确认密码哦!",
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label="电话号码">
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "亲,请输入您的电话号码哦!" }],
            })(<Input />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default Form.create()(
  connect(null,action.person )(Register)
);
