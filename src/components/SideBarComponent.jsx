import { Component } from "react";
import { ChangeLanguage, GetLocal } from "../config/provideLocalization";
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import { Link } from "react-router-dom";
import { LOCATION_DATA, LOCATION_OWNER_DATA, LOCKER_DATA, LOCKER_USAGE_LOG_DATA, MANAGER_DASHBOARD, MANAGER_SCHEDULE, ORDER_DATA, SCHEDULE_DATA, THEME_DATA, USER_DATA } from "../navigation/CONSTANTS";
import Cookies from "js-cookie";
import { baseUrl } from "../config/baseUrl";
import { getCookie } from "../config/getCookie";

class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            toShow: false
        }

        this.changeLanguage = this.changeLanguage.bind(this);
        this.logOut = this.logOut.bind(this);
        this.exportData = this.exportData.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoaded: true,
            toShow: true
        })
    }

    changeLanguage(lang) {
        ChangeLanguage(lang);
        window.location.reload();
    }

    logOut() {
        Cookies.remove('secret');
        Cookies.remove('token');
        Cookies.remove('securityToken');
        Cookies.remove('role');
        window.location.href = "/login";
    }

    exportData() {
        fetch(baseUrl + "DataManagement", {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then(response => response.blob()
                .then(blob => {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = "db.csv";
                    document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                    a.click();
                    a.remove();  //afterwards we remove the element again
                }));
    }

    render() {
        if (this.state.isLoaded) {
            const local = this.state.local;
            if (getCookie('role') === "Admin") {
                return (
                    <Sidenav style={{ minHeight: 1000 }} defaultOpenKeys={['3', '4']} activeKey="1">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item style={{ background: "lightgreen" }} eventKey="1" icon={<Icon style={{ color: "black", fontWeight: "500" }} icon="dashboard" />}>
                                    <span style={{ color: "black", fontWeight: "500" }}>{local.dashboard}</span>
                                </Nav.Item>
                                <Dropdown eventKey="3" title={local.data} icon={<Icon icon="database" />}>
                                    <Link to={USER_DATA}><Dropdown.Item eventKey="3-1">{local.users}</Dropdown.Item></Link>
                                    <Link to={LOCATION_DATA}><Dropdown.Item eventKey="3-2">{local.locations}</Dropdown.Item></Link>
                                    <Link to={LOCATION_OWNER_DATA}><Dropdown.Item eventKey="3-3">{local.locationOwners}</Dropdown.Item></Link>
                                    <Link to={LOCKER_DATA}><Dropdown.Item eventKey="3-4">{local.lockers}</Dropdown.Item></Link>
                                    <Link to={LOCKER_USAGE_LOG_DATA}><Dropdown.Item eventKey="3-5">{local.lockerUsageLogs}</Dropdown.Item></Link>
                                    <Link to={SCHEDULE_DATA}><Dropdown.Item eventKey="3-6">{local.schedules}</Dropdown.Item></Link>
                                    <Link to={THEME_DATA}><Dropdown.Item eventKey="3-7">{local.themes}</Dropdown.Item></Link>
                                    <Link to={ORDER_DATA}><Dropdown.Item eventKey="3-8">{local.orders}</Dropdown.Item></Link>
                                </Dropdown>
                                <Dropdown
                                    defaultOpenKeys={false}
                                    eventKey="4"
                                    title={local.language}
                                    icon={<Icon icon="language" />}
                                >
                                    <Dropdown.Item eventKey="4-1" onSelect={() => this.changeLanguage("ua")}>Українська</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-2" onSelect={() => this.changeLanguage("en")}>English</Dropdown.Item>
                                </Dropdown>
                                <Nav.Item eventKey="5" onClick={() => this.exportData()} icon={<Icon icon="export" />}>{local.export}/{local.import}</Nav.Item>
                                <Nav.Item eventKey="6" onClick={() => this.logOut()} icon={<Icon icon="sign-out" />}>{local.signOut}</Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                );
            } else if (getCookie('role') === "Manager") {
                return (
                    <Sidenav style={{ minHeight: 1000 }} defaultOpenKeys={['3', '4']} activeKey="1">
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item style={{ background: "lightgreen" }} eventKey="1" icon={<Icon style={{ color: "black", fontWeight: "500" }} icon="dashboard" />}>
                                    <span style={{ color: "black", fontWeight: "500" }}>{local.dashboard}</span>
                                </Nav.Item>
                                <Dropdown eventKey="3" title={local.tools} icon={<Icon icon="wrench" />}>
                                    <Link to={MANAGER_DASHBOARD}><Dropdown.Item eventKey="3-1" icon={<Icon icon="key" />}>{local.lockers}</Dropdown.Item></Link>
                                    <Link to={MANAGER_SCHEDULE}><Dropdown.Item eventKey="3-2" icon={<Icon icon="calendar" />}>{local.schedule}</Dropdown.Item></Link>
                                </Dropdown>
                                <Dropdown
                                    defaultOpenKeys={false}
                                    eventKey="4"
                                    title={local.language}
                                    icon={<Icon icon="language" />}
                                >
                                    <Dropdown.Item eventKey="4-1" onSelect={() => this.changeLanguage("ua")}>Українська</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-2" onSelect={() => this.changeLanguage("en")}>English</Dropdown.Item>
                                </Dropdown>
                                <Nav.Item eventKey="6" onClick={() => this.logOut()} icon={<Icon icon="sign-out" />}>{local.signOut}</Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                );
            }
        } else {
            return (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin"></i>
                </div>
            );

        }

    }
}

export default SideBar;