import { Component } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { GetLocal } from "../config/provideLocalization";
import { Register } from "../data/authorization";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            login: "",
            password: "",
            fullName: "",
            email: "",
            phoneNumber: ""
        }

        this.fetchRegister = this.fetchRegister.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoaded: true });
    }

    changeLogin(event) {
        this.setState({
            login: event.target.value
        });
    }

    changePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    changeFullName(event) {
        this.setState({
            fullName: event.target.value
        });
    }

    changeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    changePhoneNumber(event) {
        this.setState({
            phoneNumber: event.target.value
        });
    }

    fetchRegister(event) {
        event.preventDefault();

        var response = Register(this.state.login,
            this.state.password,
            this.state.fullName,
            this.state.email,
            this.state.phoneNumber);
        
        if (response) {
            window.location.href = "/register";
        }
    }

    render() {
        if (this.state.isLoaded) {
            const local = this.state.local;
            return (
                <div>
                    <Row>
                        <Col className="text-center" md={{ size: 6 }} style={{ backgroundColor: "green", padding: 0, margin: 0 }}></Col>
                        <Col className="mt-5 text-center" md={{ size: 4, offset: 1 }}>
                            <Form method="POST" onSubmit={(event) => this.fetchRegister(event)} className="mt-5">
                                <h3>{local.registration}</h3>
                                <Col md={{ size: 10, offset: 1 }}>
                                    <Row className="form-group mt-5 text-left">
                                        <Label htmlFor="login-APZ" md={3}>{local.login}</Label>
                                        <Col md={9}>
                                            <Input
                                                id="login-APZ"
                                                name="login"
                                                required
                                                value={this.state.login}
                                                onChange={(event) => this.changeLogin(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group text-left">
                                        <Label htmlFor="password-APZ" md={3}>{local.password}</Label>
                                        <Col md={9}>
                                            <Input
                                                id="password-APZ"
                                                name="password"
                                                required
                                                type="password"
                                                value={this.state.password}
                                                onChange={(event) => this.changePassword(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group text-left">
                                        <Label htmlFor="fullName" md={3}>{local.fullName}</Label>
                                        <Col md={9}>
                                            <Input
                                                id="fullName"
                                                name="fullName"
                                                required
                                                value={this.state.fullName}
                                                onChange={(event) => this.changeFullName(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group text-left">
                                        <Label htmlFor="email" md={3}>{local.email}</Label>
                                        <Col md={9}>
                                            <Input
                                                id="email"
                                                name="email"
                                                required
                                                type="email"
                                                value={this.state.email}
                                                onChange={(event) => this.changeEmail(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group text-left">
                                        <Label htmlFor="phoneNumber" md={3}>{local.phoneNumber}</Label>
                                        <Col md={9}>
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                required
                                                type="tel"
                                                value={this.state.phoneNumber}
                                                onChange={(event) => this.changePhoneNumber(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Button className="mt-3" color="primary">{local.register}</Button>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default Registration;