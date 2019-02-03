import '../styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route} from 'react-router-dom';

class NavList extends React.Component {
  render() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dist">Show Something</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/else">Show Something else</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/different">Show Something different</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/amazing">Show something amazing!</NavLink>
        </li>
      </ul>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
            <NavList />
            <div className="jumbotron">
              <Route path="/dist" exact render={() => <h3 className="title">Something</h3>}/>
              <Route path="/else" exact render={() => <h3 className="title">Else</h3>}/>
              <Route path="/different" exact render={() => <h3 className="title">Different</h3>}/>
              <Route path="/amazing" exact render={() => <h3 className="title">Amazing</h3>}/>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
