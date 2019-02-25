import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Cancel from "@material-ui/icons/Cancel";
import { Button } from "react-bootstrap";
import { switchBox } from "../../util/func/func";

export class ItemCard extends Component {
  constructor(props) {
    super(props);
    //var id=func.generateSerial(9,36);
    this.state = {
      //_id: id
    };
    this._tag = this.constructor.name;
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  onKeyPress = e => {
    switchBox(e.keyCode, {
      /** Delete */
      46: this.props.closeFn()
    });
  };

  render() {
    let renderElement;
    let data = this.props.data;
    switchBox(
      this.props.type,
      {
        image: () => {
          renderElement = (
            <img className="attachment" src={data.location} alt={data.name} />
          );
        },
        video: () => {
          renderElement = (
            <video className="attachment" controls>
              <source src={data.location} type={data.type} />
              Your browser does not support the video tag.
            </video>
          );
        },
        link: () => {
          renderElement = <link className="attachment" href={data.location} />;
        },
        file: () => {
          renderElement = <div className="attachment">{data.location}</div>;
        }
      },
      (renderElement = () => {
        renderElement = data;
      })
    );
    return (
      <div
        className={this._tag}
        style={{ maxWidth: this.props.width, maxHeight: this.props.height }}
      >
        <Button
          variant="default"
          className={"close"}
          onClick={e =>
            this.props.closeFn(e, this.props.type, this.props.accessKey)
          }
        >
          <Cancel />
        </Button>
        <Card
          className="card"
          style={{ maxWidth: this.props.width }}
          title={data.name}
        >
          <CardContent
            className="content"
            style={{ maxHeight: this.props.height }}
          >
            {renderElement}
            <a className="file-name">{data.name}</a>
          </CardContent>
        </Card>
      </div>
    );
  }

  static propTypes = {
    type: PropTypes.oneOf(["image", "video", "link", "file", "element"]),
    data: PropTypes.object.isRequired,
    accessKey: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    closeButton: PropTypes.bool,
    closeFn: PropTypes.func
  };

  static defaultProps = {
    closeButton: true,
    type: "image",
    width: 150,
    height: 120
  };
}
export default ItemCard;
