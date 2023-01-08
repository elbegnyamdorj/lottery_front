import './App.css';
import Main from './components/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/admin';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      count: 8,
    };

    console.log(this.state.count);
  }
  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }
  setCount = (e) => {
    return this.setState({ ...this.state, count: e.target.value });
  };
  render() {
    return (
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={<Main numOfinp={this.state.count} />}
          />
          <Route
            exact
            path='/admin/'
            element={
              <Admin onSearch={this.setCount} count={this.state.count} />
            }
          />
        </Routes>
      </Router>
    );
  }
}
export default App;
