import React, { Component } from "react";
import testImage from '../../image/customerTest/customerIncomeSample.PNG'

class customerIncome extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default customerIncome;