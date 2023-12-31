import logo from './logo.svg';
import './App.css';
import LeftNavbar from './components/router/LeftNavbar';
import AppRouter from './components/router/RouterComponent';
import Header from './components/router/Header';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
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
import orderForm from './components/purchaseComponent/orderForm';
import orderList from './components/purchaseComponent/orderList';
import purchaseForm from './components/purchaseComponent/purchaseForm';
import purchaseList from './components/purchaseComponent/purchaseList';
import salesForm_Form from './components/purchaseComponent/salesForm_Form';
import salesForm_List from './components/purchaseComponent/salesForm_List';
import salesForm from './components/purchaseComponent/salesForm';
import salesList from './components/purchaseComponent/salesList';
import employeeLedger from './components/humanResourcesComponent/employeeLedger';
import empList from './components/humanResourcesComponent/empList';
import empProofMaking from './components/humanResourcesComponent/empProofMaking';
import salaryReg from './components/humanResourcesComponent/salaryReg';
import SalaryStateSelect from './components/humanResourcesComponent/SalaryStateSelect';
import depList from './components/humanResourcesComponent/depList';
import depAdd from './components/humanResourcesComponent/depAdd';
import purchaseBook from './components/accountComponent/purchaseBook';
import salesBook from './components/accountComponent/salesBook';
import dailyTrialBalance from './components/accountComponent/dailyTrialBalance';
import monthlyTrialBalance from './components/accountComponent/monthlyTrialBalance';
import fixedAssetsList from './components/accountComponent/fixedAssetsList';
import fixedAssetsAdd from './components/accountComponent/fixedAssetsAdd';


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

              <Route path='/logistics' exact={true} component={inventoryAdjustment} />
              <Route path='/logistics/inventoryAdjustment' exact={true} component={inventoryAdjustment} />
              <Route path='/logistics/productInsert' exact={true} component={productInsert} />
              <Route path='/logistics/receipt' exact={true} component={receipt} />
              <Route path='/logistics/receiptSelect' exact={true} component={receiptSelect} />
              <Route path='/logistics/receiptStatus' exact={true} component={receiptStatus} />
              <Route path='/logistics/storageInsert' exact={true} component={storageInsert} />
              <Route path='/logistics/storageMoveSelect' exact={true} component={storageMoveSelect} />
              <Route path='/logistics/storageMoveUpdate' exact={true} component={storageMoveUpdate} />

              <Route path='/customerTest' exact={true} component={customerList} />
              <Route path='/customerTest/customerListSample' exact={true} component={customerList} />
              <Route path='/customerTest/customerInsertSample' exact={true} component={customerInsert} />
              <Route path='/customerTest/customerTradeHistorySample' exact={true} component={customerTradeHistory} />
              <Route path='/customerTest/CustomerTradeSlipSample' exact={true} component={customerTradeSlip} />
              <Route path='/customerTest/customerTradeSlipInsertSample' exact={true} component={customerTradeSlipInsert} />
              <Route path='/customerTest/customerIncomeSample' exact={true} component={customerIncome} />

              <Route path='/purchase' exact={true} component={orderList} />
              <Route path='/purchase/orderList' exact={true} component={orderList} />
              <Route path='/purchase/orderForm' exact={true} component={orderForm} />
              <Route path='/purchase/purchaseForm' exact={true} component={purchaseForm} />
              <Route path='/purchase/purchaseList' exact={true} component={purchaseList} />
              <Route path='/purchase/salesForm_Form' exact={true} component={salesForm_Form} />
              <Route path='/purchase/salesForm_List' exact={true} component={salesForm_List} />
              <Route path='/purchase/salesForm' exact={true} component={salesForm} />
              <Route path='/purchase/salesList' exact={true} component={salesList} />

              <Route path='/humanResourceImg' exact={true} component={empList} />
              <Route path='/humanResourceImg/empBasicReg' exact={true} component={employeeLedger} />
              <Route path='/humanResourceImg/empList' exact={true} component={empList} />
              <Route path='/humanResourceImg/empProofMaking' exact={true} component={empProofMaking} />
              <Route path='/humanResourceImg/salaryReg' exact={true} component={salaryReg} />
              <Route path='/humanResourceImg/SalaryStateSelect' exact={true} component={SalaryStateSelect} />
              <Route path='/humanResourceImg/depList' exact={true} component={depList} />
              <Route path='/humanResourceImg/depAdd' exact={true} component={depAdd} />

              <Route path='/account' exact={true} component={fixedAssetsList} />
              <Route path='/account/purchaseBook' exact={true} component={purchaseBook} />
              <Route path='/account/salesBook' exact={true} component={salesBook} />
              <Route path='/account/dailyTrialBalance' exact={true} component={dailyTrialBalance} />
              <Route path='/account/monthlyTrialBalance' exact={true} component={monthlyTrialBalance} />
              <Route path='/account/fixedAssetsList' exact={true} component={fixedAssetsList} />
              <Route path='/account/fixedAssetsAdd' exact={true} component={fixedAssetsAdd} />
            </Switch>
            {/* <AppRouter /> 사용 안함 추후 삭제 예정*/}
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
