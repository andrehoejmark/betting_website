/* eslint eqeqeq: 0 */
import React, { Fragment } from "react";
import styled from "styled-components"
import {Button, Form, FormGroup, Label, Input, Spinner} from "reactstrap";
import { connect } from "react-redux";
import SignupBankID from "../components/Signup/SignupBankID"
import SignupDefault from "../components/Signup/SignupDefault"
import * as actions from "../store/actions/auth"


class SignupPage extends React.Component {

    constructor(props){
		super(props)
		this.state = {
            bankID: false
			
		}
		this.setBankID = this.setBankID.bind(this)
	}

	setBankID(value) {
		this.setState({bankID: value})
	}

    render() {

        return (
			<Fragment>
                {
                    this.state.bankID == true ?
                        <SignupBankID setBankID={this.setBankID}/>
                    :
                        <SignupDefault  setBankID={this.setBankID}/>
				}
			</Fragment>
        )
    }
}



export default SignupPage