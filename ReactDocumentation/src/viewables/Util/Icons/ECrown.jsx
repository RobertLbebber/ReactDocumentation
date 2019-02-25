import React, { Component } from "react";
import { FaPoundSign, FaCrown } from "react-icons/fa";
import PropTypes from "prop-types";
// import Icon from "@material-ui/core/Icon";
// import _ from "lodash";

export class ECrown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
  }

  render() {
    return (
      <div className={this.state._tag}>
        <FaCrown
          style={{
            position: "relative",
            fontSize: this.props.fontSize / 6 + this.props.fontUnit,
            top: this.props.fontSize * -1 + this.props.fontUnit,
            left: this.props.fontSize / 1.6 + this.props.fontUnit,
            transform: "scale(2, 1)",
            color: this.props.color
          }}
        />
        <FaPoundSign
          style={{
            fontSize: this.props.fontSize + this.props.fontUnit,
            color: this.props.color,
            transform: "rotateX(180deg)"
          }}
        />
      </div>
    );
  }
  static propTypes = {
    fontSize: PropTypes.number,
    fontUnit: PropTypes.string,
    color: PropTypes.string
  };

  static defaultProps = {
    fontSize: 14,
    fontUnit: "px",
    color: "black"
  };
}
export default ECrown;
