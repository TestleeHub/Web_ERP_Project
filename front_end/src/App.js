import logo from './logo.svg';
import './App.css';
import LeftNavbar from './components/router/LeftNavbar';
import AppRouter from './components/router/RouterComponent';
import Header from './components/router/Header';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import test1Component from './components/accountComponent/test1Component';
import test2Component from './components/accountComponent/test2Component';
import test3Component from './components/accountComponent/test3Component';
import inventoryAdjustment from './components/logisticsComponent/inventoryAdjustment';
import productInsert from './components/logisticsComponent/productInsert';
import receipt from './components/logisticsComponent/receipt';
import receiptSelect from './components/logisticsComponent/receiptSelect';
import receiptStatus from './components/logisticsComponent/receiptStatus';
import storageInsert from './components/logisticsComponent/storageInsert';
import storageMoveSelect from './components/logisticsComponent/storageMoveSelect';
import storageMoveUpdate from './components/logisticsComponent/storageMoveUpdate';



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
            
            <Route path='/analytics2' exact = {true} component={inventoryAdjustment}/>
            <Route path='/logistics/inventoryAdjustment' exact = {true} component={inventoryAdjustment}/>
            <Route path='/logistics/productInsert' exact = {true} component={productInsert}/>
            <Route path='/logistics/receipt' exact = {true} component={receipt}/>
            <Route path='/logistics/receiptSelect' exact = {true} component={receiptSelect}/>
            <Route path='/logistics/receiptStatus' exact = {true} component={receiptStatus}/>
            <Route path='/logistics/storageInsert' exact = {true} component={storageInsert}/>
            <Route path='/logistics/storageMoveSelect' exact = {true} component={storageMoveSelect}/>
            <Route path='/logistics/storageMoveUpdate' exact = {true} component={storageMoveUpdate}/>
          </Switch>
          {/* <AppRouter /> 사용 안함 추후 삭제 예정*/}
        </div>
      </div>
    </Router>
  );
}


export default App;
