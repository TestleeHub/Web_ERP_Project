import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; // npm install react-router@5 react-router-dom@5 => @6은 지원이 안되는 메서드가 많음
import ListSampleComponent from "../sample/ListSampleComponent";
import AddSampleComponent from "../sample/AddSampleComponent";
import EditSampleComponent from "../sample/EditSampleComponent";

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Route path="/" exact={true} component={ListSampleComponent} />
                    <Route path="/samples" component={ListSampleComponent} />
                    <Route path="/add-sample" component={AddSampleComponent} />
                    <Route path="/edit-sample" component={EditSampleComponent} />
                </div>
            </BrowserRouter>
        </div>
    )
}

const style = {
    margin: '10px'
}

export default AppRouter;