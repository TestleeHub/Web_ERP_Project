import logo from './logo.svg';
import './App.css';
import LeftNavbar from './components/router/LeftNavbar';
import AppRouter from './components/router/RouterComponent';
import Header from './components/router/Header';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import test1Component from './components/accountComponent/test1Component';
import test2Component from './components/accountComponent/test2Component';
import test3Component from './components/accountComponent/test3Component';

function App() {
  return (
    <Router>
      <div className="contentBox">
        <LeftNavbar />
        <div>
          {/* <Header />  사용 안함 추후 삭제 예정*/} 
          <Switch>
            <Route path='/test' exact = {true} component={test1Component}/>
            <Route path='/test/test1' exact = {true} component={test1Component}/>
            <Route path='/test/test2' exact = {true} component={test2Component}/>
            <Route path='/test/test3' exact = {true} component={test3Component}/>
          </Switch>
          {/* <AppRouter /> 사용 안함 추후 삭제 예정*/}
        </div>
      </div>
    </Router>
  );
}


export default App;
