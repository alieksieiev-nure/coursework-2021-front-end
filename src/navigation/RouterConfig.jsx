import { Route, Switch } from "react-router";
import Login from "../components/LoginComponent.jsx";
import Registration from "../components/RegistrationComponent.jsx";
import { REGISTRATION } from "./CONSTANTS.jsx";
import { LOGIN } from "./CONSTANTS.jsx";
import { ROOT } from "./CONSTANTS.jsx";
import { NotFound } from "./NotFound.jsx";

export const RouterConfig = () => {
    return (
        <div>
            <Switch>
                {/* PUBLIC ROUTES */}
                <Route exact path={ROOT} component={ null } />
                <Route path={LOGIN}><Login/></Route>
                <Route path={REGISTRATION}><Registration/></Route>

                {/* 404-Not Found */}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
};

export default RouterConfig;