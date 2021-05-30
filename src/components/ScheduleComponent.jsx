import Cookies from "js-cookie";
import { Component } from "react";
import { Input, Label } from "reactstrap";
import { Button, Panel, Row, Col } from "rsuite";
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";

class LocationSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            data: [],

            startTimeSunday: "",
            startTimeMonday: "",
            startTimeTuesday: "",
            startTimeWednesday: "",
            startTimeThursday: "",
            startTimeFriday: "",
            startTimeSaturday: "",

            endTimeSunday: "",
            endTimeMonday: "",
            endTimeTuesday: "",
            endTimeWednesday: "",
            endTimeThursday: "",
            endTimeFriday: "",
            endTimeSaturday: "",
        }

        this.renderSchedules = this.renderSchedules.bind(this);

        this.handleEndTime = this.handleEndTime.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
    }

    componentDidMount() {
        fetch(baseUrl + "Schedule/GetScheduleByUser?userToken=" + Cookies.get("secutiryToken"), {
            method: "POST",
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
                },
                (error) => {
                    console.log(error);
                }
            );
    }


    handleStartTime(event, dayOfWeek) {

    }

    handleEndTime(event, endTime) {
        endTime.value = event.target.value;
    }

    renderSchedules(elem) {
        var dayOfWeek = 0;
        var inputStart, inputEnd;
        if (elem.dayOfWeek === 0) {
            dayOfWeek = this.state.local.sunday;
        } else if (elem.dayOfWeek === 1) {
            dayOfWeek = this.state.local.monday;
        } else if (elem.dayOfWeek === 2) {
            dayOfWeek = this.state.local.tuesday;
        } else if (elem.dayOfWeek === 3) {
            dayOfWeek = this.state.local.wednesday;
        } else if (elem.dayOfWeek === 4) {
            dayOfWeek = this.state.local.thursday;
        } else if (elem.dayOfWeek === 5) {
            dayOfWeek = this.state.local.friday;
        } else if (elem.dayOfWeek === 6) {
            dayOfWeek = this.state.local.saturday;
        }

        return (
            <Col md={8}>
                <Panel className="mt-3 mr-3 mb-1" bordered header={dayOfWeek}>
                    <Row>
                        <Label htmlFor="startTime" md={4}>{this.state.local.startTime}</Label>
                        <Col md={8}>
                            <Input
                                id="startTime"
                                name="startTime"
                                value={""}
                                required
                                type="time"
                                onChange={(event) => this.handleEndTime(event)}
                            />
                        </Col>
                        <br />
                        <Label className="mt-3" htmlFor="endTime" md={4}>{this.state.local.endTime}</Label>
                        <Col md={8}>
                            <Input
                                className="mt-3 mb-4"
                                id="endTime"
                                name="endTime"
                                value={""}
                                required
                                type="time"
                                onChange={(event) => this.handleEndTime(event)}
                            />
                        </Col>
                        <br />
                    </Row>
                    <Row>
                        <Col lg={4} md={4}>
                            <Button color="green" onClick={() => alert(elem.dayOfWeek)}>{this.state.local.accept}</Button>
                        </Col>
                    </Row>
                </Panel>
            </Col>
        );
    }

    render() {
        return (
            <div>
                <Row>
                    {
                        this.state.data.map((elem) => this.renderSchedules(elem))
                    }
                </Row>
            </div>
        );
    }
}

export default LocationSchedule;