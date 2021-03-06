//@flow
import * as React from 'react';
import {Component} from 'react';
import {toast} from 'react-toastify';
import {Jumbotron} from 'reactstrap';
import type {ActionBound} from 'src/_core/redux/types';
import * as s from 'src/_core/res/strings';

import {CommandBarItemAction,} from 'src/component/global/commandBar/component/commandBarItem';

type propsToastPromptButton = {
	action: ActionBound,
	textButtonTitle: string,
	children?: Array<React.Element<any>> | React.Element<any> | string | any,
	textCancel?: string,
	textAccept?: string
};

class toastPromptButton extends Component<propsToastPromptButton> {

	displayPrompt: React.Element = ({closeToast}: { closeToast: () => any }) => {
		let {children, action} = this.props;
		return <div>
			<Jumbotron>
				{children}
			</Jumbotron>
			<button onClick={closeToast}>{this.props.textCancel || s.CANCEL}</button>
			<button onClick={(e) => {
				action(e);
				closeToast();
			}}>{this.props.textAccept || s.OK}</button>
		</div>;
	};

	onClick_ShowPrompt = () => {
		toast(this.displayPrompt,
			{
				position: toast.POSITION.TOP_CENTER,
				autoClose: 60000,
				closeButton: false,
				draggable: false,
				draggablePercent: 50,
				type: toast.TYPE.WARNING,
				closeOnClick: false,
			});
	};

	render() {
		const {textButtonTitle} = this.props;
		return <CommandBarItemAction
			glyph={'trash'}
			onClick={this.onClick_ShowPrompt}>
			{textButtonTitle}
		</CommandBarItemAction>;
	}

}

export default toastPromptButton;
