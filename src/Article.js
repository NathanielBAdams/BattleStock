import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import { hot } from 'react-hot-loader';

const Article = (props) => {
  const { story } = props;
  return (
    <div className="article">
      <h4>{story.headline.main}</h4>
      <p>{story.lead_paragraph}</p>
    </div>
  );
};

export default hot(module)(Article);
