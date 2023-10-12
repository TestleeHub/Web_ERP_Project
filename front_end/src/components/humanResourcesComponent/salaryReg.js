import React, { Component } from "react";
// import Image from '../../image/humanResourceImg/salaryReg.PNG'

class salaryReg extends Component{
    render(){
        return(
            // <div>
            //     <img src={Image}/>
            // </div>
            <div className="centerDivCss">
                 
                <form>
                <h2>급여등록</h2>
                <table border={1}>
                    <tr>
                        <td className="tableTd">귀속연월</td>
                        <td>
                            <select name="year">
                                <option value={2024}>2024</option>
                                <option value={2023}>2023</option>
                                <option value={2022}>2022</option>
                                <option value={2021}>2021</option>
                                <option value={2021}>직접입력</option>
                            </select>
                            /
                            <select name="month">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>지급일</td>
                        <td>
                        <td>
                            <select name="year">
                                <option value={2024}>2024</option>
                                <option value={2023}>2023</option>
                                <option value={2022}>2022</option>
                                <option value={2021}>2021</option>
                                <option value={2021}>직접입력</option>
                            </select>
                            /
                            <select name="month">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                                <option value={11}>11</option>
                                <option value={12}>12</option>
                            </select>
                            /
                            <select name="month">
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={30}>30</option>
                            </select>
                        </td>
                        </td>
                    </tr>
                    <tr>
                        <td>사원ID</td>
                        <td><input /></td>
                    </tr>
                    <tr>
                        <td>야근수당</td>
                        <td><input /></td>
                        
                    </tr>
                    <tr>
                        <td>주말근무수당</td>
                        <td><input /></td>
                    </tr>
                    <tr>
                        <td>연차수당</td>
                        <td><input /></td>
                    </tr>
                    <tr>
                        <td>소득세</td>
                        <td><input /></td>
                    </tr>
                    <tr>
                        <td>주민세</td>
                        <input />
                    </tr>
                    <tr>
                        <td>국민연금</td>
                        <td><input /></td>
                    </tr>
                    <tr>
                        <td>건강보험</td>
                        <td><input /></td>
                    </tr>

                </table>
                <hr />
                <button>저장</button>
                </form>
            </div>
        );
    }
}

export default salaryReg;