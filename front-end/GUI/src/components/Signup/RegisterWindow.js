
import React, { Fragment } from "react";
import styled from "styled-components"
import {Button, Form, FormGroup, Label, Input, Spinner} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth"


class RegisterWindow extends React.Component {
    
	constructor(props){
		super(props)
		this.state = {
            email: "",
			username: "",
            password1: "",
			password2: "",
		}
	}

	handleSubmit = (e) => {
        e.preventDefault();

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

			console.log(this.state.username, this.state.email, this.state.password1, this.state.password2)
			this.props.onAuth(this.state.username, this.state.email, this.state.password1, this.state.password2)
		}
	}

    setEmail = (e) => {
		this.setState({
			email: e.target.value
		});
	}

    setUsername = (e) => {
		this.setState({
			username: e.target.value
		});
	}

	setPassword1 = (e) => {
		this.setState({
			password1: e.target.value
		});
	}

    setPassword2 = (e) => {
		this.setState({
			password2: e.target.value
		});
	}


    render() {

		let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p> {this.props.error.message} </p>
            )
        }

		if(this.props.isVisible==true && this.props.isAuthenticated){
			this.props.toggle_register_window_handler()
		}

        return (
            <RegisterWindowWrapper style={{display: this.props.isVisible ? 'flex' : 'none'}}>
				<div className="register-content">
					<div onClick={this.props.toggle_register_window_handler} className="closeRegister">+</div>
					
					<Form className="signup-form">
                            <h1>Sign Up</h1>

                            {errorMessage}
                            <div className="content">
                                
                                <FormGroup>
                                    <Label>Nickname:</Label>
                                    <Input type="username" onChange={this.setUsername} value={this.state.username} placeholder="Nickname"></Input>
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label>Email:</Label>
                                    <Input type="email" onChange={this.setEmail} value={this.state.email} placeholder="Email"></Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password:</Label>
                                    <Input type="password"  onChange={this.setPassword1} value={this.state.password1} placeholder="Password"></Input>
                                </FormGroup>

                                <FormGroup>
                                    <Input type="password"  onChange={this.setPassword2} value={this.state.password2} placeholder="Confirm Password"></Input>
                                </FormGroup>
                            
                                {
                                    this.props.loading ?

                                    <Spinner animation="border" role="status">
                                        <span className="sr-only center">Loading...</span>
                                    </Spinner>
                                :
								
                                <Button onClick={this.handleSubmit} className="btn-lg btn-dark btn-block">Sign Up</Button>
                                }

                            </div>
                        </Form>
						
				</div>
			</RegisterWindowWrapper>
        )
    }
}



const RegisterWindowWrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.7);
	position: absolute;
	z-index: 1;
	top: 0;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	
.register-content{
	width: 500px;
	height: 540px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 4px;
	text-align: center;
	padding: 20px;
	position: relative;
	
}

.btn-block{
	margin-top:30px;
}


.closeRegister{
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

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) =>  dispatch(actions.authRegister(username, email, password1, password2))
    }
}

const mapStateToProps = (state) =>  {
    return {
        loading: state.loading, 
        error: state.error
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(RegisterWindow)