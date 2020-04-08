import React, { Component } from "react";
import { connect } from "react-redux";
import PetItem from "./PetItem";
import { Link } from "react-router-dom";
import { Alert, Button } from "antd";
import action from "../../store/actionCreators";
import { removeShoppingCart, payShopCart } from "../../api/pet";
import { checkLogin } from "../../api/person";

export class UnPay extends Component {
  render() {
    console.log(this.props);
    let { unpay } = this.props.shoppingCart;
    if (unpay.length === 0) {
      return (
        <Link to="/pet">
          <Alert
            type="warning"
            description="亲,您还未选购宠物哦,赶紧去选购您心怡的宠物吧~"
            style={{ marginTop: ".2rem" }}
          ></Alert>
        </Link>
      );
    }
    return (
      <div>
        <div
          style={{
            marginTop: ".2rem",
            height: ".7rem",
            lineHeight: ".7rem",
            padding: "0 .1rem",
          }}
        >
          <input
            type="checkbox"
            checked={this.props.allState}
            onChange={this.props.selectAll.bind(this, "all")}
          />
          全选/全不选
          <Button type="dashed" onClick={this.handleRemove}>
            删除
          </Button>
          <Button type="dashed" onClick={this.handlePay}>
            支付
          </Button>
        </div>
        <ul className="petItem">
          {unpay.map((item, index) => {
            return <PetItem item={item} key={index} input={true}></PetItem>;
          })}
        </ul>
      </div>
    );
  }
  handleRemove = () => {
    let storeList = [];
    this.props.shoppingCart.unpay.forEach((item) => {
      if (item.isChecked) {
        storeList.push(item.id);
      }
    });
    if (storeList.length === 0) {
      alert("当前没有要删除的信息哦~");
    }
    storeList = storeList.map((item) => {
      return removeShoppingCart(item);
    });
    Promise.all(storeList).then((item) => {
      this.props.queryUnPay();
    });
  };
  handlePay = async () => {
    let result = await checkLogin();
    if (parseFloat(result.code) !== 0) {
      return alert("亲,您还未登录哦,请先登录呢~");
    }
    let storeList = [];
    this.props.shoppingCart.unpay.forEach((item) => {
      if (item.isChecked) {
        storeList.push(item.storeID);
      }
    });
    if (storeList.length === 0) {
      return alert("亲,您当前并没有在平台购买东西呢~");
    }
    storeList = storeList.map((item) => {
      return payShopCart(item);
    });
    Promise.all(storeList).then((item) => {
      this.props.queryUnPay();
      this.props.queryPay();
    });
  };
}

export default connect((state) => ({ ...state.pet }), action.pet)(UnPay);
