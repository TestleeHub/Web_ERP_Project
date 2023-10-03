import React, { Component } from "react";
import testImage from '../../image/test/test2.PNG'

class test2Component extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default test2Component;