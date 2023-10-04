import React, { Component } from "react";
import testImage from '../../image/test/test3.PNG'

class test3Component extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default test3Component;