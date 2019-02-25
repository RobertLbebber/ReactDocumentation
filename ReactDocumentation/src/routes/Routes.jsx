import React, { Component } from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Switch } from "react-router-dom";
import LibraryComponents from "../client/LibraryComponents.jsx";

export class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tag: this.constructor.name
    };
    this._isMount = false;
  }

  componentDidMount() {
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    return (
      <div className={this.state._tag}>
        <Router>
          <React.Fragment>
            <div>
              <div className={"main-content"}>
                <Switch>
                  {LibraryComponents.map((indexRoute, i) => {
                    console.log(indexRoute);
                    return (
                      <Route
                        key={i}
                        path={indexRoute.path}
                        render={props => (
                          <React.Fragment>
                            <indexRoute.component {...props} />
                          </React.Fragment>
                        )}
                      />
                    );
                  })}
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </Router>
      </div>
    );
  }

  // static propTypes = {  };

  // static defaultProps = {};
}

export default Routes;
