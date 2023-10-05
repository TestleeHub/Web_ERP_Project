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
import customerList from './components/customerComponent/customerList';
import customerInsert from './components/customerComponent/customerInsert';
import customerTradeHistory from './components/customerComponent/customerTradeHistory';
import customerTradeSlip from './components/customerComponent/customerTradeSlip';
import customerTradeSlipInsert from './components/customerComponent/customerTradeSlipInsert';
import customerIncome from './components/customerComponent/customerIncome';
import orderForm from './components/accountComponent/orderForm';
import orderList from './components/accountComponent/orderList';
import purchaseForm from './components/accountComponent/purchaseForm';
import purchaseList from './components/accountComponent/purchaseList';
import salesForm_Form from './components/accountComponent/salesForm_Form';
import salesForm_List from './components/accountComponent/salesForm_List';
import salesForm from './components/accountComponent/salesForm';
import salesList from './components/accountComponent/salesList';
import employeeLedger from './components/humanResourcesComponent/employeeLedger';
import empList from './components/humanResourcesComponent/empList';
import empProofMaking from './components/humanResourcesComponent/empProofMaking';
import salaryReg from './components/humanResourcesComponent/salaryReg';
import SalaryStateSelect from './components/humanResourcesComponent/SalaryStateSelect';
import depList from './components/humanResourcesComponent/depList';
import depAdd from './components/humanResourcesComponent/depAdd';

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

              <Route path='/customerTest/customerListSample' exact={true} component={customerList} />
              <Route path='/customerTest/customerInsertSample' exact={true} component={customerInsert} />
              <Route path='/customerTest/customerTradeHistorySample' exact={true} component={customerTradeHistory} />
              <Route path='/customerTest/CustomerTradeSlipSample' exact={true} component={customerTradeSlip} />
              <Route path='/customerTest/customerTradeSlipInsertSample' exact={true} component={customerTradeSlipInsert} />
              <Route path='/customerTest/customerIncomeSample' exact={true} component={customerIncome} />

              <Route path='/test' exact={true} component={test1Component} />
              <Route path='/test/test1' exact={true} component={test1Component} />
              <Route path='/test/test2' exact={true} component={test2Component} />
              <Route path='/test/test3' exact={true} component={test3Component} />
              <Route path='/test/orderForm' exact={true} component={orderForm} />
              <Route path='/test/orderList' exact={true} component={orderList} />
              <Route path='/test/purchaseForm' exact={true} component={purchaseForm} />
              <Route path='/test/purchaseList' exact={true} component={purchaseList} />
              <Route path='/test/salesForm_Form' exact={true} component={salesForm_Form} />
              <Route path='/test/salesForm_List' exact={true} component={salesForm_List} />
              <Route path='/test/salesForm' exact={true} component={salesForm} />
              <Route path='/test/salesList' exact={true} component={salesList} />

              <Route path='/humanResourceImg/empBasicReg' exact={true} component={employeeLedger} />
              <Route path='/humanResourceImg/empList' exact={true} component={empList} />
              <Route path='/humanResourceImg/empProofMaking' exact={true} component={empProofMaking} />
              <Route path='/humanResourceImg/salaryReg' exact={true} component={salaryReg} />
              <Route path='/humanResourceImg/SalaryStateSelect' exact={true} component={SalaryStateSelect} />
              <Route path='/humanResourceImg/depList' exact={true} component={depList} />
              <Route path='/humanResourceImg/depAdd' exact={true} component={depAdd} />
            </Switch>
            {/* <AppRouter /> 사용 안함 추후 삭제 예정*/}
          </div>

        </div>
      </div>
    </Router>
  );
}


export default App;
