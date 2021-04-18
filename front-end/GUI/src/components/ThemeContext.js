import React, {createContext, Component } from "react"


export const ThemeContext = createContext();


export class ThemeContextProvider extends Component {
		
	state = {
		loginWindowShown: false,
		registerWindowShown: false
	}

	toggleLoginWindow = () => {
		this.setState({loginWindowShown: !this.state.loginWindowShown})
	}

	toggleRegisterWindow = () => {
		console.log("register shown: " + this.state.registerWindowShown)
		this.setState({registerWindowShown: !this.state.registerWindowShown})
	}
	
	render(){
		return(
			<ThemeContext.Provider value={{...this.state, toggleLoginWindow:this.toggleLoginWindow, toggleRegisterWindow:this.toggleRegisterWindow}}>
				{this.props.children}
			</ThemeContext.Provider>
		)
	}
}




