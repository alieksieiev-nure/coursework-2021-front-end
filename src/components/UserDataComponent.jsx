import { Component } from "react";
import { Table } from 'rsuite';
import { Button, ModalFooter, ModalBody, ModalHeader, Modal, Form, Row, Col, Label, Input } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { ToastContainer, toast } from 'react-toastify';


const { Column, HeaderCell, Cell } = Table;

class UserData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            isRemoveModalOpen: false,
            isUpdateModalOpen: false,
            isNewModalOpen: false,
            data: [],

            selectedId: "",
            selectedLogin: "",
            selectedPassword: "",
            selectedFullName: "",
            selectedEmail: "",
            selectedPhone: "",
            selectedRole: "",
            selectedToken: "",
            selectedDate: ""
        };

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleNewModal = this.toggleNewModal.bind(this);

        this.removeData = this.removeData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    //#region Data_Actions
    removeData(event) {
        fetch(baseUrl + "User/Delete/" + this.state.selectedId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("The record has been deleted");
                } else {
                    toast.error("Something got wrong. The record has not been deleted")
                }
            });
    }

    updateData(event) {
        var payload = {
            id: this.state.selectedId,
            login: this.state.selectedLogin,
            password: this.state.selectedPassword,
            fullName: this.state.selectedFullName,
            email: this.state.selectedEmail,
            phoneNumber: this.state.selectedPhone,
            role: this.state.selectedRole,
            securityToken: this.state.selectedToken,
            creationDate: this.state.selectedDate
        }

        fetch(baseUrl + "User/Update", {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    console.log("The record has been updated");
                } else {
                    console.log("Something got wrong. The record has not been updated")
                }
            });
    }

    addNewData(event) {
        event.preventDefault();
        var payload = {
            id: 0,
            login: this.state.selectedLogin,
            password: this.state.selectedPassword,
            fullName: this.state.selectedFullName,
            email: this.state.selectedEmail,
            phoneNumber: this.state.selectedPhone,
            role: parseInt(this.state.selectedRole),
            securityToken: this.state.selectedToken,
            creationDate: new Date().toJSON()
        }

        fetch(baseUrl + "User/Post", {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("The record has been added");
                } else {
                    console.log("Something got wrong. The record has not been added")
                }
            });
        setInterval(1000);
        window.location.href = "/userdata";
    }
    //#endregion Data_Actions

    componentDidMount() {
        fetch(baseUrl + "User/Get", {
            method: 'GET',
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
                }
            );
    }

    toggleUpdateModal(record) {
        this.setState({
            selectedId: record.id,
            selectedLogin: record.login,
            selectedPassword: record.password,
            selectedFullName: record.fullName,
            selectedEmail: record.email,
            selectedPhone: record.phoneNumber,
            selectedRole: record.role,
            selectedToken: record.securityToken,
            selectedDate: record.creationDate,
            isUpdateModalOpen: !this.state.isUpdateModalOpen
        });
    }

    toggleRemoveModal(record) {
        this.setState({
            selectedId: record.id,
            selectedLogin: record.login,
            selectedPassword: record.password,
            selectedFullName: record.fullName,
            selectedEmail: record.email,
            selectedPhone: record.phoneNumber,
            selectedRole: record.role,
            selectedToken: record.securityToken,
            selectedDate: record.creationDate,
            isRemoveModalOpen: !this.state.isRemoveModalOpen
        });
    }

    toggleNewModal() {
        this.setState({
            isNewModalOpen: !this.state.isNewModalOpen
        });
    }

    handleLogin(event) {
        this.setState({
            selectedLogin: event.target.value
        });
    }

    handlePassword(event) {
        this.setState({
            selectedPassword: event.target.value
        });
    }

    handleToken(event) {
        this.setState({
            selectedToken: event.target.value
        });
    }

    handleName(event) {
        this.setState({
            selectedFullName: event.target.value
        });
    }

    handleEmail(event) {
        this.setState({
            selectedEmail: event.target.value
        });
    }

    handlePhone(event) {
        this.setState({
            selectedPhone: event.target.value
        });
    }

    handleRole(event) {
        this.setState({
            selectedRole: event.target.value
        });
    }

    render() {
        const local = this.state.local;
        if (this.state.isLoaded) {
            return (
                <div>
                    <div>
                        <Modal fade={false} isOpen={this.state.isRemoveModalOpen} toggle={this.toggleRemoveModal}>
                            <ModalHeader>{local.acceptRemoveTitle}</ModalHeader>
                            <Form onSubmit={(event) => this.removeData(event)}>
                                <ModalBody>
                                    <Row className="form-group">
                                        <Label htmlFor="id" md={12}>{local.acceptRemoveMessage}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="id"
                                                name="id"
                                                value={this.state.selectedId}
                                                required
                                                hidden
                                                readOnly
                                            />
                                        </Col>
                                    </Row>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" color="danger">{local.remove}</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleRemoveModal}>{local.cancel}</Button>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    </div>
                    <div>
                        <Modal fade={false} isOpen={this.state.isUpdateModalOpen} toggle={this.toggleUpdateModal}>
                            <ModalHeader>{local.editing}</ModalHeader>
                            <Form onSubmit={(event) => this.updateData(event)}>
                                <ModalBody>
                                    <Row className="form-group">
                                        <Label htmlFor="login" md={4}>{local.login}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="login"
                                                name="login"
                                                value={this.state.selectedLogin}
                                                required
                                                onChange={(event) => this.handleLogin(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="password" md={4}>{local.password}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="password"
                                                name="password"
                                                value={this.state.selectedPassword}
                                                required
                                                onChange={(event) => this.handlePassword(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="securityToken" md={4}>{local.securityToken}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="securityToken"
                                                name="securityToken"
                                                value={this.state.selectedToken}
                                                required
                                                onChange={(event) => this.handleToken(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="fullName" md={4}>{local.fullName}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="fullName"
                                                name="fullName"
                                                value={this.state.selectedFullName}
                                                onChange={(event) => this.handleName(event)}
                                            >
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="email" md={4}>{local.email}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="email"
                                                name="email"
                                                required
                                                type="email"
                                                value={this.state.selectedEmail}
                                                onChange={(event) => this.handleEmail(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="phoneNumber" md={4}>{local.phoneNumber}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                required
                                                type="tel"
                                                pattern="[0-9]{10,12}"
                                                value={this.state.selectedPhone}
                                                onChange={(event) => this.handlePhone(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="role" md={4}>{local.role}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="role"
                                                name="role"
                                                required
                                                pattern="[0-3]{1}"
                                                value={this.state.selectedRole}
                                                onChange={(event) => this.handleRole(event)}
                                            />
                                        </Col>
                                    </Row>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" color="primary">{local.edit}</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleUpdateModal}>{local.cancel}</Button>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    </div>
                    <div>
                        <Modal fade={false} isOpen={this.state.isNewModalOpen} toggle={this.toggleNewModal}>
                            <ModalHeader>{local.addNew}</ModalHeader>

                            <Form onSubmit={(value) => this.addNewData(value)}>
                                <ModalBody>
                                    <Row className="form-group">
                                        <Label htmlFor="login" md={4}>{local.login}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="login"
                                                name="login"
                                                value={this.state.selectedLogin}
                                                required
                                                onChange={(event) => this.handleLogin(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="password" md={4}>{local.password}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="password"
                                                name="password"
                                                value={this.state.selectedPassword}
                                                required
                                                onChange={(event) => this.handlePassword(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="securityToken" md={4}>{local.securityToken}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="securityToken"
                                                name="securityToken"
                                                value={this.state.selectedToken}
                                                required
                                                onChange={(event) => this.handleToken(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="fullName" md={4}>{local.fullName}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="fullName"
                                                name="fullName"
                                                value={this.state.selectedFullName}
                                                onChange={(event) => this.handleName(event)}
                                            >
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="email" md={4}>{local.email}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="email"
                                                name="email"
                                                required
                                                type="email"
                                                value={this.state.selectedEmail}
                                                onChange={(event) => this.handleEmail(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="phoneNumber" md={4}>{local.phoneNumber}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                required
                                                type="tel"
                                                pattern="[0-9]{10,12}"
                                                value={this.state.selectedPhone}
                                                onChange={(event) => this.handlePhone(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="role" md={4}>{local.role}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="role"
                                                name="role"
                                                required
                                                pattern="[0-3]{1}"
                                                value={this.state.selectedRole}
                                                onChange={(event) => this.handleRole(event)}
                                            />
                                        </Col>
                                    </Row>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" color="success">{local.addNew}</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleNewModal}>{local.cancel}</Button>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    </div>
                    <Button color="success" className="mt-2 mb-2 ml-1" onClick={this.toggleNewModal}>+ {local.addNew}</Button>
                    <Table
                        height={400}
                        data={this.state.data}
                        onRowClick={data => {
                            console.log(data);
                        }}
                    >
                        <Column width={70} align="center" fixed>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={160} fixed>
                            <HeaderCell>{local.login}</HeaderCell>
                            <Cell dataKey="login" />
                        </Column>

                        <Column width={300}>
                            <HeaderCell>{local.password}</HeaderCell>
                            <Cell dataKey="password" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>{local.securityToken}</HeaderCell>
                            <Cell dataKey="securityToken" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>{local.fullName}</HeaderCell>
                            <Cell dataKey="fullName" />
                        </Column>

                        <Column width={300}>
                            <HeaderCell>{local.email}</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>

                        <Column width={140}>
                            <HeaderCell>{local.phoneNumber}</HeaderCell>
                            <Cell dataKey="phoneNumber" />
                        </Column>

                        <Column width={120}>
                            <HeaderCell>{local.role}</HeaderCell>
                            <Cell dataKey="role" />
                        </Column>

                        <Column width={200}>
                            <HeaderCell>{local.creationDate}</HeaderCell>
                            <Cell dataKey="creationDate" />
                        </Column>

                        <Column width={120} fixed="right">
                            <HeaderCell>Action</HeaderCell>

                            <Cell>
                                {rowData => {
                                    return (
                                        <span>
                                            <span onClick={() => this.toggleUpdateModal(rowData)}> {local.edit} </span> |
                                            <span onClick={() => this.toggleRemoveModal(rowData)}> {local.remove} </span>
                                        </span>
                                    );
                                }}
                            </Cell>
                        </Column>
                    </Table>
                    <ToastContainer />
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }

    }
}
export default UserData;