import React, { Component } from "react";
import testImage from '../../image/customerTest/customerTradeHistorySample.PNG'

class customerTradeHistory extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default customerTradeHistory;