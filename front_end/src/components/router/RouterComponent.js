import React from "react";
import {BrowserRouter, Route} from "react-router-dom" // npm install react-router@5 npm install react-router-dom@5
import testComponent from "../accountComponent/test3Component";

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Route path='/' exact = {true} component={testComponent}/>
                    <Route path='/test' exact = {true} component={testComponent}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

const style = {
    margin:'10px'
}

export default AppRouter;