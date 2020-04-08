import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import action from "../../store/actionCreators";

export class PetItem extends Component {
  render() {
    
    let { item, index } = this.props;
    let {isChecked} = item
    return (
      <li key={index}>
        {this.props.input ? (
          <input
            type="checkbox"
            checked={isChecked}
            onChange={this.props.selectAll.bind(this, item.id)}
          />
        ) : (
          ""
        )}
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
  }
}

export default connect((state) => state.pet, action.pet)(PetItem);
