import React, { Component } from 'react';
import moment from 'moment-jalaali';
import Countdown from 'react-countdown-now';

export default class CountText extends Component {
  render() {
    const { exp, type } = this.props;
    const Completionist = () => <span>{type} به اتمام رسید</span>;
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <h4 className="count-text-s8">
            {days} روز و {hours}:{minutes}:{seconds}
          </h4>
        );
      }
    };
    return (
      <React.Fragment>
        <Countdown
          date={
            Date.now() +
            moment(
              moment(exp, 'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm:ss')
            ).valueOf() -
            moment(new Date()).valueOf()
          }
          renderer={renderer}
        >
          <Completionist />
        </Countdown>
      </React.Fragment>
    );
  }
}
