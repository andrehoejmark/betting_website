
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components"
import NavBar from "../components/NavBar/NavBar"
import LoginWindow from "../components/Login/LoginWindow"
import RegisterWindow from "../components/Signup/RegisterWindow"

import MainContent from "../components/MainContent"


class HomePage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            login_window_visible: false,
            register_window_visible: false
        }


        this.toggle_login_window = this.toggle_login_window.bind(this)
        this.toggle_register_window = this.toggle_register_window.bind(this)
    }


    toggle_login_window() {
        this.setState({
            login_window_visible: !this.state.login_window_visible
        })
    }
    

    toggle_register_window() {
        this.setState({
            register_window_visible: !this.state.register_window_visible
        })
    }


    render() {
        return (
            <div>
                <NavBar toggle_login_window_handler={this.toggle_login_window} toggle_register_window_handler={this.toggle_register_window} isAuthenticated={this.props.isAuthenticated}/>
                <LoginWindow toggle_login_window_handler={this.toggle_login_window} isVisible={this.state.login_window_visible} isAuthenticated={this.props.isAuthenticated}/>
                <RegisterWindow toggle_register_window_handler={this.toggle_register_window} isVisible={this.state.register_window_visible} isAuthenticated={this.props.isAuthenticated}/>
                
                <MainContent isAuthenticated={this.props.isAuthenticated}/>

            </div>
        )
    }
}

const Wrapper = styled.div`

.qr_code{
    width: 100%;
    height: 100%;
    background-color: red;
    text-align:center;
}
`

const mapStateToProps = state => {
    return {
      isAuthenticated: state.token !== null
    }
}
  


export default connect(mapStateToProps)(HomePage)