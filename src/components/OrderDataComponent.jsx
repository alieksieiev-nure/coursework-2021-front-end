import { Component } from "react";
import { Table } from 'rsuite';
import { Button, ModalFooter, ModalBody, ModalHeader, Modal, Form, Row, Col, Label, Input } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { ToastContainer, toast } from 'react-toastify';

const { Column, HeaderCell, Cell } = Table;

class OrderData extends Component {
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
            selectedSenderId: "",
            selectedThemeId: "",
            selectedMessage: "",
            selectedOrderStatus: "",
            selectedDate: ""
        };

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleNewModal = this.toggleNewModal.bind(this);

        this.removeData = this.removeData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + "Order/Get", {
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

    //#region Data_Actions
    removeData(event) {
        event.preventDefault();
        fetch(baseUrl + "Order/Delete/" + this.state.selectedId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    toast.success(this.state.local.messageRemoveSuccess);
                } else {
                    toast.error(this.state.local.messageRemoveFailure)
                }
            });
        window.location.href = "/orderdata";
    }

    updateData(event) {
        event.preventDefault();
        var payload = {
            id: parseInt(this.state.selectedId),
            senderId: parseInt(this.state.selectedSenderId),
            themeId: parseInt(this.state.selectedThemeId),
            message: this.state.selectedMessage,
            orderStatus: parseInt(this.state.selectedOrderStatus),
            creationDate: this.state.selectedDate
        }

        fetch(baseUrl + "Order/Update", {
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
                    toast.success(this.state.local.messageUpdateSuccess);
                } else {
                    toast.error(this.state.local.messageUpdateFailure);
                }
            });
        window.location.href = "/orderdata";
    }

    addNewData(event) {
        event.preventDefault();
        var payload = {
            id: 0,
            senderId: parseInt(this.state.selectedSenderId),
            themeId: parseInt(this.state.selectedThemeId),
            message: this.state.selectedMessage,
            orderStatus: parseInt(this.state.selectedOrderStatus),
            creationDate: new Date().toJSON()
        }

        fetch(baseUrl + "Order/Add", {
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
                    toast.success(this.state.local.messageAddNewSuccess);
                } else {
                    toast.error(this.state.local.messageAddNewFailure)
                }
            });
        window.location.href = "/orderdata";
    }
    //#endregion Data_Actions

    //#region Handle_Changes
    handleSenderId(event) {
        this.setState({
            selectedSenderId: event.target.value
        });
    }

    handleUserId(event) {
        this.setState({
            selectedUserId: event.target.value
        });
    }

    handleThemeId(event) {
        this.setState({
            selectedThemeId: event.target.value
        });
    }

    handleMessage(event) {
        this.setState({
            selectedMessage: event.target.value
        });
    }

    handleOrderStatus(event) {
        this.setState({
            selectedOrderStatus: event.target.value
        });
    }
    //#endregion Handle_Changes

    //#region  Toggle_Modals
    toggleRemoveModal(record) {
        this.setState({
            selectedId: record.id,
            selectedSenderId: record.senderId,
            selectedThemeId: record.themeId,
            selectedMessage: record.message,
            selectedOrderStatus: record.orderStatus,
            selectedDate: record.creationDate,
            isRemoveModalOpen: !this.state.isRemoveModalOpen
        });
    }

    toggleUpdateModal(record) {
        this.setState({
            selectedId: record.id,
            selectedSenderId: record.senderId,
            selectedThemeId: record.themeId,
            selectedMessage: record.message,
            selectedOrderStatus: record.orderStatus,
            selectedDate: record.creationDate,
            isUpdateModalOpen: !this.state.isUpdateModalOpen
        });
    }

    toggleNewModal() {
        this.setState({
            isNewModalOpen: !this.state.isNewModalOpen
        });
    }
    //#endregion Toggle_Modals

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
                                        <Label htmlFor="senderId" md={4}>{local.senderId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="senderId"
                                                name="senderId"
                                                value={this.state.selectedSenderId}
                                                required
                                                onChange={(event) => this.handleSenderId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="themeId" md={4}>{local.themeId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="themeId"
                                                name="themeId"
                                                value={this.state.selectedThemeId}
                                                required
                                                onChange={(event) => this.handleThemeId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="message" md={4}>{local.message}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="message"
                                                name="message"
                                                value={this.state.selectedMessage}
                                                required
                                                type="textarea"
                                                maxLength={600}
                                                onChange={(event) => this.handleMessage(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="orderStatus" md={4}>{local.orderStatus}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="orderStatus"
                                                name="orderStatus"
                                                value={this.state.selectedOrderStatus}
                                                required
                                                onChange={(event) => this.handleOrderStatus(event)}
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
                                        <Label htmlFor="senderId" md={4}>{local.senderId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="senderId"
                                                name="senderId"
                                                value={this.state.selectedSenderId}
                                                required
                                                onChange={(event) => this.handleSenderId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="themeId" md={4}>{local.themeId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="themeId"
                                                name="themeId"
                                                value={this.state.selectedThemeId}
                                                required
                                                onChange={(event) => this.handleThemeId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="message" md={4}>{local.message}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="message"
                                                name="message"
                                                value={this.state.selectedMessage}
                                                required
                                                type="textarea"
                                                maxLength={600}
                                                onChange={(event) => this.handleMessage(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="orderStatus" md={4}>{local.orderStatus}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="orderStatus"
                                                name="orderStatus"
                                                value={this.state.selectedOrderStatus}
                                                required
                                                onChange={(event) => this.handleOrderStatus(event)}
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
                            <HeaderCell>{local.orderId}</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={80}>
                            <HeaderCell>{local.senderId}</HeaderCell>
                            <Cell dataKey="senderId" />
                        </Column>

                        <Column width={70}>
                            <HeaderCell>{local.themeId}</HeaderCell>
                            <Cell dataKey="themeId" />
                        </Column>

                        <Column width={700}>
                            <HeaderCell>{local.message}</HeaderCell>
                            <Cell dataKey="message" />
                        </Column>

                        <Column width={90}>
                            <HeaderCell>{local.orderStatus}</HeaderCell>
                            <Cell dataKey="orderStatus" />
                        </Column>

                        <Column width={210}>
                            <HeaderCell>{local.creationDate}</HeaderCell>
                            <Cell dataKey="creationDate" />
                        </Column>

                        <Column width={120}>
                            <HeaderCell>{local.action}</HeaderCell>
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

export default OrderData;