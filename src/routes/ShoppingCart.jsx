import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu,Button } from "antd";
import { Switch, Route } from "react-router-dom";
import UnPay from "./myPet/UnPay";
import Pay from "./myPet/Pay";

import "../static/css/shoppingCart.less";

export class ShoppingCart extends Component {
  state = {
    current: this.props.location.pathname === "/shoppingCart/pay" ? "pay" : "unpay",
  };
  render() {
    return (
      <section className="shoppingCart">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="unpay">未支付</Menu.Item>
          <Menu.Item key="pay">已支付</Menu.Item>
        </Menu>
        
        <Switch>
          <Route path="/shoppingCart" exact component={UnPay}></Route>
          <Route path="/shoppingCart/pay" component={Pay}></Route>
        </Switch>
      </section>
    );
  }
  handleClick = (ev) => {
    // 此处的ev是被改写后的ev
    this.setState({
      current: ev.key,
    });
    this.props.history.push(
      ev.key === "pay" ? "/shoppingCart/pay" : "/shoppingCart"
    );
  };
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
