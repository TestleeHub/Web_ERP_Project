import React, { Component } from "react";
import testImage from '../../image/test/test1.PNG'

class test1Component extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default test1Component;