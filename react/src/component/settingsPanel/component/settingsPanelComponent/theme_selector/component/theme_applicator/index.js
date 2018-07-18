import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../public/css/*';

class ThemeApplicator extends Component {

  render() {
    const css = `html {
            background:black;
        }`;
    return (
        <div className={'themeApplicator_' + (this.props.themeName || '')}>
          <style>{css}</style>
          {this.props.children}
        </div>
    );
  }

}

const mapStateToProps = (state) => {
  const {themeName} = state.uiStore;
  return {
    themeName,
  };
};

export default connect(mapStateToProps)(ThemeApplicator);
