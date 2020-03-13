/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Chart } from 'react-charts';
import axes from '../actions/chart';
import styles from './Stock.css';

type Props = {
  gotPrices: func,
  bollingerBandsCalc: func,
  bollingerBandsData: object,
  price: array,
  bbw: array
};

export default class Stock extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.submitHandler = this.submitHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    const { gotPrices } = this.props;
    gotPrices(event.target.quote.value, event.target.days.value);
  }

  clickHandler() {
    const { bollingerBandsCalc, bollingerBandsData } = this.props;
    bollingerBandsCalc(bollingerBandsData);
  }

  render() {
    const { price, bbw } = this.props;
    return (
      <div className={styles.defaultStyle} data-tid="defaultStyle">
        <div className={styles.formStyle} data-tid="formStyle">
          <form onSubmit={event => this.submitHandler(event)}>
            <label>
              Quote:
              <input type="text" name="quote" />
            </label>
            <label>
              Days:
              <input type="number" name="days" />
            </label>
            <input type="submit" />
          </form>
          <div>
            <button type="button" onClick={() => this.clickHandler()}>
              Add BollingerBands
            </button>
          </div>
        </div>
        <div className={styles.chartStyle} data-tid="chartStyle">
          <div
            style={{
              width: '1200px',
              height: '600px'
            }}
          >
            <Chart data={price} axes={axes} />
          </div>
          <div
            style={{
              width: '1200px',
              height: '300px'
            }}
          >
            <Chart data={bbw} axes={axes} />
            Bollinger Bands Width
          </div>
        </div>
      </div>
    );
  }
}
