/* eslint eqeqeq: 0 */
import { Fragment } from "react";
import styled from "styled-components"
import {Button, Form, FormGroup, Label, Input, Spinner} from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth"

var React = require('react');
var QRCode = require('qrcode.react');



class SignupBankID extends React.Component {


    constructor(props){
		super(props)
		this.state = {
			email: "",
			pNum: "",
            bankID: true,
		}
	}


	async componentDidMount() {
		console.log("Component Did Mount!")
		const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

		while(true){
			console.log("values: " + this.props.waiting_bankID + "  " + this.props.orderRef)
			if(this.props.waiting_bankID == true && this.props.orderRef != null){


				this.props.statusBankID(this.props.orderRef)
				
				console.log("Verfication of BankID")
			}
			await sleep(2000)
			console.log('cat')

		}
	}
	


	cancelBankID = (e) => {
        e.preventDefault();
		this.props.cancelBankID()
	}

    handleSubmit = (e) => {
        e.preventDefault();

		let validPost = true
		
		// Add validation if it's a normal personnummer
		
		// Make post request to bankID
			// If accepted bankID number
				// --> every 5s check state again
				// --> past 1 min stop loop (could include count down)
		



		//if(Date().now() - this.props.waiting_bankID_start_time < 180 )
		
		if(validPost==true){
			this.props.onAuth(this.state.pNum)
		}
	}

    setEmail = (e) => {
		this.setState({
			email: e.target.value
		});
	}

	setPNum = (e) => {
		this.setState({
			pNum: e.target.value
		});
	}

    render() {
        
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <i> - {this.props.error.message} </i>
            )
        }

        return (
            <RegisterWindowWrapper>
            
			{
				this.props.waiting_bankID ?

				<div className="waitingBankID">
					<div className="content">

							Du registrerar dig med <br></br>
								<div className="PersonalNumber">{this.state.pNum}</div>
								<br/>
								<div className="title">Mobilt BankID med QR-Kod</div>
								
								{console.log('autoStartToken: ' + this.props.autoStartToken)}
								
								<div className="qr_code">
									<QRCode size={172} value={"bankid:///?autostarttoken=" + this.state.autoStartToken}/>
								</div>
								<br/>

								<div className="qr_code_instructions">
									<b>Instruktioner</b> <br/>
									<ol>
										<li>Öppna BankID-appen</li>
										<li>Tryck på QR-symbolen i BankID-appen</li>
										<li>Rikta kameran mot QR-koden</li>
									</ol>
								</div>
								<br/><br/>

								<button onClick={this.cancelBankID} className="btn-lg btn-dark btn-block cancel-bankID"><b>Avbryt</b> </button>


					</div>
				</div>
				


				:
				<Form className="signup-form">
                        
					<h3>Legitimera dig med mobilt BankID</h3>

					
					<div className="content">

					
					Personnummer {errorMessage}
					<FormGroup>
						<Input type="text" onChange={this.setPNum} className="personnummer" placeholder=""/>
					</FormGroup>
					<br/>
					
					<div className="open-bankID">
						
						<Button onClick={this.handleSubmit} className="btn-lg btn-dark btn-block" >
							Öppna mobilt bankID
						</Button>
						
						<img src="/images/logo1-bankID.svg" className="bankID-logo"/>
						
					</div>


					</div>
						<br/>
						eller fortsätt med <a onClick={()=> this.props.setBankID(false)} href="#">användarnamn och lösenord </a>
				</Form>
			}
 
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

.open-bankID{
	position:relative
}

.bankID-logo{
	position:absolute;
	top:4px;
	left:6px;
	width:40px;
	border-radius: 7px;
	padding: 5px;
	background-color: rgba(255, 255, 255, 1)
}

.signup-form{
    width: 500px;
	height: 300px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 4px;
	text-align: center;
	padding: 20px;
	position: relative;
}

.content{
    padding-top:20px;
    text-align: left;
}

.waitingBankID{
    width: 500px;
	height: 600px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 4px;
	text-align: center;
	padding: 20px;
	position: relative;
}

.title{
	font-size: 1.6em;
	font-weight: bold;
}

.PersonalNumber{
	color: #FF8C00;
	font-size: 1.7em;
	font-weight: bold;
}

.qr_code{
	margin-top: 20px;
	text-align: center;
}

.cancel-bankID{
	margin-top:33px;

}
`

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (pNum) =>  dispatch(actions.authBankID(pNum, "REG")),
		statusBankID: (orderRef) => dispatch(actions.statusBankID(orderRef)),
		cancelBankID: () =>  dispatch(actions.cancelBankID()),
		restoreBankID: () => dispatch(actions.restoreBankID())
    }
}

const mapStateToProps = (state) =>  {
    return {
        error: state.error,
		waiting_bankID: state.waiting_bankID,
		autoStartToken: state.autoStartToken,
		waiting_bankID_start_time: state.waiting_bankID_start_time,
    	orderRef: state.orderRef
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignupBankID)

