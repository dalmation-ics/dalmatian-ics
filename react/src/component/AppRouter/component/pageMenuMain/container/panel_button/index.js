// @flow
import React, {Component} from 'react';
import './public/style.css';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,
} from 'reactstrap';

type props = {
  text: string,
  display: any,
  onClick: () => null | any,
  disabled?: boolean | null,
};

class PanelButton extends Component <props> {

  render() {

    const {
      display,
      text,
      onClick,
      disabled,
    } = this.props;

    return (
        <Card
            onClick={() => {
              if (!disabled && onClick) {
                onClick();
              }
            }}>
          <CardBody>
            {display}
          </CardBody>
          <CardSubtitle>
            {text}
          </CardSubtitle>
        </Card>
    );

  }

}

export default PanelButton;
