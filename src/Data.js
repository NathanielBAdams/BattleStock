import React, { Component } from 'react';
import './App.css';

const Data = ({ lastPrice, symbol, lastDate }) => (
  <div className="data">
    <h1>
      <strong>{symbol}</strong>
    </h1>
    <h2>Latest price: ${lastPrice}</h2>
    <h5>Stored on: {lastDate}</h5>
  </div>
);

export default Data;
