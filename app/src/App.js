import React, { Component } from 'react'
import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'

import './App.css'

import drizzleOptions from "./drizzleOptions";
import Login from "./components/Login";
import Bottles from "./components/Bottles";
import Transaction from "./components/Transaction";
import Map from './container/Map';

class App extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <DrizzleProvider options={drizzleOptions}>
          <LoadingContainer>{this.renderScreen()}</LoadingContainer>
        </DrizzleProvider>
      </Grommet>
    )
  }
}

export default App
