import React, { Component } from "react";
import { Modal, Loader } from "semantic-ui-react";

export default class ScrollLoader extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal
          basic
          dimmer="inverted"
          open={this.props.open}
          closeOnDimmerClick={false}
          size="large"
          className="center fadeIn animated"
        >
          <Modal.Content className="fadeIn animated p-5">
            <Loader>لطفا صبر کنید...</Loader>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}
