import React, { Component } from 'react';
import './App.css';

import StockBox from './StockBox.js';
import Center from './Center.js';

const Container = (props) => {
  return (
    <div className="container">
      <p>Main Container</p>

      <div id="stockBoxLeft">
        <StockBox side="Left" key="LEFT" />
      </div>
      <div className="centerContainer">
        <Center />
      </div>
      <div id="stockBoxRight">
        <StockBox side="Right" key="RIGHT" />
      </div>
    </div>
  );
};
export default Container;
