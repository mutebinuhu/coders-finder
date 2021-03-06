import {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
import {Provider} from 'react-redux'
import Alert from './components/Alert';


const App = () => {
  return(
  <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar/>
      <Route exact path ='/' component={Landing} />
      <section className="container">
      <Alert />

        <Switch>
          <Route exact path ='/login' component={Login} />
          <Route exact path ='/register' component={Register} />

        </Switch>
      </section>
  </Fragment>
  </Router>
    </Provider>
  )
 
}

export default App;
