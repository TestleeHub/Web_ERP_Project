import React, { Component } from "react";
import Image from '../../image/humanResourceImg/depList.PNG'

class depList extends Component{
    render(){
        return(
            <div style={{padding: '30px'}}>
                <img src={Image}/>
            </div>
        );
    }
}

export default depList;