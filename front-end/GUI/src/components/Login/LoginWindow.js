import React, { Fragment } from "react";
import styled from "styled-components"
import {Button, Form, FormGroup, Label, Input, Spinner} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth"



class LoginWindow extends React.Component{
	

	constructor(props){
		super(props)
		this.state = {
			username: "",
			password: ""
		}
	}
	
	//TODO - red text under input
	handleSubmit = () => {
		
		console.log(this.state.username, this.state.password)
		let validPost = true
		if(this.state.username == ""){
			validPost = false
			console.log(validPost)
		}
		if(this.state.password == ""){
			validPost = false
			console.log(validPost)
		}

		if(validPost==true){
			this.props.onAuth(this.state.username, this.state.password)
		}
	}

	setUsername = (e) => {
		this.setState({
			username: e.target.value
		});
	}

	// Only got these two because i thought of reseting them when pressing the X button(closing the loginWindow)
	setPassword = (e) => {
		this.setState({
			password: e.target.value
		});
	}


	render(props){

		let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p> {this.props.error.message} </p>
            )
        }

		if(this.props.isVisible==true && this.props.isAuthenticated){
			this.props.toggle_login_window_handler()
		}

		return(
			<LoginWindowWrapper style={{display: this.props.isVisible ? 'flex' : 'none'}}>
				
				<div className="login-content">
					<div onClick={this.props.toggle_login_window_handler} className="closeLogin">+</div>
					<h1>Login</h1>

					{errorMessage}
					
					<div className="content">
						<FormGroup>
							<Label>Username/Email:</Label>
							<Input type="username" onChange={this.setUsername} value={this.state.username} placeholder="Nickname"></Input>
						</FormGroup>

						<FormGroup>
							<Label>Password:</Label>
							<Input type="password"  onChange={this.setPassword} value={this.state.password} placeholder="Password"></Input>
						</FormGroup>
					
						{
							this.props.loading ?

							<Spinner animation="border" role="status">
								<span className="sr-only center">Loading...</span>
							</Spinner>
						:
						
						<Button onClick={this.handleSubmit} className="btn-lg btn-dark btn-block">Login</Button>
						}
					</div>
				</div>
			</LoginWindowWrapper>
		)
	}
}

const LoginWindowWrapper = styled.div`
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.7);
position: absolute;
z-index: 1;
top: 0;

display: flex;
justify-content: center;
align-items: center;


.login-content{
width: 500px;
height: 400px;
background-color: rgba(255, 255, 255, 1);
border-radius: 4px;
text-align: center;
padding: 20px;
position: relative;

}

.btn-block{
margin-top:30px;
}


.closeLogin{
position:absolute;
top:0;
right: 14px;
font-size: 42px;
transform: rotate(45deg);
cursor: pointer;
}

.content{
padding-top:20px;
text-align: left;
}
`

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow)