// @flow
import React, {Component} from 'react';
import './App.css';

type Props = {};

class App extends Component<Props> {
  static defaultProps: Props;

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to
            reload.
          </p>
        </div>
    );
  }
}

export default App;
