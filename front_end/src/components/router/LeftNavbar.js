import React, {useState } from 'react';
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
  const [show, setShow] = useState(false);

  const onShow = () => {
    setShow(!show);
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
            <NavLink exact to="/test" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">인적 관리</CDBSidebarMenuItem>
            </NavLink>
            <div style={{textAlign : 'center', margin : '0px 30px'}}>
                <NavLink exact to="/humanResourceImg/empBasicReg" activeClassName="activeClicked">
                    - 사원 기본 정보 등록<br/>
                </NavLink>
                <NavLink exact to="/humanResourceImg/empList" activeClassName="activeClicked">
                    - 사원 목록<br/>
                </NavLink>
                <NavLink exact to="/humanResourceImg/empProofMaking" activeClassName="activeClicked">
                    - 재직 증명서 양식 제작<br/>
                </NavLink>
                <NavLink exact to="/humanResourceImg/salaryReg" activeClassName="activeClicked">
                    - 급여 등록<br/>
                </NavLink>
                <NavLink exact to="/humanResourceImg/SalaryStateSelect" activeClassName="activeClicked">
                    - 급여 명세서 양식 제작<br/>
                </NavLink>
                <NavLink exact to="/humanResourceImg/depList" activeClassName="activeClicked">
                    - 부서 목록 페이지 제작<br/>
                </NavLink>
                <NavLink exact to="/humanResourceImg/depAdd" activeClassName="activeClicked">
                    - 부서 추가<br/>
                </NavLink>
            </div>
            <NavLink exact to="/manufacture" activeClassName="activeClicked" onClick={onShow}>
              <CDBSidebarMenuItem icon="table">제조 관리</CDBSidebarMenuItem>
            </NavLink>
            {show === true ? <div style={{textAlign : 'center', margin : '0px 30px'}}>
                <NavLink exact to="/manufacture/productionList" activeClassName="activeClicked">
                    - 생산 품목 조회<br/>
                </NavLink>
                <NavLink exact to="/manufacture/productionAdd" activeClassName="activeClicked">
                    - 생산 품목 등록<br/>
                </NavLink>
                <NavLink exact to="/manufacture/dispatchList" activeClassName="activeClicked">
                    - 생산 불출 조회<br/>
                </NavLink>
                <NavLink exact to="/manufacture/dispatchAdd" activeClassName="activeClicked">
                    - 생산 불출 등록<br/>
                </NavLink>
                <NavLink exact to="/manufacture/warehousingList" activeClassName="activeClicked">
                    - 생산 입고 조회<br/>
                </NavLink>
                <NavLink exact to="/manufacture/warehousingAdd" activeClassName="activeClicked">
                    - 생산 입고 등록<br/>
                </NavLink>
                <NavLink exact to="/manufacture/instructionList" activeClassName="activeClicked">
                    - 작업지시서 조회<br/>
                </NavLink>
                <NavLink exact to="/manufacture/instructionAdd" activeClassName="activeClicked">
                    - 작업지시서 등록<br/>
                </NavLink>
            </div> : <></>}
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">회계 관리</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="credit-card">구매/판매 관리</CDBSidebarMenuItem>
            </NavLink>
            <div style={{textAlign : 'left', margin : '0px 30px'}}>
                <NavLink exact to="/test/orderForm" activeClassName="activeClicked">
                    - 발주서 작성<br/>
                </NavLink>
                <NavLink exact to="/test/orderList" activeClassName="activeClicked">
                    - 발주서 조회<br/>
                </NavLink>
                <NavLink exact to="/test/purchaseForm" activeClassName="activeClicked">
                    - 구매 입력<br/>
                </NavLink>
                <NavLink exact to="/test/purchaseList" activeClassName="activeClicked">
                    - 구매 조회<br/>
                </NavLink>
                <NavLink exact to="/test/salesForm_Form" activeClassName="activeClicked">
                    - 주문서 작성<br/>
                </NavLink>
                <NavLink exact to="/test/salesForm_List" activeClassName="activeClicked">
                    - 주문서 조회<br/>
                </NavLink>
                <NavLink exact to="/test/salesForm" activeClassName="activeClicked">
                    - 판매 입력<br/>
                </NavLink>
                <NavLink exact to="/test/salesList" activeClassName="activeClicked">
                    - 판매 조회<br/>
                </NavLink>
            </div>
            <NavLink exact to="/analytics1" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sticky-note">고객 관리</CDBSidebarMenuItem>
            </NavLink>
            <div style={{textAlign : 'center', margin : '0px 30px'}}>
                <NavLink exact to="/customerTest/customerListSample" activeClassName="activeClicked">
                    - 서브1<br/>
                </NavLink>
                <NavLink exact to="/customerTest/customerInsertSample" activeClassName="activeClicked">
                    - 서브2<br/>
                </NavLink>
                <NavLink exact to="/customerTest/customerTradeHistorySample" activeClassName="activeClicked">
                    - 서브3<br/>
                </NavLink>
                <NavLink exact to="/customerTest/CustomerTradeSlipSample" activeClassName="activeClicked">
                    - 서브4<br/>
                </NavLink>
                <NavLink exact to="/customerTest/customerTradeSlipInsertSample" activeClassName="activeClicked">
                    - 서브5<br/>
                </NavLink>
                <NavLink exact to="/customerTest/customerIncomeSample" activeClassName="activeClicked">
                    - 서브6<br/>
                </NavLink>
            </div>
            <NavLink exact to="/analytics2" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">자재 관리</CDBSidebarMenuItem>
            </NavLink>
            <div style={{textAlign : 'center', margin : '0px 30px'}}>
                <NavLink exact to="/logistics/inventoryAdjustment" activeClassName="activeClicked">
                    - 재고조정<br/>
                </NavLink>
                <NavLink exact to="/logistics/productInsert" activeClassName="activeClicked">
                    - 품목등록<br/>
                </NavLink>
                <NavLink exact to="/logistics/receipt" activeClassName="activeClicked">
                    - 출하입력<br/>
                </NavLink>
                <NavLink exact to="/logistics/receiptSelect" activeClassName="activeClicked">
                    - 출하조회<br/>
                </NavLink>
                <NavLink exact to="/logistics/receiptStatus" activeClassName="activeClicked">
                    - 출하현황<br/>
                </NavLink>
                <NavLink exact to="/logistics/storageInsert" activeClassName="activeClicked">
                    - 창고등록<br/>
                </NavLink>
                <NavLink exact to="/logistics/storageMoveSelect" activeClassName="activeClicked">
                    - 창고이동조회<br/>
                </NavLink>
                <NavLink exact to="/logistics/storageMoveUpdate" activeClassName="activeClicked">
                    - 창고이동수정<br/>
                </NavLink>
            </div>
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