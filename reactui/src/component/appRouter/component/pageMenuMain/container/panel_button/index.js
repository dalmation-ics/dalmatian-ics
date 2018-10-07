// @flow
import React, {Component} from 'react';
import {Card, CardBody, CardTitle,} from 'reactstrap';

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
				<CardTitle>
					{text}
				</CardTitle>
			</Card>
		);

	}

}

export default PanelButton;
