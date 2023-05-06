import {Box, Button, Typography} from "@mui/material"
import AutoPartList from "../../components/autoParts/AutoPartList";
import * as React from "react";
import AddAutoPartModal from "./AddAutoPartModal";
import {useAtom} from "jotai";
import {autoPartAddModalOpenAtom, roleAtom} from "../../components/providers/atoms";
import EditAutoPartModal from "./EditAutoPartModal";
import {useAtomValue} from "jotai";
import {UserRole} from "../../utils/appTypes";

const AutoPartsPage = () => {
    const role = useAtomValue(roleAtom);
    const [isAddOpen, setAddOpen] = useAtom(autoPartAddModalOpenAtom);

    return (
        <Box>
            <Box display="flex">
                <Typography
                    textAlign="left"
                    variant="h5"
                    mt={1}
                    mb={1}
                >
                    Noliktāva
                </Typography>
                <Box sx={{ flex: "1 1 auto" }}/>
                {role === UserRole.WAREHOUSE_MANAGER ? (
                    <Button onClick={() => setAddOpen(true)}>
                        + Pievienot
                    </Button>
                ) : null}
            </Box>
            <AutoPartList />
            <AddAutoPartModal />
            <EditAutoPartModal />
        </Box>
    );
}

export default AutoPartsPage;