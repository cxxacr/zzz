import React, { Component } from "react";
import { connect } from "react-redux";
import action from "../../store/actionCreators";
import Qs from "qs";
import {
  queryPetInfo,
  addShoppingCart,
  removeShoppingCart,
} from "../../api/pet";
import { Button } from "antd";
import videoUrl from "../../static/dog.mp4";

export class Info extends Component {
  state = {
    data: null,
    isShop: -1, //-1表示未加入购物车,0表示已加入购物车未支付,1表示已支付
  };
  async componentDidMount() {
    let {
        location: { search },
      } = this.props,
      { petId = 0 } = Qs.parse(search.substr(1)) || {};
    let result = await queryPetInfo(petId);
    this.petId = petId;
    if (parseFloat(result.code) === 0) {
      let { pay, unpay } = this.props.shoppingCart,
        isShop = -1;
      unpay.find((item) => parseFloat(item.id) === parseFloat(petId))
        ? (isShop = 0)
        : null;
      pay.find((item) => parseFloat(item.id) === parseFloat(petId))
        ? (isShop = 1)
        : null;
      this.setState({
        data: result.data,
        isShop,
      });
    }
  }
  handleShopCart = async (ev) => {
    if (this.state.isShop === -1) {
      //=>还未加入购物车（按钮：加入购物车）
      let result = await addShoppingCart(this.petId);
      if (parseFloat(result.code) === 0) {
        //=>DISPATCH派发任务：通知REDUX容器中的购物信息进行更新
        this.props.queryUnPay();

        //=>页面重新展示最新样式
        this.setState({ isShop: 0 });
      }
      return;
    }
    // 已加入购物车

    let result = await removeShoppingCart(this.petId);
    if (parseFloat(result.code) === 0) {
      this.props.queryUnPay(); //=>更新购物车存储的数据
      this.setState({ isShop: -1 });
    }
  };
  render() {
    
    let { data, isShop } = this.state;
    if (!data) return "";
    return (
      <div className="petInfo">
        <video
          src={videoUrl}
          controls
          preload="none"
          className="video"
          poster={data.pic}
        ></video>

        <div className="content">
          <h3>{data.name}</h3>
          <p>{data.dec}</p>
          <span>宠物价格:{data.price}</span>
          {isShop !== 1 ? (
            <Button
              type={isShop === -1 ? "dashed" : ""}
              onClick={this.handleShopCart}
            >
              {isShop === -1 ? "加入购物车" : "从购物车移除"}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state.pet }), action.pet)(Info);
