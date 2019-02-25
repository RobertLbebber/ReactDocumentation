import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import Chat from "@material-ui/icons/Chat";
import _ from "lodash";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export class FooterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <AppBar
        position="static"
        color="primary"
        className={this.state._tag + " " + classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Button
            variant="contained"
            className={
              this.props.context.activePostEvent
                ? "post-btn active"
                : "post-btn"
            }
            onClick={() => {
              if (this.props.context.activePostEvent) {
                this.props.context.postEvent.deactivate();
              } else {
                this.props.context.postEvent.activate();
              }
            }}
          >
            <Chat />
          </Button>
          <div>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

FooterBar.propTypes = {
  classes: PropTypes.object.isRequired,
  context: PropTypes.object
};

export default withStyles(styles)(FooterBar);
