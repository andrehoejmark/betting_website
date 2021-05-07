import react from "react"
import styled from "styled-components"



var FA = require('react-fontawesome')



class Streamer extends react.Component{



    constructor(props){
        super(props)

        
    }


    render(props){

        return(

            <Wrapper>
                <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                    <div className="item">
                        <image className="img">
                            <FA className='fas fa-home'/>
                        </image>

                        <div className="text">
                            <b>Num Bets: 50</b>
                        </div>
                    </div>
                </div>
            </Wrapper>
        )
    }
}


const Wrapper = styled.div`

.item{
    width: 175px;
    height 120px;
    font-size: 50px;
    border-radius: 5px;
    border:0.04rem solid rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    background-color: white;

    
    
}


.item:hover{
    transition:all 0.1s linear;
    transform: scale(1.07);

    border-color: #ADD8E6;
    border-width: 4px;
}
.img{
    display: inline-block;
    text-align: center;
    width: 100%;
    border-bottom:0.1rem solid rgba(0,0,0,0.2);
    
}


.text{

    font-size: 15px;
    margin-left: 5px;
    margin-top:3px;
}
`


export default Streamer