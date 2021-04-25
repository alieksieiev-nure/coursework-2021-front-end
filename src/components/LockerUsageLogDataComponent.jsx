import { Component } from "react";
import { Table } from 'rsuite';
import { Button, ModalFooter, ModalBody, ModalHeader, Modal, Form, Row, Col, Label, Input } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { ToastContainer, toast } from 'react-toastify';

const { Column, HeaderCell, Cell } = Table;

class LockerUsageLogData extends Component {
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
            selectedUserId: "",
            selectedLockerId: "",
            selectedStartTime: "",
            selectedEndTime: ""
        };

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleNewModal = this.toggleNewModal.bind(this);

        this.removeData = this.removeData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + "LockerUsageLog/Get", {
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
        fetch(baseUrl + "LockerUsageLog/Delete/" + this.state.selectedId, {
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
        window.location.href = "/usagelogdata";
    }

    updateData(event) {
        event.preventDefault();
        var payload = {
            id: parseInt(this.state.selectedId),
            userId: parseInt(this.state.selectedUserId),
            lockerId: parseInt(this.state.selectedLockerId),
            startTime: new Date(this.state.selectedStartTime).toJSON(),
            endTime: new Date(this.state.selectedEndTime).toJSON()
        }

        fetch(baseUrl + "LockerUsageLog/Update", {
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
        window.location.href = "/usagelogdata";
    }

    addNewData(event) {
        event.preventDefault();
        var payload = {
            id: 0,
            userId: parseInt(this.state.selectedUserId),
            lockerId: parseInt(this.state.selectedLockerId),
            startTime: new Date(this.state.selectedStartTime).toJSON(),
            endTime: new Date(this.state.selectedEndTime).toJSON()
        }

        if (this.state.selectedEndTime === "") {
            payload.endTime = null;
        }

        fetch(baseUrl + "LockerUsageLog/Add", {
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
        window.location.href = "/usagelogdata";
    }
    //#endregion Data_Actions

    //#region Handle_Changes
    handleUserId(event) {
        this.setState({
            selectedUserId: event.target.value
        });
    }

    handleLockerId(event) {
        this.setState({
            selectedLockerId: event.target.value
        });
    }

    handleStartTime(event) {
        this.setState({
            selectedStartTime: event.target.value
        });
    }

    handleEndTime(event) {
        this.setState({
            selectedEndTime: event.target.value
        });
    }
    //#endregion Handle_Changes

    //#region  Toggle_Modals
    toggleRemoveModal(record) {
        this.setState({
            selectedId: record.id,
            isRemoveModalOpen: !this.state.isRemoveModalOpen
        });
    }

    toggleUpdateModal(record) {
        this.setState({
            selectedId: record.id,
            selectedUserId: record.userId,
            selectedLockerId: record.lockerId,
            selectedStartTime: record.startTime,
            selectedEndTime: record.endTime,
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
                                        <Label htmlFor="userId" md={4}>{local.userId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="userId"
                                                name="userId"
                                                value={this.state.selectedUserId}
                                                required
                                                onChange={(event) => this.handleUserId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="lockerId" md={4}>{local.lockerId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="lockerId"
                                                name="lockerId"
                                                value={this.state.selectedLockerId}
                                                required
                                                onChange={(event) => this.handleLockerId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="startTime" md={4}>{local.startTime}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="startTime"
                                                name="startTime"
                                                value={this.state.selectedStartTime}
                                                required
                                                onChange={(event) => this.handleStartTime(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="endTime" md={4}>{local.endTime}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="endTime"
                                                name="endTime"
                                                value={this.state.selectedEndTime}
                                                required
                                                onChange={(event) => this.handleEndTime(event)}
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
                                        <Label htmlFor="userId" md={4}>{local.userId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="userId"
                                                name="userId"
                                                value={this.state.selectedUserId}
                                                required
                                                onChange={(event) => this.handleUserId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="lockerId" md={4}>{local.lockerId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="lockerId"
                                                name="lockerId"
                                                value={this.state.selectedLockerId}
                                                required
                                                onChange={(event) => this.handleLockerId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="startTime" md={4}>{local.startTime}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="startTime"
                                                name="startTime"
                                                value={this.state.selectedStartTime}
                                                required
                                                type="datetime-local"
                                                onChange={(event) => this.handleStartTime(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="endTime" md={4}>{local.endTime}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="endTime"
                                                name="endTime"
                                                value={this.state.selectedEndTime}
                                                required
                                                type="datetime-local"
                                                onChange={(event) => this.handleEndTime(event)}
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
                        <Column width={90} align="center" fixed>
                            <HeaderCell>{local.logId}</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                        
                        <Column width={70}>
                            <HeaderCell>{local.userId}</HeaderCell>
                            <Cell dataKey="userId" />
                        </Column>

                        <Column width={70}>
                            <HeaderCell>{local.lockerId}</HeaderCell>
                            <Cell dataKey="lockerId" />
                        </Column>

                        <Column width={210}>
                            <HeaderCell>{local.startTime}</HeaderCell>
                            <Cell dataKey="startTime" />
                        </Column>

                        <Column width={210}>
                            <HeaderCell>{local.endTime}</HeaderCell>
                            <Cell dataKey="endTime" />
                        </Column>

                        <Column width={120} fixed="right">
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

export default LockerUsageLogData;