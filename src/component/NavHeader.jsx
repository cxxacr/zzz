import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";
import Transition from "react-transition-group/Transition";

const duration = 300,
  defaultStyle = {
    transition: `opacity ${duration}ms`,
    opacity: 0,
  },
  transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
  };
export class NavHeader extends Component {
  state = {
    in: false,
  };
  render() {
    return (
      <header className="NavHeaderBox">
        <div className="NavLogoBox">
          {/* 这块给h1增加内容是为了seo优化 */}
          <div className="NavHomeBox clearfix">
            <h1 className="logo">宠物商店</h1>
            <Icon
              type="unordered-list"
              className="icon"
              style={{ fontSize: ".6rem" }}
              onClick={() => {
                this.setState({
                  in: !this.state.in
                })
              }}
            />
          </div>
          <Transition in={this.state.in} timeout={0}>
            {(state) => {
              return (
                <ul
                  className="filterBox"
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                    display: this.state.in ? "block" : "none",
                  }}
                >
                  <li>全部宠物</li>
                  <li>小猫</li>
                  <li>小狗</li>
                  <li>小猪</li>
                </ul>
              );
            }}
          </Transition>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavHeader)
);
