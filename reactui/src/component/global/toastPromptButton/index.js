//@flow
import * as React from 'react';
import {Component} from 'react';
import {toast} from 'react-toastify';
import {Jumbotron} from 'reactstrap';

import {
  CommandBarItemAction,
} from 'src/component/appRouter/component/commandBar/component/commandBarItem';
import * as s from 'src/_core/res/strings';
import type {ActionBound, State} from 'src/_core/redux/types';

type propsToastPromptButton = {
  action: ActionBound,
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
      <button onClick={action}>{this.props.textAccept || s.OK}</button>
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

    return <CommandBarItemAction
        glyph={'trash'}
        onClick={this.onClick_ShowPrompt}>
      {s.DELETE}
    </CommandBarItemAction>;
  }

}

export default toastPromptButton;
