
import { readyException } from "jquery"
import React, {useState} from "react"
import styled from "styled-components"
import {Link} from 'react-router-dom'

var FA = require('react-fontawesome')


export default class Sidebar extends React.Component{

    constructor(props){
        super(props)

    }

    render(){

            return(

                <Wrapper>
                    <div className="menu" style={{width: this.props.isAuthenticated ?  "280px": "0px"}}>

                        <div className="menu-items">
                            <div className="menu-item">
                                <Link className='text-link' to="#">
                                    <FA className='fas fa-home'/>
                                    <span className="text">Home</span>
                                </Link>
                            </div>

                            <div className="menu-item">
                                <Link className='text-link' to="#">
                                    <FA className='fas fa-list'/>
                                    <span className="text">Active Bets</span>
                                </Link>
                            </div>

                            <div className="menu-item">
                                <Link className='text-link' to="#">
                                    <FA className='fas fa-inbox'/>
                                    <span className="text">Inbox</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </Wrapper>

            )
    }
}


const Wrapper = styled.div`

.menu{
    position: fixed;
    
    height: 94.5vh;
    background-color: #292b2c;

    font-size: 18px;
    
}

.menu-items{
    padding-top:20px;
}

.menu-item{
    display: flex;
    padding: 5px;
    margin-left:20px;
    margin-right:15px;
    border-radius: 4px;
    
}

.text{
    margin: 25px;
}

.menu-item:hover{
    background-color: blue;
}

}

.text-link{
    color: white;
    text-decoration: inherit;
}

`