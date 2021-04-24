import { Component } from "react";
import { Col, Row } from "reactstrap";
import { GetLocal } from "../config/provideLocalization";

class LocationData extends Component {
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
            selectedName: "",
            selectedAddress: "",
            selectedDate: ""
        };
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        });
    }

    render() {
        const local = this.state.local;
        if (this.state.isLoaded) {
            return (
                <div>
                    <Row>
                        <Col></Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
        
    }
}

export default LocationData;