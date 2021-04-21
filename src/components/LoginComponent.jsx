import { Component } from "react";
import { Form, Col, Row, Input, Label, Button } from 'reactstrap';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
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

    fetchLogin() {
        alert(this.state.loginData);
        alert(this.state.passwordData);
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <Row>
                        <Col className="mt-5 text-center" md={{ size: 4, offset: 4 }}>
                            <Form className="mt-5" onSubmit={this.fetchLogin}>
                                <h3>Логин</h3>
                                <Col md={{ size: 10, offset: 1 }}>
                                    <Row className="form-group mt-5 text-left">
                                        <Label htmlFor="login" md={3}>Логин</Label>
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
                                        <Label htmlFor="password" md={3}>Пароль</Label>
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
                                    <Button className="mt-3" color="danger">Пароль</Button>
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