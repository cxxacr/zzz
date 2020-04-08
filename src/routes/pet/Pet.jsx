import React, { Component } from "react";
import { connect } from "react-redux";
import action from "../../store/actionCreators";
import { Link } from "react-router-dom";
import { Carousel, Icon, Button } from "antd";
export class Pet extends Component {
  componentDidMount() {
    let { bannerData, queryBannerInfo } = this.props;
    !bannerData ? queryBannerInfo() : null;

    let { listData, queryPetList } = this.props;
    if (listData.data.length === 0) {
      queryPetList(); //=>DISPATCH
    }
  }
  queryPetType() {
    let { petType } = this.props;
    let text = "全部课程";
    switch (petType) {
      case "cat":
        text = "宠物猫";
        break;
      case "dog":
        text = "宠物狗";
        break;
      case "pig":
        text = "宠物猪";
        break;
    }
    return text;
  }
  handleClick = () => {
    if (this.state.isLoading) return;
    let { listData, queryPetList, petType } = this.props;
    this.setState({
      isLoading: true,
    });
    console.log(listData);
    queryPetList({
      page: listData.page + 1,
      type: petType,
      flag: 'push',
    });
  };
  componentWillReceiveProps() {
    this.setState({
      isLoading: false,
    });
  }
  state = {
    isLoading: false,
  };
  render() {
    let { bannerData } = this.props;
    let { listData } = this.props;
    return (
      <div className="petBox">
        <Carousel className="petBanner" autoplay>
          {bannerData
            ? bannerData.map((item, index) => {
                return (
                  <div key={index} className="slick-slide">
                    <img src={item.pic} alt={item.name}></img>
                  </div>
                );
              })
            : null}
        </Carousel>
        <div className="petList">
          <div className="petInfo">
            <Icon type="shop" className="petInfoShop"></Icon>
            <h3 className="petInfoTitle">{this.queryPetType()}</h3>
          </div>
          {listData.data && listData.data.length !== 0 ? (
            <div>
              <ul className="petDetaiList">
                {listData.data.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={{
                          pathname: "/pet/info",
                          search: `?petId=${item.id}`,
                        }}
                      >
                        <h3>{item.name}</h3>
                        <div className="content">
                          <div className="pic">
                            <img src={item.pic} alt="" />
                          </div>
                          <div className="desc">
                            <p>{item.dec}</p>
                            <p>价格:{item.price}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Button
                type="primary"
                loading={this.state.isLoading}
                onClick={this.handleClick}
              >
                点击加载更多
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state.pet }), action.pet)(Pet);
