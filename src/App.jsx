import React, { Component } from 'react';
import './App.css';
import PopularContainer from './popular_repos_container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PopularContainer />
      </div>
    );
  }
}

export default App;
