// @flow
import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import type {Theme} from '../../types';
import '../../public/css/dark.css';
import '../../public/css/normal.css';

class ThemeApplicator extends Component<{
  theme: Theme,
  children: React.Node
}> {

  render() {
    let cssClass = 'themeApplicator_default';
    if (this.props.theme !== undefined && this.props.theme !== null)
      cssClass = this.props.theme.name;

    return (
        <div className={cssClass}>
          {this.props.children}
        </div>
    );
  }

}

const mapStateToProps = (state) => {
  const {theme} = state.uiStore;
  return {
    theme,
  };
};

export default connect(mapStateToProps)(ThemeApplicator);
