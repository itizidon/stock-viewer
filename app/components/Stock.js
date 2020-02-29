import React, { Component } from "react";
// import axes from "../actions/chart";

type Props = {
  gotPrices: () => void
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
    console.log(this.props);
    return (
      <div>
        <div>
          <form onSubmit={event => this.submitHandler(event)}>
            <input name="quote" />
          </form>
        </div>
        {/* <div
          style={{
            width: "400px",
            height: "300px"
          }}
        >
          <Chart data={data} axes={axes} />
        </div> */}
      </div>
    );
  }
}
