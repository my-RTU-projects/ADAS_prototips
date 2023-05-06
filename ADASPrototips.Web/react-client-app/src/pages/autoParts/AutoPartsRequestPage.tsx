import {Box, Button, Typography} from "@mui/material";
import * as React from "react";
import AutoPartsRequestList from "../../components/autoParts/AutoPartsRequestList";
import {useAtomValue} from "jotai";
import {roleAtom} from "../../components/providers/atoms";
import {UserRole} from "../../utils/appTypes";

const AutoPartsRequestPage = () => {
    const role = useAtomValue(roleAtom);

    return (
        <Box>
            <Box display="flex">
                <Typography
                    textAlign="left"
                    variant="h5"
                    mt={1}
                    mb={1}
                >
                    Iepirkumu pieprāsījumi
                </Typography>
                <Box sx={{ flex: "1 1 auto" }}/>
                {role === UserRole.WAREHOUSE_MANAGER ? (
                    <Button>
                        + Pievienot
                    </Button>
                ) : null}
            </Box>
            <AutoPartsRequestList />
        </Box>
    );
}

export default AutoPartsRequestPage;