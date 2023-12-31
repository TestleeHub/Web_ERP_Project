import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const LeftNavbar = () => {
  const [humanResourceshow, setHumanResourceShow] = useState(false);
  const [manufactureshow, setManufactureShow] = useState(false);
  const [accountshow, setAccountShow] = useState(false);
  const [purchaseshow, setPurchaseShow] = useState(false);
  const [customershow, setCustomerShow] = useState(false);
  const [logisticsshow, setLogisticsShow] = useState(false);

  const onHumanResourceShow = () => {
    setHumanResourceShow(!humanResourceshow);
  }
  const onManufactureShow = () => {
    setManufactureShow(!manufactureshow);
  }
  const onAccountShow = () => {
    setAccountShow(!accountshow);
  }
  const onPurchaseShow = () => {
    setPurchaseShow(!purchaseshow);
  }
  const onCustomerShow = () => {
    setCustomerShow(!customershow);
  }
  const onLogisticsShow = () => {
    setLogisticsShow(!logisticsshow);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Web-ERP Service
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/humanResourceImg" activeClassName="activeClicked" onClick={onHumanResourceShow}>
              <CDBSidebarMenuItem icon="user">인적 관리</CDBSidebarMenuItem>
            </NavLink>
            {humanResourceshow === true ?
              <div style={{ textAlign: 'left', margin: '0px 30px' }}>
                <NavLink exact to="/humanResourceImg/empBasicReg" activeClassName="activeClicked">
                  - 사원 기본 정보 등록<br />
                </NavLink>
                <NavLink exact to="/humanResourceImg/empList" activeClassName="activeClicked">
                  - 사원 목록<br />
                </NavLink>
                <NavLink exact to="/humanResourceImg/empProofMaking" activeClassName="activeClicked">
                  - 재직 증명서 양식 제작<br />
                </NavLink>
                <NavLink exact to="/humanResourceImg/salaryReg" activeClassName="activeClicked">
                  - 급여 등록<br />
                </NavLink>
                <NavLink exact to="/humanResourceImg/SalaryStateSelect" activeClassName="activeClicked">
                  - 급여 명세서 양식 제작<br />
                </NavLink>
                <NavLink exact to="/humanResourceImg/depList" activeClassName="activeClicked">
                  - 부서 목록 페이지 제작<br />
                </NavLink>
                <NavLink exact to="/humanResourceImg/depAdd" activeClassName="activeClicked">
                  - 부서 추가<br />
                </NavLink>
              </div> : <></>}

            <NavLink exact to="/manufacture" activeClassName="activeClicked" onClick={onManufactureShow}>
              <CDBSidebarMenuItem icon="table">제조 관리</CDBSidebarMenuItem>
            </NavLink>
            {manufactureshow === true ?
              <div style={{ textAlign: 'left', margin: '0px 30px' }}>
                <NavLink exact to="/manufacture/productionList" activeClassName="activeClicked">
                  - 생산 품목 조회<br />
                </NavLink>
                <NavLink exact to="/manufacture/productionAdd" activeClassName="activeClicked">
                  - 생산 품목 등록<br />
                </NavLink>
                <NavLink exact to="/manufacture/dispatchList" activeClassName="activeClicked">
                  - 생산 불출 조회<br />
                </NavLink>
                <NavLink exact to="/manufacture/dispatchAdd" activeClassName="activeClicked">
                  - 생산 불출 등록<br />
                </NavLink>
                <NavLink exact to="/manufacture/warehousingList" activeClassName="activeClicked">
                  - 생산 입고 조회<br />
                </NavLink>
                <NavLink exact to="/manufacture/warehousingAdd" activeClassName="activeClicked">
                  - 생산 입고 등록<br />
                </NavLink>
                <NavLink exact to="/manufacture/instructionList" activeClassName="activeClicked">
                  - 작업지시서 조회<br />
                </NavLink>
                <NavLink exact to="/manufacture/instructionAdd" activeClassName="activeClicked">
                  - 작업지시서 등록<br />
                </NavLink>
              </div> : <></>}
            <NavLink exact to="/account" activeClassName="activeClicked" onClick={onAccountShow}>
              <CDBSidebarMenuItem icon="chart-line">회계 관리</CDBSidebarMenuItem>
            </NavLink>
            {accountshow === true ? <div style={{ textAlign: 'left', margin: '0px 30px' }}>
              <NavLink exact to="/account/purchaseBook" activeClassName="activeClicked">
                - 매입장 조회<br />
              </NavLink>
              <NavLink exact to="/account/salesBook" activeClassName="activeClicked">
                - 매출장 조회<br />
              </NavLink>
              <NavLink exact to="/account/dailyTrialBalance" activeClassName="activeClicked">
                - 일계표 조회<br />
              </NavLink>
              <NavLink exact to="/account/monthlyTrialBalance" activeClassName="activeClicked">
                - 월계표 조회<br />
              </NavLink>
              <NavLink exact to="/account/fixedAssetsList" activeClassName="activeClicked">
                - 고정자산 조회<br />
              </NavLink>
              <NavLink exact to="/account/fixedAssetsAdd" activeClassName="activeClicked">
                - 고정자산 등록<br />
              </NavLink>
            </div> : <></>}

            <NavLink exact to="/purchase" activeClassName="activeClicked" onClick={onPurchaseShow}>
              <CDBSidebarMenuItem icon="credit-card">구매/판매 관리</CDBSidebarMenuItem>
            </NavLink>
            {purchaseshow === true ? <div style={{ textAlign: 'left', margin: '0px 30px' }}>
              <NavLink exact to="/purchase/orderForm" activeClassName="activeClicked">
                - 발주서 작성<br />
              </NavLink>
              <NavLink exact to="/purchase/orderList" activeClassName="activeClicked">
                - 발주서 조회<br />
              </NavLink>
              <NavLink exact to="/purchase/purchaseForm" activeClassName="activeClicked">
                - 구매 입력<br />
              </NavLink>
              <NavLink exact to="/purchase/purchaseList" activeClassName="activeClicked">
                - 구매 조회<br />
              </NavLink>
              <NavLink exact to="/purchase/salesForm_Form" activeClassName="activeClicked">
                - 주문서 작성<br />
              </NavLink>
              <NavLink exact to="/purchase/salesForm_List" activeClassName="activeClicked">
                - 주문서 조회<br />
              </NavLink>
              <NavLink exact to="/purchase/salesForm" activeClassName="activeClicked">
                - 판매 입력<br />
              </NavLink>
              <NavLink exact to="/purchase/salesList" activeClassName="activeClicked">
                - 판매 조회<br />
              </NavLink>
            </div> : <></>}

            <NavLink exact to="/customerTest" activeClassName="activeClicked" onClick={onCustomerShow}>
              <CDBSidebarMenuItem icon="sticky-note">고객 관리</CDBSidebarMenuItem>
            </NavLink>
            {customershow === true ? <div style={{ textAlign: 'left', margin: '0px 30px' }}>
              <NavLink exact to="/customerTest/customerListSample" activeClassName="activeClicked">
                - 거래처 목록<br />
              </NavLink>
              <NavLink exact to="/customerTest/customerInsertSample" activeClassName="activeClicked">
                - 거래처 등록<br />
              </NavLink>
              <NavLink exact to="/customerTest/customerTradeHistorySample" activeClassName="activeClicked">
                - 거래처 거래내역<br />
              </NavLink>
              <NavLink exact to="/customerTest/CustomerTradeSlipSample" activeClassName="activeClicked">
                - 거래처 입금<br />
              </NavLink>
              <NavLink exact to="/customerTest/customerTradeSlipInsertSample" activeClassName="activeClicked">
                - 거래처 입금 처리<br />
              </NavLink>
              <NavLink exact to="/customerTest/customerIncomeSample" activeClassName="activeClicked">
                - 거래처 입금 목록<br />
              </NavLink>
            </div> : <></>}

            <NavLink exact to="/logistics" activeClassName="activeClicked" onClick={onLogisticsShow}>
              <CDBSidebarMenuItem icon="book">자재 관리</CDBSidebarMenuItem>
            </NavLink>
            {logisticsshow === true ? <div style={{ textAlign: 'left', margin: '0px 30px' }}>
              <NavLink exact to="/logistics/inventoryAdjustment" activeClassName="activeClicked">
                - 재고조정<br />
              </NavLink>
              <NavLink exact to="/logistics/productInsert" activeClassName="activeClicked">
                - 품목등록<br />
              </NavLink>
              <NavLink exact to="/logistics/receipt" activeClassName="activeClicked">
                - 출하입력<br />
              </NavLink>
              <NavLink exact to="/logistics/receiptSelect" activeClassName="activeClicked">
                - 출하조회<br />
              </NavLink>
              <NavLink exact to="/logistics/receiptStatus" activeClassName="activeClicked">
                - 출하현황<br />
              </NavLink>
              <NavLink exact to="/logistics/storageInsert" activeClassName="activeClicked">
                - 창고등록<br />
              </NavLink>
              <NavLink exact to="/logistics/storageMoveSelect" activeClassName="activeClicked">
                - 창고이동조회<br />
              </NavLink>
              <NavLink exact to="/logistics/storageMoveUpdate" activeClassName="activeClicked">
                - 창고이동수정<br />
              </NavLink>
            </div> : <></>}

            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">로그인</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">QNA</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Web-ERP Service
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default LeftNavbar;