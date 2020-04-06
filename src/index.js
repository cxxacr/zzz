import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "../src/store";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN'

import "./static/css/reset.min.css";
import "./static/css/common.less";
import 'antd/dist/antd.css';

import NavHeader from "./component/NavHeader";
import NavFooter from "./component/NavFooter";

import Home from "./routes/Home";
import Person from "./routes/Person";
import ShoppingCart from "./routes/ShoppingCart";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ConfigProvider locale={zh_CN}>
        <div>
          <NavHeader></NavHeader>

          <main className="container">
            <Switch>
              <Route path="/pet" component={Home}></Route>
              <Route path="/person" component={Person}></Route>
              <Route path="/shoppingCart" component={ShoppingCart}></Route>
              <Redirect to="/pet"></Redirect>
            </Switch>
          </main>

          <NavFooter></NavFooter>
        </div>
      </ConfigProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
