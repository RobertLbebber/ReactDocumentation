import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class FeedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name,
      expanded: false
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={this.state._tag}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              !_.isNil(this.props.content.profileImgLoc) ? (
                <Avatar
                  aria-label="Profile Icon"
                  className={"avatar " + classes.avatar}
                  alt={this.props.content.profileName}
                  src={this.props.content.profileImgLoc}
                />
              ) : (
                <Avatar
                  aria-label="Profile Icon"
                  className={"avatar " + classes.avatar}
                >
                  {this.props.content.profileName[0]}
                </Avatar>
              )
            }
            action={
              <IconButton
                onClick={e => {
                  if (!_.isNil(this.props.menuButton)) {
                    this.props.menuButton(e);
                  }
                }}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={
              !_.isNil(this.props.content.title)
                ? this.props.content.title
                : null
            }
            subheader={
              !_.isNil(this.props.content.date)
                ? this.props.content.date
                : false
            }
          />
          {!_.isNil(this.props.content.imgLoc) ? (
            <CardMedia
              className={classes.media}
              image={this.props.content.imgLoc}
              title={
                _.isNil(this.props.content.imgTooltip)
                  ? this.props.content.imgTooltip
                  : null
              }
            />
          ) : null}
          <CardContent>
            <Typography component="p">{this.props.content.mainText}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Like"
              onClick={e => {
                if (!_.isNil(this.props.likeButton)) {
                  this.props.likeButton(e);
                }
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              aria-label="Share"
              onClick={e => {
                if (!_.isNil(this.props.shareButton)) {
                  this.props.shareButton(e);
                }
              }}
            >
              <ShareIcon />
            </IconButton>
            {!_.isNil(this.props.content.additionalText) ? (
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            ) : null}
          </CardActions>
          {!_.isNil(this.props.content.additionalText) ? (
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {_.map(this.props.content.additionalText, (paragraph, i) => (
                  <Typography paragraph key={i}>
                    {paragraph}
                  </Typography>
                ))}
              </CardContent>
            </Collapse>
          ) : null}
        </Card>
      </div>
    );
  }
}

FeedCard.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.shape({
    additionalText: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
    imgLoc: PropTypes.string,
    imgTooltip: PropTypes.string,
    mainText: PropTypes.string,
    title: PropTypes.string,
    profileImgLoc: PropTypes.string,
    profileName: PropTypes.string
  }).isRequired, //TODO: add shape,

  //Optional
  menuButton: PropTypes.func,
  likeButton: PropTypes.func,
  shareButton: PropTypes.func
};
FeedCard.defaultProps = {
  menuButton: null,
  likeButton: null,
  shareButton: null
};

export default withStyles(styles)(FeedCard);
