import React from "react";
import { Dashboard } from "../components/Dashboard";


const routes = {
    "/user": () => <Dashboard showStat={false} />,
 
};

export default routes;