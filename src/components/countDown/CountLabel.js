import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import moment from 'moment-jalaali';
import Countdown from 'react-countdown-now';
export default class CountLabel extends Component {
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
          <span>
            {days} روز{' '}
            <Icon flipped="horizontally" name="clock outline" className="" />"
            {seconds} : '{minutes} : {hours}
          </span>
        );
      }
    };
    return (
      <React.Fragment>
        <Button
          className=" mt-2 "
          id="absButton"
          hidden={!(type === 'مزایده' || type === 'مناقصه')}
          size="medium"
          color="orange"
          floated="right"
          basic
          fluid
        >
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
        </Button>
      </React.Fragment>
    );
  }
}
