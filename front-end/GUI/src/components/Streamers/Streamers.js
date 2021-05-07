import react from "react"
import styled from "styled-components"


import Streamer from "./Streamer"






class Streamers extends react.Component{



    constructor(props){
        super(props)


    }


    render(props){

        return(

            <Wrapper>
                

                <div className="py-5">


                    <div className="view">

                        <h1>Bets</h1>
                        <div className="row">
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                        </div>
                        

                        <br/><br/><br/>
                        <h1>Hot Bets</h1>
                        <div className="row">
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                            <Streamer/>
                        </div>
                    </div>


                    
                

                </div>

            </Wrapper>
        )
    }
}


const Wrapper = styled.div`

.view{
    width: 85%;
    background-color: #D3D3D3;
    margin: 0 auto;

    border-radius: 10px;
    border:0.04rem solid rgba(0,0,0,0.2);
    padding: 20px;
}



.navbar-brand:hover{
    cursor: pointer;
}
`


export default Streamers