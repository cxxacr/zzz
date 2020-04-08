import React, { Component } from "react";
import { connect } from "react-redux";
import PetItem from "./PetItem";
import { Alert } from "antd";
import { Link } from "react-router-dom";
import { checkLogin } from "../../api/person";

export class Pay extends Component {
  state = {
    isLogin: false,
  };
  async componentDidMount() {
    let result = await checkLogin();
    if (parseFloat(result.code) === 0) {
      this.setState({
        isLogin: true,
      });
    }
  }
  render() {
    let { pay } = this.props.shoppingCart;
    if (!this.state.isLogin) {
      return (
        <Link to="/personal/lgon">
          <Alert
            type="warning"
            description="亲,您还未登录哦~"
            style={{ marginTop: ".2rem" }}
          ></Alert>
        </Link>
      );
    }
    if (pay.length === 0) {
      return (
        <Link to="/pet">
          <Alert
            type="warning"
            description="亲,您还没有在本平台购买过商品呢~"
            style={{ marginTop: ".2rem" }}
          ></Alert>
        </Link>
      );
    }
    return (
      <ul className="petItem">
        {pay.map((item, index) => {
          return <PetItem item={item} index={index}></PetItem>;
        })}
      </ul>
    );
  }
}

export default connect((state) => ({ ...state.pet }), null)(Pay);
