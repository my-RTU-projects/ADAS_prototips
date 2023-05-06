import * as React from "react";
import SubsectionMenuLayout from "../../components/SubsectionMenuLayout";
import {sections} from "../../components/autoParts/sections";
import {Outlet} from "react-router-dom";

const AutoPartsLayout = () => {
    return (
        <SubsectionMenuLayout items={sections} basePath="noliktava">
            <Outlet />
        </SubsectionMenuLayout>
    );
}

export default AutoPartsLayout;