import './App.css';
import './test.css';
import LeftNavbar from './components/router/LeftNavbar';
import Header from './components/router/Header';
import Footer from './components/router/Footer';
import {BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/router/AppRouter';

function App() {
  return (
    <div>
      {/* <Header />  사용 안함 추후 삭제 예정*/}
      {/* <AppRouter /> 사용 안함 추후 삭제 예정*/}
      <div className='content'>
        <div className="contentBox">
          <Router>
            <LeftNavbar />
            <div>
              <Header />
              <AppRouter />
            </div>
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
