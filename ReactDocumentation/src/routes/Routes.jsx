import React, { Component } from "react";
import _ from "lodash";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { Switch } from "react-router-dom";
import indexRoutes from "./routes.js";

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
              <Sidebar
                displayType={"standard"}
                routes={indexRoutes}
                account={heart.account}
              />
              <div className={"main-content"}>
                <Switch>
                  {indexRoutes.map(indexRoute => (
                    <Route
                      exact={indexRoute.exact}
                      key={indexRoute.name}
                      path={indexRoute.path}
                      render={props => (
                        <React.Fragment>
                          <indexRoute.component {...props} {...heart.account} />
                          <Footer />
                        </React.Fragment>
                      )}
                    />
                  ))}
                </Switch>
              </div>
            </div>
          </React.Fragment>
          ) }
        </Router>
      </div>
    );
  }

  // static propTypes = {  };

  // static defaultProps = {};
}

export default Routes;
