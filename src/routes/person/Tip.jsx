import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button } from "antd";
import { withRouter } from "react-router-dom";

export class Tip extends Component {
  render() {
    return (
      <div className="wrap">
        <section className="warning">
          <Alert
            message="啊哦,这边好像遇到了一些问题呢~"
            description="亲,这边后台显示您还登陆哦,请先登录再选购您心仪的宠物吧~"
            type="warning"
            className="warningAlert"
          />
          <div className="wrong"></div>
          <Button
            type="dashed"
            className="left"
            block
            onClick={(ev) => {
              this.props.history.push("/person/register");
            }}
          >
            立即注册
          </Button>
          <Button
            type="dashed"
            className="right"
            block
            onClick={(ev) => {
              this.props.history.push("/person/login");
            }}
          >
            立即登录
          </Button>
        </section>
        <div className="imgBg"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tip));
