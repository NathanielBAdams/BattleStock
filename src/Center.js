import React, { Component } from 'react';
import './App.css';

class Center extends Component {
  constructor(props) {
    super(props);
  }

  hoverCompare(e) {
    try {
      // we need to grab the adjacent elements
      const gainClass = e.target.className.split(' ')[2];
      if (gainClass === 'versus') return;
      const isPrice = gainClass === 'currentPrice' ? true : false;

      const gains = document.querySelectorAll(`.${gainClass}`);
      const gainsMap = {};
      gains.forEach((gainNum) => {
        if (!gainNum.classList.contains('center-category') && gainNum.textContent.length > 0) {
          if (gainsMap['left']) {
            gainsMap['right'] = gainNum;
          } else {
            gainsMap['left'] = gainNum;
          }
        }
      });
      const { left, right } = gainsMap;
      let leftOperand, rightOperand, leftPrice, rightPrice;
      // if we're in the currentPrice category, we don't need to check for operands
      if (isPrice) {
        // console.log('currentPrice center comparison');
        leftPrice = Number(left.innerText);
        rightPrice = Number(right.innerText);
      } else {
        leftOperand = left.innerText.charAt(0) === '-' ? '-' : ' ';
        rightOperand = right.innerText.charAt(0) === '-' ? '-' : ' ';
        leftPrice = Number(leftOperand + left.innerText.slice(1, left.innerText.length - 1));
        rightPrice = Number(rightOperand + right.innerText.slice(1, right.innerText.length - 1));
      }

      // console.log(`leftPrice: ${leftPrice} -  rightPrice: ${rightPrice}`);
      // console.log(`left: ${left} -  right: ${right}`);
      if (leftPrice > rightPrice) {
        left.classList.toggle('winner');
        right.classList.toggle('loser');
      } else {
        right.classList.toggle('winner');
        left.classList.toggle('loser');
      }
    } catch (error) {
      console.log('error in determining winner class. probably because data is missing on one or both sides');
    }
  }
  render() {
    return (
      <div>
        <div className="buffer" />
        <div className="centerContainer">
          <h1 className="category center-category versus">-- VS --</h1>
          <h3
            onMouseEnter={(e) => this.hoverCompare(e)}
            onMouseLeave={(e) => this.hoverCompare(e)}
            className="category center-category currentPrice"
          >
            Current Price
          </h3>
          <h3
            onMouseEnter={(e) => this.hoverCompare(e)}
            onMouseLeave={(e) => this.hoverCompare(e)}
            className="category center-category dayGain"
          >
            Day
          </h3>
          <h3
            onMouseEnter={(e) => this.hoverCompare(e)}
            onMouseLeave={(e) => this.hoverCompare(e)}
            className="category center-category weekGain"
          >
            Week
          </h3>
          <h3
            onMouseEnter={(e) => this.hoverCompare(e)}
            onMouseLeave={(e) => this.hoverCompare(e)}
            className="category center-category monthGain"
          >
            Month
          </h3>
          <h3
            onMouseEnter={(e) => this.hoverCompare(e)}
            onMouseLeave={(e) => this.hoverCompare(e)}
            className="category center-category yearGain"
          >
            Year
          </h3>
          <h3
            onMouseEnter={(e) => this.hoverCompare(e)}
            onMouseLeave={(e) => this.hoverCompare(e)}
            className="category center-category fiveYearGain"
          >
            5 Year
          </h3>
        </div>
      </div>
    );
  }
}
export default Center;
