import React, { Component } from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import Data from './data.js';
import News from './news.js';

const fetch = require('node-fetch');

class StockBox extends Component {
  constructor() {
    super();
    this.state = {
      currentSymbol: '',
      lastPrice: '',
      lastDate: '',
      news: []
    };
    this.stockSearch = this.stockSearch.bind(this);
    this.newsRequest = this.newsRequest.bind(this);
  }

  newsRequest(symbol) {
    console.log('news request called');
    // const today = new Date();
    // const url =
    //   'http://newsapi.org/v2/everything?' +
    //   `q=${symbol}&` +
    //   `from=${today}&` +
    //   'sortBy=popularity&' +
    //   'apiKey=9caaf5a765a346a5b139e105a6b81947';

    fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${symbol}&api-key=9BSIZH4WVjFgAa3EjV4E4klfRFnxQG9l`
    )
      .then((response) => response.json())
      .then((data) => {
        const articles = data.response.docs;
        // here is where we have news data to play with. at least with the NYT!
        console.log('article data', articles);
        const newState = this.state;
        newState.news = articles;
        this.setState(newState);
        console.log(this.state);
      })
      .catch((err) => {
        this.setState({
          news: []
        });
      });
  }

  stockSearch(e) {
    console.log('stock search called');
    // here, eventually we will add some auto-fill functionality
    if (e.key !== 'Enter') return;
    // we can tell which side we're on by using the prop 'side' that we passed down
    const inputField = document.getElementById(`searchBox${this.props.side}`);
    const symbol = inputField.value;

    fetch(`http://api.marketstack.com/v1/eod?access_key=dac42c7f8b92bc6d63b3e1189fdcf7fb&symbols=${symbol}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return;
        }
        const stockData = data.data;
        // this.newsRequest(this.state.currentSymbol);
        // console.log(stockData);
        this.setState({
          currentSymbol: symbol.toUpperCase(),
          lastPrice: stockData[0].close,
          lastDate: stockData[0].date.slice(0, 10)
        });
      })
      .catch((error) => {
        inputField.textContent = '';
        this.setState({
          currentSymbol: 'Not Found!',
          lastPrice: '',
          lastDate: ''
        });
      });
  }

  render() {
    const sideClass = `searchBox${this.props.side}`;

    return (
      <div className="stockBox stockBox">
        <label htmlFor="searchBox" />
        <input
          id={sideClass}
          className={sideClass}
          type="text"
          name="fname"
          placeholder="Stock search"
          onKeyDown={(e) => {
            this.stockSearch(e);
          }}
        />
        <div>
          <Data symbol={this.state.currentSymbol} lastPrice={this.state.lastPrice} lastDate={this.state.lastDate} />
        </div>
        <div>
          <News symbol={this.state.currentSymbol} news={this.state.news} newsRequest={this.newsRequest} />
          {/* <button onClick={this.newsRequest(this.state.currentSymbol)}>Click for news stories</button> */}
        </div>
      </div>
    );
  }
}
export default hot(module)(StockBox);
