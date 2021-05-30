import Cookies from "js-cookie";
import { Component } from "react";
import { Button, Col, Panel, Row } from "rsuite";
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";


class ManagerDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            data: []
        }

        this.closeOpenLocker = this.closeOpenLocker.bind(this);
        this.enableDisableLocker = this.enableDisableLocker.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + "Locker/GetByUser?token=" + Cookies.get("secutiryToken"), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(
                (response) => {
                    console.log(response);
                    this.setState({
                        data: response,
                        isLoaded: true
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    closeOpenLocker(lockerId) {
        fetch(baseUrl + "Locker/CloseOpenLocker?lockerId=" + lockerId + "&userToken=" + Cookies.get("secutiryToken"), {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    alert(response);
                } else {
                    window.location.reload();
                }
            });
    }

    enableDisableLocker(lockerId) {
        fetch(baseUrl + "Locker/EnableDisableLocker?lockerId=" + lockerId + "&userToken=" + Cookies.get("secutiryToken"), {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    alert(response);
                } else {
                    window.location.reload();
                }
            });
    }

    renderCard(elem) {
        var isClosed, isEnabled, actionClose, actionEnable;

        if (!elem.isClosed) {
            isClosed = this.state.local.opened;
            actionClose = this.state.local.toClose;
        } else {
            isClosed = this.state.local.closed;
            actionClose = this.state.local.toOpen;
        }

        if (elem.isEnabled) {
            isEnabled = <span style={{color: "green"}}>{this.state.local.yes}</span>
            actionEnable = this.state.local.toDisable;
        } else {
            isEnabled = <span style={{color: "red"}}>{this.state.local.no}</span>;
            actionEnable = this.state.local.toEnable;
        }

        var dateString = new Date(elem.timeOfLastUse);

        return (
            <Col md={6} sm={12}>
                <Panel className="mt-3 mr-3 mb-1" bordered header={"#" + elem.id}>
                    <p>{this.state.local.lockerToken}: {elem.lockerToken}</p>
                    <p>{this.state.local.status}: {isClosed}</p>
                    <p>{this.state.local.isEnabled}: {isEnabled}</p>
                    <p>{this.state.local.timeOfLastUse}: <br/> {dateString.toLocaleString()}</p>
                    <Row>
                        <Col lg={4} md={4}>
                            <Button color="orange" onClick={() => this.closeOpenLocker(elem.id)}>{actionClose}</Button>
                        </Col>
                        <Col lg={4} md={4}></Col>
                        <Col lg={4} md={4}>
                            <Button color="cyan" onClick={() => this.enableDisableLocker(elem.id)}>{actionEnable}</Button>
                        </Col>
                    </Row>
                </Panel>
            </Col>
        );
    }

    render() {
        return (
            <div>
                <Row>
                    {
                        this.state.data.map((elem) => this.renderCard(elem))
                    }
                </Row>
            </div>
        );
    }
}

export default ManagerDashboard;