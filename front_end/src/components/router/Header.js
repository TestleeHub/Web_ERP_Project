import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { getUserId } from '../../helpers/axios_helper';

// Attendance 시작
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { request } from "../../helpers/axios_helper";
// Attendance 끝


function Header() {
    
    // Attendance 시작
    const [isAtWork, setIsAtWork] = useState(false);    // 출근,퇴근
    
    const [showModal, setShowModal] = useState(false);  // 출근 퇴근 모달
    const [employeeId, setEmployeeId] = useState(getUserId()); // 직원 아이디

    const [todayWork, setTodayWork] = useState(false);  // 오늘 근무 여부
    const [currentDate, setCurrentDate] = useState(new Date()); // 오늘 근무 여부
    const [lastDate, setLastDate] = useState(new Date());

    useEffect(() => {
        console.log('useEffect')
        
        console.log('isAtWork:', isAtWork)
        const previousStatus = localStorage.getItem('attendanceStatus');
        const todayWorkStatus = localStorage.getItem('todayWorkStatus');
        
        // 새로 고침했을때 버튼 전의 상태 가져오기
        console.log("previousStatus:", previousStatus)
        if (previousStatus !== null) {
            setIsAtWork(previousStatus === 'true');
        }
        if(todayWorkStatus !== ""){
            setTodayWork(true)
        }

        const interval = setInterval(() => {
            const now = new Date();
            setCurrentDate(now);
            checkIfOneDayPassed(now);
        }, 1000);

        const UserId = getUserId();
        request(
            "GET",
            "/humanResources/attendanceCheckTime/" + UserId,
            {

            }).then((response) => {
                console.log("response.data:" + response.data)
                setLastDate(response.data)
                
                console.log('response: ', response);
            }).catch((error) => {
                console.log('error: ', error);
                if(error.response.status === 403){
                    console.log('접근 권한이 없습니다.');
                    this.props.history.push('/accessDenied');
                }
            })
            console.log("lastDate:", lastDate)
            console.log("currentDate:", currentDate)

        return () => {
            clearInterval(interval);
        };
    }, []); // 빈 배열을 두어 한 번만 실행

    const checkIfOneDayPassed = (now) => {
        if (currentDate > lastDate) {
            // 날짜가 하루 지났고 아직 이벤트가 실행되지 않았다면 이벤트 실행
            setIsAtWork(true);
            setTodayWork(true);
        }
    };

    const handleConfirmation = () => {
        if(isAtWork === true){
            console.log("출근")
            
            request(
                "POST",
                "/humanResources/checkIn",
                {
                    employeeId
                }).then((response) => {
                    if (response) {
                        console.log('response : ', response);
                        if (response.data === '출근 완료') {
                            console.log("출근 완료")
                            localStorage.setItem('attendanceStatus', !isAtWork);
                            setIsAtWork(!isAtWork); // 출근,퇴근 변경
                            window.location.reload();
                        } else if (response.data === '이미 출근 했습니다') {
                            setTodayWork(true)
                            localStorage.setItem('todayWorkStatus', true);
                            console.log("이미 출근 했습니다")
                        }
                    }

                }).catch((error) => {
                    console.log('error : ', error);
                    if (error.response.status === 403) {
                        console.log('접근 권한이 없습니다.');
                        this.props.history.push('/accessDenied');
                    }
                })
        }else{
            console.log("퇴근")
            
            request(
                "POST",
                "/humanResources/checkOut",
                {
                    employeeId
                }).then((response) => {
                    console.log('response : ', response);
                    localStorage.setItem('attendanceStatus', !isAtWork);
                    setIsAtWork(!isAtWork);
                    window.location.reload();
                }).catch((error) => {
                    console.log('error : ', error);
                    if (error.response.status === 403) {
                        console.log('접근 권한이 없습니다.');
                        this.props.history.push('/accessDenied');
                    }
                })
        }
        
        setShowModal(false); // 모델닫음
    };

    const toggleAttendance = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    // Attendance 끝

    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossorigin="anonymous"
            />

            <Navbar bg="dark" data-bs-theme="dark" expand="xl" style={{ minWidth: '1500px', height:'75px' }}>
                <Container fluid>
                    <Navbar.Brand href="#">Web-ERP Service</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/main">Home</Nav.Link>
                            {getUserId() === 'null' || getUserId() === null ?
                                <NavDropdown title="마이페이지" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/myEdit">내 정보 수정</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                </NavDropdown>
                                :
                                <NavDropdown title={getUserId()} id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/myEdit">내 정보 수정</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {/* Attendance 시작 */}
                                    {
                                        (todayWork === false) ?
                                        <Button variant="primary" onClick={toggleAttendance}>
                                            {isAtWork ? '출근' : '퇴근'}
                                        </Button>
                                        :
                                        ""
                                    }
                                    <Modal show={showModal} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>
                                            {isAtWork ? '출근' : '퇴근'}
                                        </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            취소
                                        </Button>
                                        <Button variant="primary" onClick={handleConfirmation}>
                                            확인
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    {isAtWork ? (
                                        "현재: 퇴근"
                                    ) : (
                                        "현재: 출근중"
                                    )}
                                    {/* Attendance 끝 */}
                                </NavDropdown>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
}

export default Header;