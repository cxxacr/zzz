import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Avatar } from "antd";
import { logOut } from "../../api/person";
import { withRouter } from "react-router-dom";
import action from "../../store/actionCreators";
import imgHeadURL from '../../static/images/logo.jpeg';
import imgBgURL from '../../static/images/head.jpg';
const { Meta } = Card;
export class Info extends Component {
  componentDidMount() {
    const { baseInfo, queryInfo } = this.props;
    !baseInfo ? queryInfo() : null;
  }
  render() {
    if (!this.props.baseInfo) return "";
    const { username, phone } = this.props.baseInfo;
    return (
      <div className="personBaseInfo">
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src={imgHeadURL}
            />
          }
          actions={[
            <Icon type="setting" key="setting" />,
            <Icon type="edit" key="edit" />,
            <Icon
              type="logout"
              key="退出"
              onClick={async (ev) => {
                let result = await logOut();
                if (result.code === 0) {
                  this.props.history.push("/person");
                }
              }}
            />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src={imgBgURL} />
            }
            title={username}
            description={phone}
          />
        </Card>
      </div>
    );
  }
}

export default withRouter(
  connect((state) => ({ ...state.person }), action.person)(Info)
);
