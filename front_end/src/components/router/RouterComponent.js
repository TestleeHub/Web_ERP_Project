import React from "react";
import {BrowserRouter, Route} from "react-router-dom" // npm install react-router@5 npm install react-router-dom@5

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                </div>
            </BrowserRouter>
        </div>
    );
}

const style = {
    margin:'10px'
}

export default AppRouter;