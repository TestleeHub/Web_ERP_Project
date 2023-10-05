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
import productionList from './components/manufactureComponent/productionList';
import productionAdd from './components/manufactureComponent/productionAdd';
import dispatchList from './components/manufactureComponent/dispatchList';
import dispatchAdd from './components/manufactureComponent/dispatchAdd';
import warehousingList from './components/manufactureComponent/warehousingList';
import warehousingAdd from './components/manufactureComponent/warehousingAdd';
import instructionList from './components/manufactureComponent/instructionList';
import instructionAdd from './components/manufactureComponent/instructionAdd';

function App() {
  return (
    <Router>
      {/* <Header />  사용 안함 추후 삭제 예정*/}
      {/* <AppRouter /> 사용 안함 추후 삭제 예정*/}
      <div className='content'>
        <div className="contentBox">
          <LeftNavbar />
          <div>
            <Header />
            <Switch>
              <Route path='/manufacture' exact={true} component={productionList} />
              <Route path='/manufacture/productionList' exact={true} component={productionList} />
              <Route path='/manufacture/productionAdd' exact={true} component={productionAdd} />
              <Route path='/manufacture/dispatchList' exact={true} component={dispatchList} />
              <Route path='/manufacture/dispatchAdd' exact={true} component={dispatchAdd} />
              <Route path='/manufacture/warehousingList' exact={true} component={warehousingList} />
              <Route path='/manufacture/warehousingAdd' exact={true} component={warehousingAdd} />
              <Route path='/manufacture/instructionList' exact={true} component={instructionList} />
              <Route path='/manufacture/instructionAdd' exact={true} component={instructionAdd} />

              <Route path='/analytics2' exact={true} component={inventoryAdjustment} />
              <Route path='/logistics/inventoryAdjustment' exact={true} component={inventoryAdjustment} />
              <Route path='/logistics/productInsert' exact={true} component={productInsert} />
              <Route path='/logistics/receipt' exact={true} component={receipt} />
              <Route path='/logistics/receiptSelect' exact={true} component={receiptSelect} />
              <Route path='/logistics/receiptStatus' exact={true} component={receiptStatus} />
              <Route path='/logistics/storageInsert' exact={true} component={storageInsert} />
              <Route path='/logistics/storageMoveSelect' exact={true} component={storageMoveSelect} />
              <Route path='/logistics/storageMoveUpdate' exact={true} component={storageMoveUpdate} />
            </Switch>
            {/* <AppRouter /> 사용 안함 추후 삭제 예정*/}
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
