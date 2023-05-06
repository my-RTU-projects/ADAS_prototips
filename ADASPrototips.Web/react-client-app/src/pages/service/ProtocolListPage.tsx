import {Box, Button, Typography} from "@mui/material";
import * as React from "react";
import ProtocolList from "../../components/service/ProtocolList";
import {useAtom, useAtomValue} from "jotai";
import {clientOrderCreateModalOpenAtom, roleAtom} from "../../components/providers/atoms";
import CreateProtocolModal from "./CreateProtocolModal";
import EditProtocolModal from "./EditProtocolModal";
import {UserRole} from "../../utils/appTypes";

const ProtocolListPage = () => {
    const role = useAtomValue(roleAtom);
    const [isAddOpen, setAddOpen] = useAtom(clientOrderCreateModalOpenAtom);

    return (
        <Box>
            <Box display="flex">
                <Typography
                    textAlign="left"
                    variant="h5"
                    mt={1}
                    mb={1}
                >
                    Protokoli
                </Typography>
                <Box sx={{ flex: "1 1 auto" }}/>
                {role === UserRole.SHIFT_LEADER ? (
                    <Button onClick={() => setAddOpen(true)}>
                        + Pievienot
                    </Button>
                ) : null}
            </Box>
            <ProtocolList />
            <CreateProtocolModal />
            <EditProtocolModal />
        </Box>
    );
};

export default ProtocolListPage;
