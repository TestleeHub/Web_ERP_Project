// Router.js

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import inventoryAdjustment from '../logisticsComponent/inventoryAdjustment';
import inventorySelect from '../logisticsComponent/inventorySelect';
// import productInsert from './components/logisticsComponent/productInsert';
import materialInsert from '../logisticsComponent/materialInsert';
import materialSelect from '../logisticsComponent/materialSelect';
// import receiptStatus from './components/logisticsComponent/receiptStatus';
import storageInsert from '../logisticsComponent/storageInsert';
import storageSelect from '../logisticsComponent/storageSelect';
// import storageMoveUpdate from './components/logisticsComponent/storageMoveUpdate';

import productionList from '../manufactureComponent/productionList';
import productionAdd from '../manufactureComponent/productionAdd';
import dispatchList from '../manufactureComponent/dispatchList';
import dispatchAdd from '../manufactureComponent/dispatchAdd';
import warehousingList from '../manufactureComponent/warehousingList';
import warehousingAdd from '../manufactureComponent/warehousingAdd';
import instructionList from '../manufactureComponent/instructionList';
import instructionAdd from '../manufactureComponent/instructionAdd';

import customerList from '../customerComponent/customerList';
import customerInsert from '../customerComponent/customerInsert';
import customerTradeHistory from '../customerComponent/customerTradeHistory';
import customerTradeSlip from '../customerComponent/customerTradeSlip';
import customerTradeSlipInsert from '../customerComponent/customerTradeSlipInsert';
import customerIncome from '../customerComponent/customerIncome';

import orderForm from '../purchaseComponent/orderForm';
import orderList from '../purchaseComponent/orderList';
import purchaseForm from '../purchaseComponent/purchaseForm';
import purchaseList from '../purchaseComponent/purchaseList';
import salesForm_Form from '../purchaseComponent/salesForm_Form';
import salesForm_List from '../purchaseComponent/salesForm_List';
import salesForm from '../purchaseComponent/salesForm';
import salesList from '../purchaseComponent/salesList';
import empAdd from '../humanResourcesComponent/empAdd';
import orderConfimING from '../purchaseComponent/orderConfimING';
import orderUnchecked from '../purchaseComponent/orderUnchecked';
import orderChecked from '../purchaseComponent/orderChecked';
import orderConfirm from '../purchaseComponent/orderConfirm';
import purchaseING from '../purchaseComponent/purchaseING';
import purchaseConfirm from '../purchaseComponent/purchaseConfirm';

import empList from '../humanResourcesComponent/empList';
import empProofMaking from '../humanResourcesComponent/empProofMaking';
import salaryReg from '../humanResourcesComponent/salaryReg';
import SalaryStateSelect from '../humanResourcesComponent/SalaryStateSelect';
import depList from '../humanResourcesComponent/depList';
import depAdd from '../humanResourcesComponent/depAdd';

import purchaseBook from '../accountComponent/purchaseBook';
import salesBook from '../accountComponent/salesBook';
import dailyTrialBalance from '../accountComponent/dailyTrialBalance';
import monthlyTrialBalance from '../accountComponent/monthlyTrialBalance';
import fixedAssetsList from '../accountComponent/fixedAssetsList';
import fixedAssetsAdd from '../accountComponent/fixedAssetsAdd';

import loginComponent from '../commonComponent/loginComponent';
import logoutComponent from '../commonComponent/logoutComponent';
import mainPage from '../commonComponent/mainPage';
import accessDeniedComponent from '../commonComponent/accessDeniedComponent';

// Import other route components...

const AppRouter = () => {
    return (
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
            <Route path='/logistics/mainPage' exact={true} component={mainPage} />
            <Route path='/logistics/inventoryAdjustment' exact={true} component={inventoryAdjustment} />
            <Route path='/logistics/inventorySelect' exact={true} component={inventorySelect} />
            {/* <Route path='/logistics/productInsert' exact={true} component={productInsert} /> */}
            <Route path='/logistics/materialInsert' exact={true} component={materialInsert} />
            <Route path='/logistics/materialSelect' exact={true} component={materialSelect} />
            {/* <Route path='/logistics/receiptStatus' exact={true} component={receiptStatus} /> */}
            <Route path='/logistics/storageInsert' exact={true} component={storageInsert} />
            <Route path='/logistics/storageSelect' exact={true} component={storageSelect} />
            {/* <Route path='/logistics/storageMoveUpdate' exact={true} component={storageMoveUpdate} /> */}

            <Route path='/customer' exact={true} component={customerList} />
            <Route path='/customer/customerList' exact={true} component={customerList} />
            <Route path='/customer/customerInsert' exact={true} component={customerInsert} />
            <Route path='/customer/customerTradeHistory' exact={true} component={customerTradeHistory} />
            <Route path='/customer/CustomerTradeSlip' exact={true} component={customerTradeSlip} />
            <Route path='/customer/customerTradeSlipInsert' exact={true} component={customerTradeSlipInsert} />
            <Route path='/customer/customerIncome' exact={true} component={customerIncome} />

            <Route path='/purchase' exact={true} component={orderList} />
            <Route path='/purchase/orderList' exact={true} component={orderList} />
            <Route path='/purchase/orderForm' exact={true} component={orderForm} />
            <Route path='/purchase/purchaseForm' exact={true} component={purchaseForm} />
            <Route path='/purchase/purchaseList' exact={true} component={purchaseList} />
            <Route path='/purchase/salesForm_Form' exact={true} component={salesForm_Form} />
            <Route path='/purchase/salesForm_List' exact={true} component={salesForm_List} />
            <Route path='/purchase/salesForm' exact={true} component={salesForm} />
            <Route path='/purchase/salesList' exact={true} component={salesList} />
            <Route path='/purchase/orderConfimING' exact={true} component={orderConfimING} />
            <Route path='/purchase/orderUnchecked' exact={true} component={orderUnchecked} />
            <Route path='/purchase/orderChecked' exact={true} component={orderChecked} />
            <Route path='/purchase/orderConfirm' exact={true} component={orderConfirm} />

            <Route path='/purchase/purchaseING' exact={true} component={purchaseING} />
            <Route path='/purchase/purchaseConfirm' exact={true} component={purchaseConfirm} />

            <Route path='/humanResources' exact={true} component={empList} />
            <Route path='/humanResources/empAdd' exact={true} component={empAdd} />
            <Route path='/humanResources/empList' exact={true} component={empList} />
            <Route path='/humanResources/empProofMaking' exact={true} component={empProofMaking} />
            <Route path='/humanResources/salaryReg' exact={true} component={salaryReg} />
            <Route path='/humanResources/SalaryStateSelect' exact={true} component={SalaryStateSelect} />
            <Route path='/humanResources/depList' exact={true} component={depList} />
            <Route path='/humanResources/depAdd' exact={true} component={depAdd} />

            <Route path='/account' exact={true} component={fixedAssetsList} />
            <Route path='/account/purchaseBook' exact={true} component={purchaseBook} />
            <Route path='/account/salesBook' exact={true} component={salesBook} />
            <Route path='/account/dailyTrialBalance' exact={true} component={dailyTrialBalance} />
            <Route path='/account/monthlyTrialBalance' exact={true} component={monthlyTrialBalance} />
            <Route path='/account/fixedAssetsList' exact={true} component={fixedAssetsList} />
            <Route path='/account/fixedAssetsAdd' exact={true} component={fixedAssetsAdd} />

            <Route path='/' exact={true} component={mainPage} />
            <Route path='/main' exact={true} component={mainPage} />
            <Route path='/login' exact={true} component={loginComponent} />
            <Route path='/logout' exact={true} component={logoutComponent} />
            <Route path='/accessDenied' exact={true} component={accessDeniedComponent} />
        </Switch>
    );
}

export default AppRouter;