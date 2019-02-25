import React, { Component } from "react";
import ItemCard from "./ItemCard";
import PropTypes from "prop-types";

export class ItemBar extends Component {
  static Card = ItemCard;
  constructor(props) {
    super(props);
    this._tag = this.constructor.name;
    this._isMount = false;
  }

  render() {
    return (
      <div className={this._tag + " " + this.props.className}>
        {this.props.children}
      </div>
    );
  }

  static propTypes = {
    children: function(props, propName, componentName) {
      const prop = props[propName];
      let error = null;
      React.Children.forEach(prop, function(child) {
        if (child.type !== ItemCard) {
          error = new Error(
            "`" + componentName + "` children should be of type `ItemCard`."
          );
        }
      });
      return error;
    }
  };

  static propsTypes = { className: PropTypes.string };
  static defaultProps = { className: "" };
}
export default ItemBar;
