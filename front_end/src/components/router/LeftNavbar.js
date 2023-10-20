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
import { getAuthToken, getUserRole } from '../../helpers/axios_helper';

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

            {getUserRole() === 'ROLE_ADMIN' || getUserRole() === 'ROLE_HR' ?
              <NavLink exact to="#" activeClassName="" onClick={onHumanResourceShow}>
                <CDBSidebarMenuItem icon="user">인적 관리</CDBSidebarMenuItem>
              </NavLink>
              :
              <></>}
            {humanResourceshow === true ?
              <div style={{ textAlign: 'left', margin: '0px 30px' }}>
                <NavLink exact to="/humanResources/empAdd" activeClassName="activeClicked">
                  - 사원 기본 정보 등록<br />
                </NavLink>
                <NavLink exact to="/humanResources/empList" activeClassName="activeClicked">
                  - 사원 목록<br />
                </NavLink>
                {/* <NavLink exact to="/humanResources/empProofMaking" activeClassName="activeClicked">
                  - 재직 증명서 양식 제작<br />
                </NavLink> */}
                <NavLink exact to="/humanResources/salaryReg" activeClassName="activeClicked">
                  - 급여 등록<br />
                </NavLink>
                <NavLink exact to="/humanResources/SalaryStateSelect" activeClassName="activeClicked">
                  - 급여조회<br />
                </NavLink>
                <NavLink exact to="/humanResources/depList" activeClassName="activeClicked">
                  - 부서 목록 페이지 제작<br />
                </NavLink>
                <NavLink exact to="/humanResources/depAdd" activeClassName="activeClicked">
                  - 부서 추가<br />
                </NavLink>
              </div> : <></>}

            {getUserRole() === 'ROLE_ADMIN' || getUserRole() === 'ROLE_MF' ?
              <NavLink exact to="#" activeClassName="" onClick={onManufactureShow}>
                <CDBSidebarMenuItem icon="table">제조 관리</CDBSidebarMenuItem>
              </NavLink>
              :
              <></>}

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

            {getUserRole() === 'ROLE_ADMIN' || getUserRole() === 'ROLE_AC' ?
              <NavLink exact to="#" activeClassName="" onClick={onAccountShow}>
                <CDBSidebarMenuItem icon="chart-line">회계 관리</CDBSidebarMenuItem>
              </NavLink>
              :
              <></>}
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
              <NavLink exact to="/account/fixedAssetForm" activeClassName="activeClicked">
                - 고정자산 입력<br />
              </NavLink>
            </div> : <></>}

            {getUserRole() === 'ROLE_ADMIN' || getUserRole() === 'ROLE_PC' ?
              <NavLink exact to="#" activeClassName="" onClick={onPurchaseShow}>
                <CDBSidebarMenuItem icon="credit-card">구매/판매 관리</CDBSidebarMenuItem>
              </NavLink>
              :
              <></>}
            {purchaseshow === true ? <div style={{ textAlign: 'left', margin: '0px 30px' }}>
              <NavLink exact to="/purchase/orderForm" activeClassName="activeClicked">
                - 발주서 입력<br />
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

            {getUserRole() === 'ROLE_ADMIN' || getUserRole() === 'ROLE_CR' ?
              <NavLink exact to="#" activeClassName="" onClick={onCustomerShow}>
                <CDBSidebarMenuItem icon="sticky-note">고객 관리</CDBSidebarMenuItem>
              </NavLink>
              :
              <></>}
            {customershow === true ? <div style={{ textAlign: 'left', margin: '0px 30px' }}>
              <NavLink exact to="/customer/customerList" activeClassName="activeClicked">
                - 거래처 목록<br />
              </NavLink>
              <NavLink exact to="/customer/customerInsert" activeClassName="activeClicked">
                - 거래처 등록<br />
              </NavLink>
              <NavLink exact to="/customer/customerTradeHistory" activeClassName="activeClicked">
                - 거래처 거래내역<br />
              </NavLink>
              <NavLink exact to="/customer/CustomerTradeSlip" activeClassName="activeClicked">
                - 거래처 입금 목록<br />
              </NavLink>
              <NavLink exact to="/customer/customerTradeSlipInsert" activeClassName="activeClicked">
                - 거래처 입금 처리<br />
              </NavLink>
            </div> : <></>}

            {getUserRole() === 'ROLE_ADMIN' || getUserRole() === 'ROLE_LG' ?
              <NavLink exact to="#" activeClassName="" onClick={onLogisticsShow}>
                <CDBSidebarMenuItem icon="book">자재 관리</CDBSidebarMenuItem>
              </NavLink>
              :
              <></>}
            {logisticsshow === true ? <div style={{ textAlign: 'left', margin: '0px 30px' }}>
              <NavLink exact to="/logistics/mainPage" activeClassName="activeClicked">
                - 메인 페이지 테스트<br />
              </NavLink>
              <NavLink exact to="/logistics/inventoryAdjustment" activeClassName="activeClicked">
                - 재고 조정<br />
              </NavLink>
              <NavLink exact to="/logistics/inventorySelect" activeClassName="inventorySelect">
                - 재고 조회<br />
              </NavLink>
              {/* <NavLink exact to="/logistics/productInsert" activeClassName="activeClicked">
                - 품목등록<br />
              </NavLink> */}
              <NavLink exact to="/logistics/materialInsert" activeClassName="activeClicked">
                - 원재료 등록<br />
              </NavLink>
              <NavLink exact to="/logistics/materialSelect" activeClassName="activeClicked">
                - 원재료 조회<br />
              </NavLink>
              {/* <NavLink exact to="/logistics/receiptStatus" activeClassName="activeClicked">
                - 출하현황<br />
              </NavLink> */}
              <NavLink exact to="/logistics/storageInsert" activeClassName="activeClicked">
                - 창고 등록<br />
              </NavLink>
              <NavLink exact to="/logistics/storageSelect" activeClassName="activeClicked">
                - 창고 조회<br />
              </NavLink>
              {/* <NavLink exact to="/logistics/storageMoveUpdate" activeClassName="activeClicked">
                - 창고이동수정<br />
              </NavLink> */}
            </div> : <></>}

            {getAuthToken() === 'null' ?
              <NavLink exact to="/login" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">로그인</CDBSidebarMenuItem>
              </NavLink>
              : <NavLink exact to="/logout" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">로그아웃</CDBSidebarMenuItem>
              </NavLink>}

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