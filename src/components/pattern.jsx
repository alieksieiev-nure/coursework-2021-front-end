import { Component } from "react";
import { Table } from 'rsuite';
import { Button, ModalFooter, ModalBody, ModalHeader, Modal, Form, Row, Col, Label, Input } from 'reactstrap';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
import { ToastContainer, toast } from 'react-toastify';

class SomePattern extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            isRemoveModalOpen: false,
            isUpdateModalOpen: false,
            isNewModalOpen: false,
            data: []
        };

        this.toggleRemoveModal = this.toggleRemoveModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleNewModal = this.toggleNewModal.bind(this);

        this.removeData = this.removeData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addNewData = this.addNewData.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        });
    }

    //#region Data_Actions
    removeData(event) {

    }

    updateData(event) {

    }

    addNewData(event) {

    }
    //#endregion Data_Actions

    //#region  Toggle_Modals
    toggleRemoveModal(record) {
        this.setState({
            isRemoveModalOpen: !this.state.isRemoveModalOpen
        });
    }

    toggleUpdateModal(record) {
        this.setState({
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
                                        <Label htmlFor="something" md={4}>{local.something}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="something"
                                                name="something"
                                                value={this.state.something}
                                                required
                                                onChange={(event) => this.handleSomething(event)}
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
                                        <Label htmlFor="something" md={4}>{local.something}</Label>
                                        <Col md={8}>
                                            <Input
                                                id="something"
                                                name="something"
                                                value={this.state.something}
                                                required
                                                onChange={(event) => this.handleSomething(event)}
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
                            <HeaderCell>{local.something}</HeaderCell>
                            <Cell dataKey="something" />
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

export default SomePattern;