import { Component } from "react";
import { Table } from 'rsuite';
import { Button, ModalFooter, ModalBody, ModalHeader, Modal, Form, Row, Col, Label, Input } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { ToastContainer, toast } from 'react-toastify';

const { Column, HeaderCell, Cell } = Table;

class ScheduleData extends Component {
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
            selectedDayOfWeek: "",
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
        fetch(baseUrl + "Schedule/Get", {
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
                        if (element.dayOfWeek === 0) {
                            element.dayOfWeek = this.state.local.sunday;
                        } else if (element.dayOfWeek === 1) {
                            element.dayOfWeek = this.state.local.monday;
                        } else if (element.dayOfWeek === 2) {
                            element.dayOfWeek = this.state.local.tuesday;
                        } else if (element.dayOfWeek === 3) {
                            element.dayOfWeek = this.state.local.wednesday;
                        } else if (element.dayOfWeek === 4) {
                            element.dayOfWeek = this.state.local.thursday;
                        } else if (element.dayOfWeek === 5) {
                            element.dayOfWeek = this.state.local.friday;
                        } else if (element.dayOfWeek === 6) {
                            element.dayOfWeek = this.state.local.saturday;
                        }
                    });
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
        fetch(baseUrl + "Schedule/Delete/" + this.state.selectedId, {
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
        window.location.href = "/scheduledata";
    }

    updateData(event) {
        event.preventDefault();
        var payload = {
            id: parseInt(this.state.selectedId),
            locationId: parseInt(this.state.selectedLocationId),
            dayOfWeek: parseInt(this.state.selectedDayOfWeek),
            startTime: this.state.selectedStartTime,
            endTime: this.state.selectedEndTime
        }

        fetch(baseUrl + "Schedule/Update", {
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
        window.location.href = "/scheduledata";
    }

    addNewData(event) {
        event.preventDefault();
        var payload = {
            id: 0,
            locationId: parseInt(this.state.selectedLocationId),
            dayOfWeek: parseInt(this.state.selectedDayOfWeek),
            startTime: this.state.selectedStartTime,
            endTime: this.state.selectedEndTime
        }

        fetch(baseUrl + "Schedule/Add", {
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
        window.location.href = "/scheduledata";
    }
    //#endregion Data_Actions

    //#region Handle_Changes
    handleLocationId(event) {
        this.setState({
            selectedLocationId: event.target.value
        });
    }

    handleDayOfWeek(event) {
        this.setState({
            selectedDayOfWeek: event.target.value
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
        var dayOfWeek = 0;
        if (record.dayOfWeek === this.state.local.sunday) {
            dayOfWeek = 0;
        } else if (record.dayOfWeek === this.state.local.monday) {
            dayOfWeek = 1;
        } else if (record.dayOfWeek === this.state.local.tuesday) {
            dayOfWeek = 2;
        } else if (record.dayOfWeek === this.state.local.wednesday) {
            dayOfWeek = 3;
        } else if (record.dayOfWeek === this.state.local.thursday) {
            dayOfWeek = 4;
        } else if (record.dayOfWeek === this.state.local.friday) {
            dayOfWeek = 5;
        } else if (record.dayOfWeek === this.state.local.saturday) {
            dayOfWeek = 6;
        }


        this.setState({
            selectedId: record.id,
            selectedLocationId: record.locationId,
            selectedStartTime: record.startTime,
            selectedEndTime: record.endTime,
            selectedDayOfWeek: dayOfWeek,
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
                                        <Label htmlFor="dayOfWeek" md={4}>{local.dayOfWeek}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="dayOfWeek"
                                                name="dayOfWeek"
                                                value={this.state.selectedDayOfWeek}
                                                required
                                                onChange={(event) => this.handleDayOfWeek(event)}
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
                                                type="time"
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
                                                type="time"
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
                                        <Label htmlFor="dayOfWeek" md={4}>{local.dayOfWeek}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="dayOfWeek"
                                                name="dayOfWeek"
                                                value={this.state.selectedDayOfWeek}
                                                required
                                                onChange={(event) => this.handleDayOfWeek(event)}
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
                                                type="time"
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
                                                type="time"
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
                        <Column width={70} align="center" fixed>
                            <HeaderCell>{local.scheduleId}</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={80}>
                            <HeaderCell>{local.locationId}</HeaderCell>
                            <Cell dataKey="locationId" />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>{local.dayOfWeek}</HeaderCell>
                            <Cell dataKey="dayOfWeek" />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>{local.startTime}</HeaderCell>
                            <Cell dataKey="startTime" />
                        </Column>

                        <Column width={100}>
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

export default ScheduleData;