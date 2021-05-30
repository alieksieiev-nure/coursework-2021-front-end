import Cookies from "js-cookie";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Row, Input, Label, Button } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { getCookie } from "../config/getCookie";
import { GetLocal } from "../config/provideLocalization";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            loginData: "",
            passwordData: ""
        };

        this.fetchLogin = this.fetchLogin.bind(this);
    }

    changeLogin(event) {
        this.setState({
            loginData: event.target.value
        });
    }

    changePassword(event) {
        this.setState({
            passwordData: event.target.value
        });
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        });
    }

    fetchLogin(event) {
        event.preventDefault();
        var payload = {
            Login: this.state.loginData,
            Password: this.state.passwordData
        }

        fetch(baseUrl + "Authenfication/Login", {
            method: 'POST',
            body: JSON.stringify(payload),
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
                    Cookies.set("secutiryToken", response.securityToken);
                    Cookies.set("role", response.role);
                    if (getCookie('role') === 'Admin') {
                        window.location.href = "/userdata";
                    } else if (getCookie('role') === 'Manager') {
                        window.location.href = "/dashboard";
                    } else {
                        window.location.href = "/login";
                    }
                },
                (error) => {
                    console.log(error);
                    window.location.href = "/login";
                });
    }

    render() {
        if (this.state.isLoaded) {
            const local = this.state.local;
            return (
                <div>
                    <Row className="d-flex" style={{ flex: 1 }}>
                        <Col className="text-center" md={{ size: 6 }} style={{ minHeight: "950px", backgroundColor: "lightgreen", padding: 0, margin: 0 }}></Col>
                        <Col className="mt-5 text-center" md={{ size: 4, offset: 1 }}>
                            <Form className="mt-5" onSubmit={(event) => this.fetchLogin(event)}>
                                <h3>{local.signIn}</h3>
                                <Col md={{ size: 10, offset: 1 }}>
                                    <Row className="form-group mt-5 text-left">
                                        <Label htmlFor="login" md={3}>{local.login}</Label>
                                        <Col md={9}>
                                            <Input
                                                id="login"
                                                name="login"
                                                required
                                                value={this.state.loginData}
                                                onChange={(event) => this.changeLogin(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group text-left">
                                        <Label htmlFor="password" md={3}>{local.password}</Label>
                                        <Col md={9}>
                                            <Input
                                                id="password"
                                                name="password"
                                                required
                                                type="password"
                                                value={this.state.passwordData}
                                                onChange={(event) => this.changePassword(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Button type="submit" className="mt-3" color="primary">{local.signIn}</Button>
                                    <Link to="/register"><Button className="mt-3 ml-5" color="success">{local.register}</Button></Link>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (<div />);
        }
    }
}

export default Login;