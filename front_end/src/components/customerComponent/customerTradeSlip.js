import React, { Component } from "react";
import testImage from '../../image/customerTest/customerTradeSlipSample.PNG'

class customerTradeSlip extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default customerTradeSlip;