import './App.css';
import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter, Route } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'reactstrap';
import SideBar from './components/SideBarComponent';
import { LOGIN, REGISTRATION, ROOT } from './navigation/CONSTANTS';
import Login from './components/LoginComponent';
import { getCookie } from './config/getCookie';
import Registration from './components/RegistrationComponent';
import { baseUrl } from './config/baseUrl';
import Cookies from 'js-cookie';

function App() {
    if (getCookie('role') !== null) {
        fetch(baseUrl + "Authenfication/CheckRole?token=" + getCookie('secutiryToken'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then(response => response.text())
            .then(
                (response) => {
                    Cookies.set("role", response);
                },
                (error) => {
                    console.log(error);
                });
    }

    if (getCookie('role') !== null) {
        return (
            <div className="App">
                <BrowserRouter>
                    <Row>
                        <Col md={2}>
                            <SideBar></SideBar>
                        </Col>
                        <Col md={10}>
                            <RouterConfig />
                        </Col>
                    </Row>
                </BrowserRouter>
            </div>
        );
    } else {
        return (
            <div className="App">
                <BrowserRouter>
                    <Row>
                        <Col md={12}>
                            <Route exact path={ROOT} component={null} />
                            <Route path={LOGIN}><Login /></Route>
                            <Route path={REGISTRATION}><Registration /></Route>
                        </Col>
                    </Row>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
