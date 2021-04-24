import { Component } from "react";
import { Table } from 'rsuite';
import { Button, ModalFooter, ModalBody, ModalHeader, Modal, Form, Row, Col, Label, Input } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { ToastContainer, toast } from 'react-toastify';

const { Column, HeaderCell, Cell } = Table;

class ThemeData extends Component {
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
            selectedTitle: "",
            selectedDescription: ""
        };

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleNewModal = this.toggleNewModal.bind(this);

        this.removeData = this.removeData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + "Theme/Get", {
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
        fetch(baseUrl + "Theme/Delete/" + this.state.selectedId, {
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
        window.location.href = "/themedata";
    }

    updateData(event) {
        event.preventDefault();
        var payload = {
            id: parseInt(this.state.selectedId),
            title: this.state.selectedTitle,
            description: this.state.selectedDescription
        }

        fetch(baseUrl + "Theme/Update", {
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
        window.location.href = "/themedata";
    }

    addNewData(event) {
        event.preventDefault();
        var payload = {
            id: 0,
            title: this.state.selectedTitle,
            description: this.state.selectedDescription
        }

        fetch(baseUrl + "Theme/Add", {
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
        window.location.href = "/themedata";
    }
    //#endregion Data_Actions

    //#region Handle_Changes
    handleTitle(event) {
        this.setState({
            selectedTitle: event.target.value
        });
    }

    handleDescription(event) {
        this.setState({
            selectedDescription: event.target.value
        });
    }
    //#endregion Handle_Changes

    //#region  Toggle_Modals
    toggleRemoveModal(record) {
        this.setState({
            isRemoveModalOpen: !this.state.isRemoveModalOpen,
            selectedId: record.id,
            selectedTitle: record.title,
            selectedDescription: record.description
        });
    }

    toggleUpdateModal(record) {
        this.setState({
            isUpdateModalOpen: !this.state.isUpdateModalOpen,
            selectedId: record.id,
            selectedTitle: record.title,
            selectedDescription: record.description
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
                                        <Label htmlFor="title" md={4}>{local.title}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={this.state.selectedTitle}
                                                required
                                                onChange={(event) => this.handleTitle(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="description" md={4}>{local.description}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="description"
                                                name="description"
                                                value={this.state.selectedDescription}
                                                required
                                                type="textarea"
                                                maxLength={600}
                                                onChange={(event) => this.handleDescription(event)}
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
                                        <Label htmlFor="title" md={4}>{local.title}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={this.state.selectedTitle}
                                                required
                                                onChange={(event) => this.handleTitle(event)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="description" md={4}>{local.description}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="description"
                                                name="description"
                                                value={this.state.selectedDescription}
                                                required
                                                onChange={(event) => this.handleDescription(event)}
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
                        wordWrap
                        onRowClick={data => {
                            console.log(data);
                        }}
                    >
                        <Column width={70} align="center" fixed>
                            <HeaderCell>{local.themeId}</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={330}>
                            <HeaderCell>{local.title}</HeaderCell>
                            <Cell dataKey="title" />
                        </Column>

                        <Column width={800}>
                            <HeaderCell>{local.description}</HeaderCell>
                            <Cell dataKey="description" />
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

export default ThemeData;