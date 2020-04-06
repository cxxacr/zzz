import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Icon } from "antd";

export class NavFooter extends Component {
  render() {
    return (
      <footer className="NavFooterBox">
        <NavLink to="/pet" activeClassName="active">
          <Icon type="home"></Icon>
          <span>首页</span>
        </NavLink>
        <NavLink to="/shoppingCart" activeClassName="active">
          <Icon type="shopping-cart"></Icon>
          <span>购物车</span>
        </NavLink>
        <NavLink to="/person" activeClassName="active">
          <Icon type="user"></Icon>
          <span>个人中心</span>
        </NavLink>
      </footer>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavFooter));
