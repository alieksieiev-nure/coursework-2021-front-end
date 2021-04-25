import { Component } from "react";
import { Table } from 'rsuite';
import { Button, ModalFooter, ModalBody, ModalHeader, Modal, Form, Row, Col, Label, Input } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { ToastContainer, toast } from 'react-toastify';

const { Column, HeaderCell, Cell } = Table;

class LockerData extends Component {
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
            selectedLocationId: "",
            selectedToken: "",
            selectedIsClosed: "",
            selectedIsEnabled: "",
            selectedLastTimeOfUse: ""
        };

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleNewModal = this.toggleNewModal.bind(this);

        this.removeData = this.removeData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + "Locker/Get", {
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
                    response.forEach(element => {
                        if (element.isClosed) {
                            element.isClosed = "true";
                        } else {
                            element.isClosed = "false";
                        }

                        if (element.isEnabled) {
                            element.isEnabled = "true"
                        } else {
                            element.isEnabled = "false";
                        }
                    });
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
        fetch(baseUrl + "Locker/Delete/" + this.state.selectedId, {
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
        window.location.href = "/lockerdata";
    }

    updateData(event) {
        event.preventDefault();
        var payload = {
            id: parseInt(this.state.selectedId),
            locationId: parseInt(this.state.selectedLocationId),
            lockerToken: this.state.selectedToken,
            isClosed: parseInt(this.state.selectedIsClosed),
            isEnabled: parseInt(this.state.selectedIsEnabled),
            timeOfLastUse: this.state.selectedLastTimeOfUse
        }

        if (payload.isClosed === 0) {
            payload.isClosed = true;
        } else {
            payload.isClosed = false;
        }

        if (payload.isEnabled === 0) {
            payload.isEnabled = true;
        } else {
            payload.isEnabled = false;
        }

        fetch(baseUrl + "Locker/Update", {
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
        window.location.href = "/lockerdata";
    }

    addNewData(event) {
        event.preventDefault();
        var payload = {
            id: 0,
            locationId: parseInt(this.state.selectedLocationId),
            lockerToken: this.state.selectedToken,
            isClosed: parseInt(this.state.selectedIsClosed),
            isEnabled: parseInt(this.state.selectedIsEnabled),
            timeOfLastUse: new Date().toJSON()
        }

        if (payload.isClosed === 0) {
            payload.isClosed = true;
        } else {
            payload.isClosed = false;
        }

        if (payload.isEnabled === 0) {
            payload.isEnabled = true;
        } else {
            payload.isEnabled = false;
        }

        fetch(baseUrl + "Locker/Post", {
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
            window.location.href = "/lockerdata";
    }
    //#endregion Data_Actions

    //#region Handle_Changes
    handleLocationId(event) {
        this.setState({
            selectedLocationId: event.target.value
        });
    }

    handleToken(event) {
        this.setState({
            selectedToken: event.target.value
        });
    }

    handleIsClosed(event) {
        this.setState({
            selectedIsClosed: event.target.value
        });
    }

    handleIsEnabled(event) {
        this.setState({
            selectedIsEnabled: event.target.value
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
        var isEnabled = 0;
        var isClosed = 0;
        if (record.isEnabled === "false") {
            isEnabled = 1;
        }
        if (record.isClosed === "false") {
            isClosed = 1;
        }
        this.setState({
            selectedId: record.id,
            selectedLocationId: record.locationId,
            selectedToken: record.lockerToken,
            selectedIsClosed: isClosed,
            selectedIsEnabled: isEnabled,
            selectedLastTimeOfUse: record.timeOfLastUse,
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
                                        <Label htmlFor="locationId" md={4}>{local.locationId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="locationId"
                                                name="locationId"
                                                value={this.state.selectedLocationId}
                                                required
                                                onChange={(event) => this.handleLocationId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="lockerToken" md={4}>{local.lockerToken}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="lockerToken"
                                                name="lockerToken"
                                                value={this.state.selectedToken}
                                                required
                                                maxLength={32}
                                                minLength={32}
                                                onChange={(event) => this.handleToken(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="isClosed" md={4}>{local.isClosed}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="isClosed"
                                                name="isClosed"
                                                value={this.state.selectedIsClosed}
                                                required
                                                pattern="[0-1]{1}"
                                                onChange={(event) => this.handleIsClosed(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="isEnabled" md={4}>{local.isEnabled}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="isEnabled"
                                                name="isEnabled"
                                                value={this.state.selectedIsEnabled}
                                                required
                                                pattern="[0-1]{1}"
                                                onChange={(event) => this.handleIsEnabled(event)}
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
                                        <Label htmlFor="locationId" md={4}>{local.locationId}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="locationId"
                                                name="locationId"
                                                value={this.state.selectedLocationId}
                                                required
                                                onChange={(event) => this.handleLocationId(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="lockerToken" md={4}>{local.lockerToken}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="lockerToken"
                                                name="lockerToken"
                                                value={this.state.selectedToken}
                                                required
                                                onChange={(event) => this.handleToken(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="isClosed" md={4}>{local.isClosed}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="isClosed"
                                                name="isClosed"
                                                value={this.state.selectedIsClosed}
                                                required
                                                pattern="[0-1]{1}"
                                                onChange={(event) => this.handleIsClosed(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="isEnabled" md={4}>{local.isEnabled}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="isEnabled"
                                                name="isEnabled"
                                                value={this.state.selectedIsEnabled}
                                                required
                                                pattern="[0-1]{1}"
                                                onChange={(event) => this.handleIsEnabled(event)}
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
                            <HeaderCell>{local.lockerId}</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={90}>
                            <HeaderCell>{local.locationId}</HeaderCell>
                            <Cell dataKey="locationId" />
                        </Column>

                        <Column width={300}>
                            <HeaderCell>{local.lockerToken}</HeaderCell>
                            <Cell dataKey="lockerToken" />
                        </Column>

                        <Column width={70}>
                            <HeaderCell>{local.isClosed}</HeaderCell>
                            <Cell dataKey="isClosed" />
                        </Column>


                        <Column width={80}>
                            <HeaderCell>{local.isEnabled}</HeaderCell>
                            <Cell dataKey="isEnabled" />
                        </Column>


                        <Column width={210}>
                            <HeaderCell>{local.timeOfLastUse}</HeaderCell>
                            <Cell dataKey="timeOfLastUse" />
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

export default LockerData;