import '../styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';

class HomeWelcomeMessage extends React.Component {
  render() {
    return <h1>No place like home!</h1>;
  }
}

class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dist">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dist/content">Content</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/features">Features</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="container">
            <div className="jumbotron">
              <Route path="/dist" exact render={() => <HomeWelcomeMessage />}/>
              <Route path="/dist/content" exact render={() => <h1>This is the content page</h1>}/>
              <Route path="/features" exact render={() => <h1>This is the features page</h1>}/>
              <Route path="/contact" exact render={() => <h1>This is the contact page</h1>}/>
            </div>
          </div>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
