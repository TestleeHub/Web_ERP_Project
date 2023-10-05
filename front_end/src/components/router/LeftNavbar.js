import React from 'react';
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
                <NavLink exact to="/test/test1" activeClassName="activeClicked">
                    - 서브1<br/>
                </NavLink>
                <NavLink exact to="/test/test2" activeClassName="activeClicked">
                    - 서브2<br/>
                </NavLink>
                <NavLink exact to="/test/test3" activeClassName="activeClicked">
                    - 서브3<br/>
                </NavLink>
            </div>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">제조 관리</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">회계 관리</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">구매/판매 관리</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics1" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">고객 관리</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics2" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">자재 관리</CDBSidebarMenuItem>
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