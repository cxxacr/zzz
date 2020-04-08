import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from "antd";
import Transition from "react-transition-group/Transition";
import action from "../store/actionCreators";

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
  handleClick = (ev) => {
    let target = ev.target,
      tagName = target.tagName;
    let { queryPetList } = this.props;
    if (tagName === "LI") {
      let type = target.getAttribute("type");
      queryPetList({
        page: 1,
        type,
        flag: "replace",
      });
    }
    this.setState({
      in: false,
    });
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      in: false,
    };
    this.props.queryPay();
    this.props.queryUnPay();
  }
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
                  in: !this.state.in,
                });
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
                  onClick={this.handleClick}
                >
                  <li type="all">全部宠物</li>
                  <li type="cat">宠物猫</li>
                  <li type="dog">宠物狗</li>
                  <li type="pig">宠物猪</li>
                </ul>
              );
            }}
          </Transition>
        </div>
      </header>
    );
  }
}

export default withRouter(connect(null, action.pet)(NavHeader));
