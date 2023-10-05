import React, { Component } from "react";
import testImage from '../../image/customerTest/customerListSample.PNG'

class customerList extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default customerList;