import { Component } from "react";
import { Table } from 'rsuite';
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";
const { Column, HeaderCell, Cell } = Table;

class UserData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            data: []
        };
    }

    componentDidMount() {
        fetch(baseUrl + "User/Get", {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
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

    render() {
        const local = this.state.local;
        if (this.state.isLoaded) {
            return (
                <div>
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
                                    function handleAction() {
                                        alert(`id:${rowData.id}`);
                                    }
                                    return (
                                        <span>
                                            <span onClick={handleAction}> {local.edit} </span> |
                                            <span onClick={handleAction}> {local.remove} </span>
                                        </span>
                                    );
                                }}
                            </Cell>
                        </Column>
                    </Table>
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