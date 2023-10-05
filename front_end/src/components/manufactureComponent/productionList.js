import React, { Component } from "react";
import productionListImage from '../../image/manufacture/productionList.PNG'

class productionList extends Component{
    render(){
        return(
            <div>
                <img src={productionListImage}/>
            </div>
        );
    }
}

export default productionList;