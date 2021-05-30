import { Redirect, Route, Switch } from "react-router";
import LocationData from "../components/LocationDataComponent.jsx";
import UserData from "../components/UserDataComponent.jsx";
import LocationOwnerData from "../components/LocationOwnerDataComponent.jsx";
import { LOCATION_DATA, LOCATION_OWNER_DATA, LOCKER_DATA, LOCKER_USAGE_LOG_DATA, LOGIN, MANAGER_DASHBOARD, MANAGER_SCHEDULE, ORDER_DATA, SCHEDULE_DATA, THEME_DATA, USER_DATA } from "./CONSTANTS.jsx";
import { ROOT } from "./CONSTANTS.jsx";
import { NotFound } from "./NotFound.jsx";
import ThemeData from "../components/ThemeDataComponent.jsx";
import OrderData from "../components/OrderDataComponent.jsx";
import LockerData from "../components/LockerDataComponent.jsx";
import LockerUsageLogData from "../components/LockerUsageLogDataComponent.jsx";
import ScheduleData from "../components/ScheduleDataComponent.jsx";
import ManagerDashboard from "../components/ManagerDashboardComponent.jsx";
import LocationSchedule from "../components/ScheduleComponent.jsx";
import Cookies from "js-cookie";

export const RouterConfig = () => {
    if (Cookies.get('role') === "Admin") {
        return (
            <div>
                <Switch>
                    {/* PUBLIC ROUTES */}
                    <Route exact path={ROOT} component={null} />
    
                    <Route path={USER_DATA}><UserData /></Route>
                    <Route path={LOCATION_DATA}><LocationData /></Route>
                    <Route path={LOCATION_OWNER_DATA}><LocationOwnerData /></Route>
                    <Route path={THEME_DATA}><ThemeData /></Route>
                    <Route path={ORDER_DATA}><OrderData /></Route>
                    <Route path={LOCKER_DATA}><LockerData /></Route>
                    <Route path={LOCKER_USAGE_LOG_DATA}><LockerUsageLogData /></Route>
                    <Route path={SCHEDULE_DATA}><ScheduleData/></Route>
    
                    {/* 404-Not Found */}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        );
    } else if (Cookies.get('role') === 'Manager') {
        return (
            <div>
                <Switch>
                    {/* PUBLIC ROUTES */}
                    <Route exact path={ROOT} component={null} ><Redirect to={MANAGER_DASHBOARD}/></Route>

                    <Route path={MANAGER_DASHBOARD}><ManagerDashboard/></Route>
                    <Route path={MANAGER_SCHEDULE}><LocationSchedule/></Route>
    
                    {/* 404-Not Found */}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        );
    } else {
        return (
            <div>
                <Switch>
                    <Redirect to={LOGIN}></Redirect>

                    {/* PUBLIC ROUTES */}
                    <Route exact path={ROOT} component={null} />
    
                    {/* 404-Not Found */}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        );
    }
};

export default RouterConfig;