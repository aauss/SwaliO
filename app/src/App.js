import React, { Component } from 'react'
import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'
import { Grommet } from 'grommet'
import { grommet } from 'grommet/themes'

import './App.css'

import drizzleOptions from './drizzleOptions'
import MyContainer from './MyContainer'
import Login from './components/Login'
import Bottles from './components/Bottles'
import Transaction from './components/Transaction'
import Map from './container/Map'

const SCREENS = {
  LOGIN: 'login',
  BOTTLES: 'bottles',
  TRANSACTION: 'transaction',
  MAP: 'map'
}

const SIGNER = {
  URL: 'http://localhost:8080'
}

class App extends Component {
  state = {
    screen: SCREENS.LOGIN,
    loading: false
  }

  navigateTo = screen => {
    this.setState({ screen })
  }

  postToEndpoint = (endpoint, data) => {
    return fetch(`${SIGNER.URL}${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  handleClickGo = async address => {
    try {
      this.setState({ loading: true })
      await this.postToEndpoint('/start', { address })
      this.navigateTo(SCREENS.BOTTLES)
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ loading: false })
    }
  }

  renderScreen = () => {
    switch (this.state.screen) {
      case SCREENS.LOGIN:
        return (
          <Login loading={this.state.loading} onClickGo={this.handleClickGo} />
        )
      case SCREENS.BOTTLES:
        return <Bottles />
      case SCREENS.TRANSACTION:
        return <Transaction />
      case SCREENS.MAP:
        return <Map />
      default:
        break
    }
  }

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
