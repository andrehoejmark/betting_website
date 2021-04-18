import React from "react"
import {Route, Switch} from "react-router-dom";

//import NavBar from "./components/NavBar/NavBar"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import DefaultPage from "./pages/DefaultPage"

// Needed for the store
import { connect } from "react-redux";
import * as actions from "./store/actions/auth"

class App extends React.Component {
  
    componentDidMount() {
      this.props.onTryAutoSignup();
    }

    render() {
      return (
        <div {...this.props}>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/sv-se/signup/" component={SignupPage}></Route>
            <Route component={DefaultPage}></Route>
          </Switch>
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)