import React, { Component } from 'react';
import './App.css';
import News from './news.js';
import StockDropdown from './StockDropdown.js';

const Data = ({ lastPrice, symbol, gains, side, news, newsRequest, favs }) => {
  const gainsPosOrNeg = {};
  if (symbol.length) {
    // giving postive or negative gains different treatment

    Object.entries(gains).forEach((kvPair) => {
      const [ key, value ] = kvPair;

      if (value > 0) {
        gainsPosOrNeg[key] = `+${value}%`;
      } else {
        gainsPosOrNeg[key] = `-${value.slice(1)}%`;
      }
    });
  }
  const stockData = [];
  if (favs.length) {
    stockData.push(<StockDropdown favs={favs} side={side} />);
  }
  return (
    <div
      className={`data innerContainer dataContainer`}
      onMouseEnter={() => newsRequest(symbol)}
      onMouseLeave={() => newsRequest(symbol)}
    >
      {stockData}
      <News side={side} symbol={symbol} news={news} newsRequest={newsRequest} />
      <h1 className={`${side}Cat`}>{symbol}</h1>

      <div
        className={`
          category
          currentPrice
          ${side}Cat
       `}
      >
        {lastPrice}
      </div>

      <div
        className={`
          category
          dayGain
          ${side}Cat
       `}
      >
        {gainsPosOrNeg.day}
      </div>
      <div
        className={`
          category
          weekGain
          ${side}Cat
       `}
      >
        {gainsPosOrNeg.week}
      </div>
      <div
        className={`
          category
          monthGain
          ${side}Cat
       `}
      >
        {gainsPosOrNeg.month}
      </div>
      <div
        className={`
          category
          yearGain
          ${side}Cat
       `}
      >
        {gainsPosOrNeg.year}
      </div>
      <div
        className={`
          category
          fiveYearGain
          ${side}Cat
       `}
      >
        {gainsPosOrNeg.fiveYear}
      </div>
    </div>
  );
};

export default Data;
