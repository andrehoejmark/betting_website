import React from "react"
import styled from "styled-components"

import { connect } from "react-redux";
import * as actions from "../../store/actions/auth"

import ProfileDropdownMenu from "./ProfileDropdownMenu"

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';


var FA = require('react-fontawesome')




class NavBar extends React.Component{
    

    constructor(props){
        super(props)
    }

    logout = () => {
        console.log('logout')
        this.props.onLogout()
        
    }

    render(){
        return(

            <Wrapper>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="#">Bets</a>'
                        
                        <float-right>
    
                            {this.props.isAuthenticated?
                                
                                <React.Fragment>
                                    
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <b className="username"> André Höjmark </b>

                                        <div className="nav-item dropdown">

                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <FA className="fas fa-user-circle"></FA>
                                        </a>

                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <button onClick={this.logout} className="dropdown-item" href="#">Edit Profile</button>
                                        <button onClick={this.logout} className="dropdown-item" href="#">Logout</button>
                                        </div>

                                        </div>
                                    </div>

                                    
                                </React.Fragment>
                                :
                                <div className="sign-up-login">
                                    
                                    <a class="navbar-brand" onClick = {this.props.toggle_login_window_handler}>Login</a>
                                    <a class="navbar-brand" onClick = {this.props.toggle_register_window_handler}>Sign Up</a>
                                    <FA className="fas fa-user-circle"></FA>
                                

                                    

                                    
                                </div>
                            }

                        </float-right>
                    </div>
                </nav>
            </Wrapper>
        )
    }
    

}


const Wrapper = styled.div`

.navbar{
    background-color:  #292b2c;
}
.username{
    color:white;
}

.fa{
    color: white;
    font-size: 24px
}



`

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () =>  dispatch(actions.authLogout())
    }
}

const mapStateToProps = (state) =>  {
    return {
        loading: state.loading, 
        error: state.error
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(NavBar)