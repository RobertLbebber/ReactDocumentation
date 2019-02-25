import React, { Component } from "react";
import { Routes } from "./Routes.jsx";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      isOpen: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className={this.state._tag}>
        <Routes />
      </div>
    );
  }

  // static propTypes = {};

  // static defaultProps = {};
}
export default Index;
