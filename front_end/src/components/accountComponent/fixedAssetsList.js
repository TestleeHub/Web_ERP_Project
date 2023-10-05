import React, { Component } from "react";
import testImage from '../../image/test/fixedAssetsList.png'

class fixedAssetsList extends Component{
    render(){
        return(
            <div>
                <img src={testImage}/>
            </div>
        );
    }
}

export default fixedAssetsList;