import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import { hot } from 'react-hot-loader';

const StockDropdown = (props) => {
  const favStocks = [];
  for (let i = 0; i < props.favs.length; i++) {
    favStocks.push(
      <div>
        <p key={i}>{props.favs[i]}</p>
      </div>
    );
  }
  return (
    <div className={`dropdown dropdown${props.side}`}>
      <button className="dropbtn">
        <p className="fav-labls">V</p>
      </button>
      <div className="dropdown-content">{favStocks}</div>
    </div>
  );
};

export default hot(module)(StockDropdown);
