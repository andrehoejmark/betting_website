import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import './style.css';
import {BrowserRouter as Router} from "react-router-dom"

// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.css'

// START REDUX AUTH
import reducer from './store/reducers/auth'
import { createStore, compose, applyMiddleware} from "redux"
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
// END REDUX AUTH

import {ThemeContextProvider} from './components/ThemeContext'


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhances(
	applyMiddleware(thunk)
))


ReactDom.render(
	<ThemeContextProvider>
		<Provider store={store}>
			<Router>
				<App/>
			</Router>
		</Provider>
	</ThemeContextProvider>,
  document.getElementById("root")
)
