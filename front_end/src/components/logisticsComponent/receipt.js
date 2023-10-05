import React, { Component } from "react";
import testImage from '../../image/logistics/receipt.png'

class receipt extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default receipt;