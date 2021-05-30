import Cookies from "js-cookie";
import { Component } from "react";
import { baseUrl } from "../config/baseUrl";
import { GetLocal } from "../config/provideLocalization";

class LocationSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            local: GetLocal(),
            data: []
        }
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

    render() {
        return(<div></div>);
    }
}

export default LocationSchedule;