import React, { Component } from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import Data from './data.js';
import News from './news.js';
import Navbar from './Navbar.js';
import StockDropdown from './StockDropdown.js';

const fetch = require('node-fetch');

class StockBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      currentSymbol: '',
      lastPrice: '',
      news: [],
      gains: {
        day: '-',
        week: '-',
        month: '-',
        year: '-',
        fiveYear: '-'
      }
    };
    this.stockSearch = this.stockSearch.bind(this);
    this.newsRequest = this.newsRequest.bind(this);
  }

  newsRequest(symbol) {
    // boolean here
    if (this.state.news.length) return;
    if (symbol.length < 2) return;
    console.log('news request called');

    // news API
    const today = new Date();
    const url =
      'http://newsapi.org/v2/everything?' +
      `q=${symbol}&` +
      `from=${today}&` +
      'sortBy=popularity&' +
      'apiKey=9caaf5a765a346a5b139e105a6b81947';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const articles = [];
        for (let i = 0; i < 10; i++) {
          articles.push(data.articles[i]);
        }

        // here is where we have news data to play with
        // console.log('article data', articles);

        this.setState({
          ...this.state,
          news: articles
        });
        // console.log(this.state);
      })
      .catch((err) => {
        this.setState({
          news: []
        });
      });
  }

  // new york times API

  // const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${symbol}&api-key=9BSIZH4WVjFgAa3EjV4E4klfRFnxQG9l`;
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const articles = data.response.docs;
  //       // here is where we have news data to play with. at least with the NYT!
  //       console.log('article data', articles);
  //       const newState = this.state;
  //       newState.news = articles;
  //       this.setState(newState);
  //       console.log(this.state);
  //     })
  //     .catch((err) => {
  //       this.setState({
  //         news: []
  //       });
  //     });
  // }

  stockSearch(e) {
    // here, eventually we will add some auto-fill functionality
    if (e.key !== 'Enter') return;
    console.log('stock search called');
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
        // current data versus one week ago
        const dayGain = ((stockData[0].close - stockData[1].close) / stockData[0].close * 100).toFixed(1);
        const weekGain = ((stockData[0].close - stockData[5].close) / stockData[0].close * 100).toFixed(1);
        fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=2S2GW314GW280JWA`
        )
          .then((res) => res.json())
          .then((info) => {
            const monthData = [];
            Object.values(info['Monthly Adjusted Time Series']).forEach((month) => {
              monthData.push(month);
            });

            const currMonth = monthData[0];
            const monthGain = ((currMonth['4. close'] - monthData[1]['4. close']) /
              currMonth['4. close'] *
              100).toFixed(1);
            const yearGain = ((currMonth['4. close'] - monthData[12]['4. close']) /
              currMonth['4. close'] *
              100).toFixed(1);
            const fiveYearGain = ((currMonth['4. close'] - monthData[60]['4. close']) /
              currMonth['4. close'] *
              100).toFixed(1);
            this.setState({
              currentSymbol: symbol.toUpperCase(),
              lastPrice: stockData[0].close,
              lastDate: stockData[0].date.slice(0, 10),
              gains: {
                day: dayGain,
                week: weekGain,
                month: monthGain,
                year: yearGain,
                fiveYear: fiveYearGain
              },
              news: []
            });
          });
        // this.newsRequest(this.state.currentSymbol);
        // console.log(stockData);
      })
      .catch((error) => {
        inputField.textContent = '';
        this.setState({
          currentSymbol: '-',
          lastPrice: '-',
          gains: {}
        });
      });
  }

  render() {
    const sideId = `searchBox${this.props.side}`;

    return (
      <div>
        <div className="stockBox">
          <input
            id={sideId}
            className="searchBox"
            type="text"
            name="fname"
            placeholder="Stock search"
            onKeyDown={(e) => {
              this.stockSearch(e);
            }}
          />

          <Data
            favs={this.props.favs}
            side={this.props.side}
            symbol={this.state.currentSymbol}
            lastPrice={this.state.lastPrice}
            gains={this.state.gains}
            news={this.state.news}
            newsRequest={this.newsRequest}
          />

          {/* <button onClick={this.newsRequest(this.state.currentSymbol)}>Click for news stories</button> */}
        </div>
      </div>
    );
  }
}
export default hot(module)(StockBox);
