import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import { hot } from 'react-hot-loader';

const Article = (props) => {
  const { story } = props;
  // if NYT
  // return (
  //   <div className="article">
  //     <a href={story.web_url} target="_blank">
  //       {story.headline.main}
  //     </a>
  //     <p>{story.lead_paragraph}</p>
  //   </div>
  // );

  // if API news
  return (
    <div className="article">
      <a href={story.url} target="_blank">
        <div>
          <h3>{story.title}</h3>
        </div>
        <div className="article-imageContainer">
          <img className="newsImage" src={story.urlToImage} />
        </div>

        <div className="article-description">
          <p>{story.description.slice(0, 200) + '...'}</p>
        </div>
      </a>
    </div>
  );
};

export default hot(module)(Article);
