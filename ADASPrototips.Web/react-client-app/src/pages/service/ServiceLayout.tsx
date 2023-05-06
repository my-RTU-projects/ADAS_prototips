import SubsectionMenuLayout from "../../components/SubsectionMenuLayout";
import {sections} from "../../components/service/sections";
import {Outlet} from "react-router-dom";
import * as React from "react";

const ServiceLayout = () => {
    return (
        <SubsectionMenuLayout items={sections} basePath="remonts">
            <Outlet />
        </SubsectionMenuLayout>
    );
}

export default ServiceLayout;