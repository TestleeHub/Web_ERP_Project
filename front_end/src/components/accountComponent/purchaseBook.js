import React, { Component } from "react";
import testImage from '../../image/test/purchaseBook.png'

class purchaseBook extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default purchaseBook;