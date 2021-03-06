import React, { Component } from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import Container from './Container.js';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <div className="title">
          <h1>BattleStocks</h1>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
    );
  }
}

export default App;
