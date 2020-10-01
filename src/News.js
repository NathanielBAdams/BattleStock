import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import { hot } from 'react-hot-loader';
import Article from './Article.js';

class News extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const articles = [];
    for (let i = 0; i < this.props.news.length; i += 1) {
      articles.push(<Article story={this.props.news[i]} key={`article${i}`} />);
    }

    // console.log('news props', this.props);
    // let headline = '';
    // if (this.props.symbol.length >= 3) {
    //   headline = `${this.props.symbol} in the news:`;
    // }
    return <div className={`news ${this.props.side}News`}>{articles}</div>;
  }
}

export default hot(module)(News);
