import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Register from "./person/Register";
import Login from "./person/Login";
import Tip from "./person/Tip";
import Info from "./person/Info";

import '../static/css/person.less'

import { checkLogin } from "../api/person";

export class Person extends Component {
  state = {
    isLogin: false,
  };
  async componentDidMount() {
    let result = await checkLogin();
    let isLogin = false;
    if (parseFloat(result.code) === 0) {
      isLogin = true;
    } else {
      isLogin = false;
    }
    this.setState({
      isLogin,
    });
  }
  async componentWillReceiveProps(){
    let result = await checkLogin();
    let isLogin = false;
    if (parseFloat(result.code) === 0) {
      isLogin = true;
    } else {
      isLogin = false;
    }
    this.setState({
      isLogin,
    });
  }
  render() {
    return (
      <section>
        <Switch>
          <Route
            path="/person/info"
            render={() => {
              if (this.state.isLogin) {
                return <Info></Info>;
              }
              return <Tip></Tip>;
            }}
          ></Route>
          <Route path="/person/login" component={Login}></Route>
          <Route path="/person/register" component={Register}></Route>
          <Redirect from="/person" to="/person/info"></Redirect>
        </Switch>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
