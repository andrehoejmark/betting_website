import React from "react"
import styled from "styled-components"
import Sidebar from "../components/Sidebar/Sidebar"
import Streamers from "../components/Streamers/Streamers"

class MainContent extends React.Component{
    
    constructor(props){
        super(props)

    }
    
    render(){
        return(
            <Wrapper>
                <div className="main">
                    
                    <div className="left-side">
                        <Sidebar isAuthenticated={this.props.isAuthenticated}/>
                    </div>
                    
                    <div className="middle">
                        <Streamers/>
                    </div>

                </div>


            </Wrapper>
        )
    }
}


const Wrapper = styled.div`

.main{
    display: flex;
}

.left-side{
    float: left;
}

.middle{
    display: inline-block;
    width: 100%;
    height: 100%;
    
    white-space: nowrap;

}

.




`

export default MainContent