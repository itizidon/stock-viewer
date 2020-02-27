// @flow
import React, { Component } from 'react';

type Props = {
  lol: 1
};

export default class Stock extends Component<Props>{
  props: Props;

  render() {
    console.log(this.props, 'YOOOOOOOOOOO');
    return (
      <div>
        <div>
          <h2>yooo</h2>
        </div>
      </div>
    );
  }
}
