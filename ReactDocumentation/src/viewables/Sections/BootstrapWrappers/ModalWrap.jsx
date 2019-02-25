import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Modal } from "react-bootstrap";
//import func from '/frontend/src/util/func/func'

export class ModalWrap extends Component {
  constructor(props) {
    super(props);
    this._isMount = false;
    this._tag = this.constructor.name;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    if (this.props.show) {
      let head = this.props.head;
      if (!_.isNil(head) && !(head instanceof Object)) {
        head = <Modal.Title>{head}</Modal.Title>;
      }
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <div className={
            this._tag + " " + !_.isNil(this.props.className)
              ? this.props.className
              : ""
          }>
            {!_.isNil(head) ? (
              <Modal.Header closeButton={this.props.closeButton}>
                {head}
              </Modal.Header>
            ) : null}
            <Modal.Body>{this.props.body}</Modal.Body>
            {!_.isNil(this.props.foot) ? (
              <Modal.Footer>{this.props.foot}</Modal.Footer>
            ) : null}
          </div>
        </Modal>
      );
    } else {
      return null;
    }
  }

  static propTypes = {
    show: PropTypes.bool,
    body: PropTypes.node,
    head: PropTypes.node,
    foot: PropTypes.node,
    className: PropTypes.string,
    closeButton: PropTypes.bool,
    onHide: PropTypes.func.isRequired
  };

  static defaultProps = {
    show: true
  };
}
export default ModalWrap;
