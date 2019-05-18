import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";

import './App.css'

import Login from "./components/Login";
import Bottles from "./components/Bottles";
import Transaction from "./components/Transaction";
import Map from './container/Map';
import drizzleOptions from "./drizzleOptions"

class App extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <DrizzleProvider options={drizzleOptions}>
          <LoadingContainer>
            <Router>
              <Route path="/" exact component={Login} />
              <Route path="/process/" component={Bottles} />
              <Route path="/transaction/" component={Transaction} />
              <Route path="/map/" component={Map} />
            </Router>
          </LoadingContainer>
        </DrizzleProvider>
      </Grommet>
    )
  }
}

export default App
