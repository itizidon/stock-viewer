import React, { Component } from 'react';
import { Chart } from 'react-charts';
import axes from '../actions/chart';

type Props = {
  gotPrices: () => void,
  price: array
};

export default class Stock extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    const { gotPrices } = this.props;
    gotPrices(event.target.quote.value);
  }

  render() {
    const { price } = this.props;
    return (
      <div>
        <div>
          <form onSubmit={event => this.submitHandler(event)}>
            <input name="quote" />
          </form>
        </div>

        <div
          style={{
            width: '1400px',
            height: '800px'
          }}
        >
          <Chart
            data={[
              {
                label: 'Series 1',
                data: price
              }
            ]}
            axes={axes}
          />
        </div>
      </div>
    );
  }
}
