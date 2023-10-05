import React, { Component } from "react";
import testImage from '../../image/test/salesBook.png'

class salesBook extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default salesBook;