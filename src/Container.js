import React, { Component } from 'react';
import './App.css';

import StockBox from './StockBox.js';
import Center from './Center.js';

const Container = (props) => {
  const { username, loggedIn, favs } = props;
  return (
    <div className="container">
      <div id="stockBoxLeft">
        <StockBox side="left" loggedIn={loggedIn} favs={favs} key="LEFT" />
      </div>
      <div id="centerColumn">
        <Center username={username} />
      </div>
      <div id="stockBoxRight">
        <StockBox side="right" loggedIn={loggedIn} favs={favs} key="RIGHT" />
      </div>
    </div>
  );
};
export default Container;
