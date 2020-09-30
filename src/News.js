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
    const articles = [];
    for (let i = 0; i < this.props.news.length; i++) {
      articles.push(<Article story={this.props.news[i]} key={`article${i}`} />);
    }

    let headline = '';
    if (this.props.symbol.length >= 3) {
      headline = `${this.props.symbol} in the news:`;
    }
    return (
      <div className="News">
        <div>
          <p>{headline}</p>
          <button onClick={() => this.props.newsRequest(this.props.symbol)}>Click for news</button>
        </div>
        {articles}
      </div>
    );
  }
}

export default hot(module)(News);
