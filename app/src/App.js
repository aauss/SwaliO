import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
// import { grommet } from 'grommet/themes'
import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'

import './App.css'

import Login from './components/Login'
import Bottles from './components/Bottles'
import Transaction from './components/Transaction'
import Map from './container/Map'
import Graphs from './container/Graphs'
import drizzleOptions from './drizzleOptions'

import logo from './images/logo.png'
import background from './images/background.jpg'

const baseStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

const imageStyle = {
  minWidth: '450px',
  display: 'flex',
  justifyContent: 'center'
}

const colors = {}
colors['accent-1'] = '#E87D10'

const grommetTheme = {
  global: {
    colors,
    font: {
      weight: 'bold',
      shadow: 'white 5px 5px'
    }
  }
}

class App extends Component {
  render() {
    return (
      <Grommet theme={grommetTheme} style={baseStyle}>
        {window.location.pathname !== '/map' &&
          window.location.pathname !== '/graphs' && (
            <div style={imageStyle}>
              <img src={logo} alt="logo" height="500px" />
            </div>
          )}
        <DrizzleProvider options={drizzleOptions}>
          <LoadingContainer>
            <Router>
              <Route path="/" exact component={Login} />
              <Route path="/process/" component={Bottles} />
              <Route path="/transaction/" component={Transaction} />
              <Route path="/map/" component={Map} />
              <Route path="/graphs/" component={Graphs} />
            </Router>
          </LoadingContainer>
        </DrizzleProvider>
      </Grommet>
    )
  }
}

export default App
