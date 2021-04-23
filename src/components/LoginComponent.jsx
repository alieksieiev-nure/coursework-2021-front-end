import { green, lightGreen } from "@material-ui/core/colors";
import { Component } from "react";
import { Form, Col, Row, Input, Label, Button } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { LogIn } from "../data/authorization";


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            loginData: "",
            passwordData: ""
        };

        const local = {};

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
        LogIn(this.state.loginData, this.state.passwordData);
    }

    render() {
        if (this.state.isLoaded) {
            const local = this.state.local;
            return (
                <div>
                    <Row className="d-flex" style={{flex: 1}}>
                        <Col className="text-center" md={{size: 6}} style={{backgroundColor: "lightgreen", padding:0,margin:0}}></Col>
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
                                    <Button className="mt-3" color="primary">{local.signIn}</Button>
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